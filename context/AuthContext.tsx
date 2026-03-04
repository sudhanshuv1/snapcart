"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { User, Address } from "@/lib/types";
import { apiPost, apiGet, apiPut, apiDelete, setToken, clearToken, hasToken } from "@/lib/api";
import { ourguideIdentify, ourguideResetUser } from "@/lib/ourguideClient";

type PublicUser = Omit<User, "password">;

interface AuthContextType {
  user: PublicUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  signUp: (name: string, email: string, dob: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  updateProfile: (data: { name?: string; email?: string; dob?: string; address?: Address }) => Promise<{ success: boolean; error?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  deleteAccount: (password: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Hydrate user from token on mount
  useEffect(() => {
    async function hydrate() {
      if (!hasToken()) {
        setLoading(false);
        return;
      }
      try {
        const data = await apiGet<{ user: PublicUser }>("/api/auth/me");
        setUser(data.user);
      } catch {
        clearToken();
        ourguideResetUser();
      } finally {
        setLoading(false);
      }
    }
    hydrate();
  }, []);

  // Identify the user to Ourguide and refresh periodically (token expires in 60 mins)
  useEffect(() => {
    if (!user) return;

    const userName = user.name;

    let cancelled = false;
    let intervalId: number | undefined;

    async function identify() {
      try {
        const data = await apiGet<{ token: string }>("/api/ourguide-token");
        if (cancelled) return;
        ourguideIdentify({ token: data.token, name: userName });
      } catch {
        // Ignore: Ourguide is optional, and /api/ourguide-token may be disabled in some envs
      }
    }

    identify();
    intervalId = window.setInterval(identify, 50 * 60 * 1000);

    return () => {
      cancelled = true;
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [user?.id, user?.name]);

  const signUp = useCallback(
    async (name: string, email: string, dob: string, password: string): Promise<{ success: boolean; error?: string }> => {
      try {
        const data = await apiPost<{ user: PublicUser; token: string }>("/api/auth/signup", {
          name,
          email,
          dob,
          password,
        });
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Sign up failed";
        return { success: false, error: message };
      }
    },
    []
  );

  const signIn = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      try {
        const data = await apiPost<{ user: PublicUser; token: string }>("/api/auth/signin", {
          email,
          password,
        });
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Sign in failed";
        return { success: false, error: message };
      }
    },
    []
  );

  const signOut = useCallback(() => {
    clearToken();
    setUser(null);
    ourguideResetUser();
    fetch("/api/auth/signout", { method: "POST" }).catch(() => {});
  }, []);

  const updateProfile = useCallback(
    async (data: { name?: string; email?: string; dob?: string; address?: Address }): Promise<{ success: boolean; error?: string }> => {
      try {
        const result = await apiPut<{ user: PublicUser }>("/api/auth/profile", data);
        setUser(result.user);
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Update failed";
        return { success: false, error: message };
      }
    },
    []
  );

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
      try {
        await apiPut<{ success: boolean }>("/api/auth/password", {
          currentPassword,
          newPassword,
        });
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Password change failed";
        return { success: false, error: message };
      }
    },
    []
  );

  const deleteAccount = useCallback(
    async (password: string): Promise<{ success: boolean; error?: string }> => {
      try {
        await apiDelete<{ success: boolean }>("/api/auth/account", { password });
        clearToken();
        setUser(null);
        ourguideResetUser();
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Delete failed";
        return { success: false, error: message };
      }
    },
    []
  );

  const isAuthenticated = user !== null;

  const value = useMemo(
    () => ({ user, isAuthenticated, loading, signUp, signIn, signOut, updateProfile, changePassword, deleteAccount }),
    [user, isAuthenticated, loading, signUp, signIn, signOut, updateProfile, changePassword, deleteAccount]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
