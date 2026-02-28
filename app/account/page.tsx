"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import RequireAuth from "@/components/RequireAuth";

export default function AccountPage() {
  return (
    <RequireAuth>
      <AccountSettings />
    </RequireAuth>
  );
}

function AccountSettings() {
  const { user, updateProfile, changePassword, deleteAccount } = useAuth();
  const router = useRouter();

  type ThemeMode = "light" | "dark" | "system";
  type Gender = "male" | "female" | "nonbinary" | "prefer_not_to_say";

  const STORAGE_KEY = "shopclone.account.settings.v1";

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Profile (API-backed fields: name/email/dob). The rest is persisted locally for a realistic, functional demo.
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [fullName, setFullName] = useState(user?.name ?? "");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(user?.dob ?? "");
  const [gender, setGender] = useState<Gender>("prefer_not_to_say");

  // Shipping address (API-backed)
  const [shippingStreet, setShippingStreet] = useState(user?.address?.street ?? "");
  const [shippingCity, setShippingCity] = useState(user?.address?.city ?? "");
  const [shippingState, setShippingState] = useState(user?.address?.state ?? "");
  const [shippingZipCode, setShippingZipCode] = useState(user?.address?.zipCode ?? "");
  const [shippingCountry, setShippingCountry] = useState(user?.address?.country ?? "");
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
  const [savingShipping, setSavingShipping] = useState(false);

  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [savingProfile, setSavingProfile] = useState(false);

  // Security
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [savingPassword, setSavingPassword] = useState(false);
  const [showPw, setShowPw] = useState({ current: false, next: false, confirm: false });

  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [twoFASetupOpen, setTwoFASetupOpen] = useState(false);
  const [twoFACode, setTwoFACode] = useState("");
  const [twoFAError, setTwoFAError] = useState("");

  const [sessions, setSessions] = useState(() => {
    const now = new Date();
    return [
      { id: "s1", device: "MacBook Pro · Chrome", location: "San Francisco, US", lastActive: now.toISOString(), current: true },
      { id: "s2", device: "iPhone 15 · Safari", location: "San Jose, US", lastActive: new Date(now.getTime() - 1000 * 60 * 48).toISOString(), current: false },
      { id: "s3", device: "Windows PC · Edge", location: "Austin, US", lastActive: new Date(now.getTime() - 1000 * 60 * 60 * 19).toISOString(), current: false },
    ];
  });

  // Notifications
  type NotifCategory = "order_updates" | "promotions" | "security_alerts" | "newsletter";
  type Channel = "email" | "sms" | "push";

  const [notif, setNotif] = useState<Record<NotifCategory, Record<Channel, boolean>>>(() => ({
    order_updates: { email: true, sms: false, push: true },
    promotions: { email: true, sms: false, push: false },
    security_alerts: { email: true, sms: true, push: true },
    newsletter: { email: false, sms: false, push: false },
  }));

  // Preferences
  const [language, setLanguage] = useState("en-US");
  const [currency, setCurrency] = useState("USD");
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");

  // Danger zone
  const [modal, setModal] = useState<null | { kind: "deactivate" | "delete" }>(null);
  const [dangerPassword, setDangerPassword] = useState("");
  const [dangerError, setDangerError] = useState("");

  // Load local settings once (username/phone/gender/preferences/2FA/notifications).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<{
        avatarUrl: string | null;
        username: string;
        phone: string;
        gender: Gender;
        twoFAEnabled: boolean;
        notif: Record<NotifCategory, Record<Channel, boolean>>;
        language: string;
        currency: string;
        themeMode: ThemeMode;
      }>;

      if (parsed.avatarUrl !== undefined) setAvatarUrl(parsed.avatarUrl);
      if (parsed.username) setUsername(parsed.username);
      if (parsed.phone) setPhone(parsed.phone);
      if (parsed.gender) setGender(parsed.gender);
      if (typeof parsed.twoFAEnabled === "boolean") setTwoFAEnabled(parsed.twoFAEnabled);
      if (parsed.notif) setNotif(parsed.notif);
      if (parsed.language) setLanguage(parsed.language);
      if (parsed.currency) setCurrency(parsed.currency);
      if (parsed.themeMode) setThemeMode(parsed.themeMode);
    } catch {
      // Ignore: localStorage may be unavailable or corrupted.
    }
  }, []);

  // Keep API-backed profile fields in sync if `user` hydrates after mount.
  useEffect(() => {
    setFullName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setDob(user?.dob ?? "");
    setShippingStreet(user?.address?.street ?? "");
    setShippingCity(user?.address?.city ?? "");
    setShippingState(user?.address?.state ?? "");
    setShippingZipCode(user?.address?.zipCode ?? "");
    setShippingCountry(user?.address?.country ?? "");
  }, [
    user?.name,
    user?.email,
    user?.dob,
    user?.address?.street,
    user?.address?.city,
    user?.address?.state,
    user?.address?.zipCode,
    user?.address?.country,
  ]);

  function persistLocal(partial: Record<string, unknown>) {
    try {
      const prevRaw = localStorage.getItem(STORAGE_KEY);
      const prev = prevRaw ? (JSON.parse(prevRaw) as Record<string, unknown>) : {};
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, ...partial }));
    } catch {
      // Ignore
    }
  }

  const initialRef = useRef<string>("");

  const dirtySnapshot = useMemo(() => {
    // Only compare serializable state (object URLs are okay for “dirty” detection).
    return JSON.stringify({
      avatarUrl,
      fullName,
      username,
      email,
      phone,
      dob,
      gender,
      twoFAEnabled,
      notif,
      language,
      currency,
      themeMode,
    });
  }, [avatarUrl, fullName, username, email, phone, dob, gender, twoFAEnabled, notif, language, currency, themeMode]);

  useEffect(() => {
    // Initialize the baseline once after initial hydration.
    if (!initialRef.current) initialRef.current = dirtySnapshot;
  }, [dirtySnapshot]);

  const isDirty = initialRef.current !== "" && initialRef.current !== dirtySnapshot;

  function validateProfile(): boolean {
    const next: Record<string, string> = {};
    if (!fullName.trim()) next.fullName = "Full name is required";
    if (!username.trim()) next.username = "Username is required";
    if (!email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address";
    }
    if (phone && !/^\+?[0-9 ()-]{7,}$/.test(phone)) {
      next.phone = "Enter a valid phone number";
    }
    setProfileErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSaveProfile() {
    setToast(null);
    if (!validateProfile()) return;
    setSavingProfile(true);
    try {
      // Persist what the backend supports.
      const result = await updateProfile({ name: fullName, email, dob });
      if (!result.success) {
        setProfileErrors((prev) => ({ ...prev, email: result.error ?? "Update failed" }));
        setToast({ message: result.error ?? "Profile update failed", type: "error" });
        return;
      }

      // Persist the rest locally.
      persistLocal({ avatarUrl, username, phone, gender, language, currency, themeMode, twoFAEnabled, notif });

      initialRef.current = dirtySnapshot;
      setToast({ message: "Profile saved", type: "success" });
    } finally {
      setSavingProfile(false);
    }
  }

  function validateShippingAddress(): boolean {
    const next: Record<string, string> = {};
    if (!shippingStreet.trim()) next.street = "Street is required";
    if (!shippingCity.trim()) next.city = "City is required";
    if (!shippingState.trim()) next.state = "State is required";
    if (!shippingZipCode.trim()) next.zipCode = "Zip code is required";
    if (!shippingCountry.trim()) next.country = "Country is required";
    setShippingErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSaveShippingAddress() {
    setToast(null);
    if (!validateShippingAddress()) return;
    setSavingShipping(true);
    try {
      const result = await updateProfile({
        address: {
          street: shippingStreet.trim(),
          city: shippingCity.trim(),
          state: shippingState.trim(),
          zipCode: shippingZipCode.trim(),
          country: shippingCountry.trim(),
        },
      });

      if (!result.success) {
        setToast({ message: result.error ?? "Address update failed", type: "error" });
        return;
      }

      setToast({ message: "Shipping address saved", type: "success" });
    } finally {
      setSavingShipping(false);
    }
  }

  function passwordStrength(pw: string) {
    // Simple, fast meter: length + variety (not a security guarantee).
    const length = pw.length;
    const hasLower = /[a-z]/.test(pw);
    const hasUpper = /[A-Z]/.test(pw);
    const hasDigit = /\d/.test(pw);
    const hasSymbol = /[^A-Za-z0-9]/.test(pw);
    const variety = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length;
    const score =
      (length >= 10 ? 2 : length >= 8 ? 1 : 0) +
      (variety >= 3 ? 2 : variety === 2 ? 1 : 0);
    const clamped = Math.max(0, Math.min(4, score));
    const label = ["Very weak", "Weak", "Okay", "Strong", "Very strong"][clamped];
    const width = [12, 30, 55, 78, 100][clamped];
    const color =
      clamped <= 1 ? "bg-red-500" : clamped === 2 ? "bg-orange-500" : "bg-green-500";
    return { clamped, label, width, color };
  }

  function validatePasswordForm(): boolean {
    const next: Record<string, string> = {};
    if (!currentPassword) next.currentPassword = "Current password is required";
    if (!newPassword) next.newPassword = "New password is required";
    if (newPassword && newPassword.length < 6) next.newPassword = "Use at least 6 characters";
    if (!confirmNewPassword) next.confirmNewPassword = "Please confirm the new password";
    if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) next.confirmNewPassword = "Passwords do not match";
    setPasswordErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onChangePassword() {
    setToast(null);
    if (!validatePasswordForm()) return;
    setSavingPassword(true);
    try {
      const result = await changePassword(currentPassword, newPassword);
      if (!result.success) {
        setPasswordErrors({ currentPassword: result.error ?? "Password change failed" });
        setToast({ message: result.error ?? "Password change failed", type: "error" });
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setPasswordErrors({});
      setToast({ message: "Password updated", type: "success" });
    } finally {
      setSavingPassword(false);
    }
  }

  function onToggle2FA(next: boolean) {
    setTwoFAError("");
    if (next) {
      setTwoFASetupOpen(true);
    } else {
      setTwoFAEnabled(false);
      setTwoFASetupOpen(false);
      setTwoFACode("");
      persistLocal({ twoFAEnabled: false });
      setToast({ message: "Two-factor disabled", type: "success" });
    }
  }

  function complete2FASetup() {
    setTwoFAError("");
    // Demo flow: accept any 6-digit code.
    if (!/^\d{6}$/.test(twoFACode)) {
      setTwoFAError("Enter the 6-digit code");
      return;
    }
    setTwoFAEnabled(true);
    setTwoFASetupOpen(false);
    setTwoFACode("");
    persistLocal({ twoFAEnabled: true });
    setToast({ message: "Two-factor enabled", type: "success" });
  }

  async function confirmDeleteAccount() {
    setDangerError("");
    setToast(null);
    if (!dangerPassword) {
      setDangerError("Password is required");
      return;
    }
    const result = await deleteAccount(dangerPassword);
    if (result.success) {
      router.push("/");
    } else {
      setDangerError(result.error ?? "Delete failed");
    }
  }

  function confirmDeactivate() {
    setToast({ message: "Deactivation requested (demo)", type: "success" });
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-12 py-8">
      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Account Settings</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your profile, security, and preferences.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`hidden sm:flex items-center gap-2 text-xs font-medium ${isDirty ? "text-yellow-700" : "text-gray-500"}`}>
            <span className={`h-2 w-2 rounded-full ${isDirty ? "bg-yellow-500 animate-pulse" : "bg-gray-300"}`} />
            {isDirty ? "Unsaved changes" : "All changes saved"}
          </div>
          <button
            type="button"
            onClick={onSaveProfile}
            disabled={savingProfile}
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] text-gray-900 font-semibold px-5 py-2.5 rounded-xl transition-all text-sm shadow-sm"
          >
            {savingProfile ? <Spinner /> : <SaveIcon />}
            Save
          </button>
        </div>
      </div>

      {isDirty && (
        <div className="enter d0 mb-6 rounded-2xl border border-yellow-200 bg-yellow-50/60 backdrop-blur px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-9 w-9 rounded-xl bg-yellow-400/30 flex items-center justify-center">
              <DotIcon />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">You have unsaved changes</p>
              <p className="text-xs text-gray-600">Review updates across sections and save when ready.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onSaveProfile}
            disabled={savingProfile}
            className="text-sm font-semibold text-gray-900 bg-white/70 hover:bg-white border border-yellow-200 rounded-xl px-4 py-2 transition"
          >
            Save now
          </button>
        </div>
      )}

      {toast && (
        <ToastInline
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left rail */}
        <div className="xl:col-span-7 space-y-6">
          {/* Profile */}
          <SectionCard title="Profile" subtitle="Your public-facing identity and contact details." className="enter d1">
            <div className="flex flex-col sm:flex-row gap-6">
              <AvatarUploader
                value={avatarUrl}
                name={fullName || "Account"}
                onChange={(next) => {
                  setAvatarUrl(next);
                  persistLocal({ avatarUrl: next });
                }}
              />

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FloatingInput
                  id="fullName"
                  label="Full Name"
                  value={fullName}
                  onChange={(v) => {
                    setFullName(v);
                    if (profileErrors.fullName) setProfileErrors((p) => ({ ...p, fullName: "" }));
                  }}
                  error={profileErrors.fullName}
                  autoComplete="name"
                />
                <FloatingInput
                  id="username"
                  label="Username"
                  value={username}
                  onChange={(v) => {
                    setUsername(v);
                    persistLocal({ username: v });
                    if (profileErrors.username) setProfileErrors((p) => ({ ...p, username: "" }));
                  }}
                  error={profileErrors.username}
                />
                <FloatingInput
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(v) => {
                    setEmail(v);
                    if (profileErrors.email) setProfileErrors((p) => ({ ...p, email: "" }));
                  }}
                  error={profileErrors.email}
                  type="email"
                  autoComplete="email"
                />
                <FloatingInput
                  id="phone"
                  label="Phone Number"
                  value={phone}
                  onChange={(v) => {
                    setPhone(v);
                    persistLocal({ phone: v });
                    if (profileErrors.phone) setProfileErrors((p) => ({ ...p, phone: "" }));
                  }}
                  error={profileErrors.phone}
                  inputMode="tel"
                  autoComplete="tel"
                />
                <FloatingInput
                  id="dob"
                  label="Date of Birth"
                  value={dob}
                  onChange={(v) => setDob(v)}
                  type="date"
                />
                <SelectPopover<Gender>
                  label="Gender"
                  value={gender}
                  onChange={(v) => {
                    setGender(v);
                    persistLocal({ gender: v });
                  }}
                  options={[
                    { value: "female", label: "Female" },
                    { value: "male", label: "Male" },
                    { value: "nonbinary", label: "Non-binary" },
                    { value: "prefer_not_to_say", label: "Prefer not to say" },
                  ]}
                />
              </div>
            </div>
          </SectionCard>

          {/* Shipping Address */}
          <SectionCard title="Shipping Address" subtitle="Where we should deliver your orders." className="enter d1b">
            <div id="shipping-address-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <FloatingInput
                    id="shipping-street"
                    label="Street Address"
                    value={shippingStreet}
                    onChange={(v) => {
                      setShippingStreet(v);
                      if (shippingErrors.street) setShippingErrors((p) => ({ ...p, street: "" }));
                    }}
                    error={shippingErrors.street}
                    autoComplete="address-line1"
                  />
                </div>
                <FloatingInput
                  id="shipping-city"
                  label="City"
                  value={shippingCity}
                  onChange={(v) => {
                    setShippingCity(v);
                    if (shippingErrors.city) setShippingErrors((p) => ({ ...p, city: "" }));
                  }}
                  error={shippingErrors.city}
                  autoComplete="address-level2"
                />
                <FloatingInput
                  id="shipping-state"
                  label="State / Province"
                  value={shippingState}
                  onChange={(v) => {
                    setShippingState(v);
                    if (shippingErrors.state) setShippingErrors((p) => ({ ...p, state: "" }));
                  }}
                  error={shippingErrors.state}
                  autoComplete="address-level1"
                />
                <FloatingInput
                  id="shipping-zipCode"
                  label="Zip / Postal Code"
                  value={shippingZipCode}
                  onChange={(v) => {
                    setShippingZipCode(v);
                    if (shippingErrors.zipCode) setShippingErrors((p) => ({ ...p, zipCode: "" }));
                  }}
                  error={shippingErrors.zipCode}
                  autoComplete="postal-code"
                />
                <FloatingInput
                  id="shipping-country"
                  label="Country"
                  value={shippingCountry}
                  onChange={(v) => {
                    setShippingCountry(v);
                    if (shippingErrors.country) setShippingErrors((p) => ({ ...p, country: "" }));
                  }}
                  error={shippingErrors.country}
                  autoComplete="country-name"
                />
              </div>

              <div className="mt-4 flex items-center justify-end">
                <button
                  id="save-shipping-address"
                  type="button"
                  onClick={onSaveShippingAddress}
                  disabled={savingShipping}
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {savingShipping ? <Spinner light /> : <SaveIcon />}
                  Save address
                </button>
              </div>
            </div>
          </SectionCard>

          {/* Security */}
          <SectionCard title="Security" subtitle="Keep your account protected." className="enter d2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-gray-200 bg-white/70 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Change password</h3>
                    <p className="text-xs text-gray-600">Use a strong password you don’t reuse elsewhere.</p>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <FloatingPassword
                    id="currentPassword"
                    label="Current Password"
                    value={currentPassword}
                    onChange={(v) => {
                      setCurrentPassword(v);
                      if (passwordErrors.currentPassword) setPasswordErrors((p) => ({ ...p, currentPassword: "" }));
                    }}
                    error={passwordErrors.currentPassword}
                    visible={showPw.current}
                    onToggleVisible={() => setShowPw((p) => ({ ...p, current: !p.current }))}
                    autoComplete="current-password"
                  />
                  <div>
                    <FloatingPassword
                      id="newPassword"
                      label="New Password"
                      value={newPassword}
                      onChange={(v) => {
                        setNewPassword(v);
                        if (passwordErrors.newPassword) setPasswordErrors((p) => ({ ...p, newPassword: "" }));
                      }}
                      error={passwordErrors.newPassword}
                      visible={showPw.next}
                      onToggleVisible={() => setShowPw((p) => ({ ...p, next: !p.next }))}
                      autoComplete="new-password"
                    />
                    <PasswordMeter strength={passwordStrength(newPassword)} />
                  </div>
                  <FloatingPassword
                    id="confirmNewPassword"
                    label="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(v) => {
                      setConfirmNewPassword(v);
                      if (passwordErrors.confirmNewPassword) setPasswordErrors((p) => ({ ...p, confirmNewPassword: "" }));
                    }}
                    error={passwordErrors.confirmNewPassword}
                    visible={showPw.confirm}
                    onToggleVisible={() => setShowPw((p) => ({ ...p, confirm: !p.confirm }))}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={onChangePassword}
                    disabled={savingPassword}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 text-white py-2.5 text-sm font-semibold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
                  >
                    {savingPassword ? <Spinner light /> : <LockIcon />}
                    Update password
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-gray-200 bg-white/70 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Two-factor authentication (2FA)</h3>
                      <p className="text-xs text-gray-600">Add an extra layer of security to your account.</p>
                    </div>
                    <Toggle
                      checked={twoFAEnabled}
                      onChange={(checked) => onToggle2FA(checked)}
                      ariaLabel="Toggle two-factor authentication"
                    />
                  </div>

                  {twoFASetupOpen && !twoFAEnabled && (
                    <div className="mt-4 rounded-xl border border-gray-200 bg-white/60 p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-xl bg-yellow-400/25 flex items-center justify-center">
                          <QrIcon />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">Set up 2FA</p>
                          <p className="text-xs text-gray-600">Scan a QR code in your authenticator app, then enter the 6-digit code.</p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                        <div className="sm:col-span-2">
                          <FloatingInput
                            id="twofa-code"
                            label="6-digit code"
                            value={twoFACode}
                            onChange={(v) => {
                              setTwoFACode(v.replace(/\s/g, ""));
                              if (twoFAError) setTwoFAError("");
                            }}
                            inputMode="numeric"
                            error={twoFAError}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={complete2FASetup}
                          className="rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-sm py-3 px-4 transition active:scale-[0.98]"
                        >
                          Enable
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTwoFASetupOpen(false)}
                        className="mt-3 text-xs font-semibold text-gray-700 hover:text-gray-900 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white/70 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Active sessions</h3>
                      <p className="text-xs text-gray-600">Revoke sessions you don’t recognize.</p>
                    </div>
                    <span className="text-xs font-semibold text-gray-500">{sessions.length} devices</span>
                  </div>
                  <div className="mt-4 divide-y divide-gray-200">
                    {sessions.map((s) => (
                      <div key={s.id} className="py-3 flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-gray-900 truncate">{s.device}</p>
                            {s.current && (
                              <span className="text-[11px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">This device</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 truncate">{s.location} · Last active {formatRelative(s.lastActive)}</p>
                        </div>
                        <button
                          type="button"
                          disabled={s.current}
                          onClick={() => setSessions((prev) => prev.filter((x) => x.id !== s.id))}
                          className="text-xs font-semibold rounded-lg border border-gray-200 bg-white/70 px-3 py-1.5 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          Revoke
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right rail */}
        <div className="xl:col-span-5 space-y-6">
          {/* Notifications */}
          <SectionCard title="Notifications" subtitle="Fine-tune how we contact you." className="enter d3">
            <div className="rounded-2xl border border-gray-200 bg-white/70 overflow-hidden">
              <div className="px-5 py-3 bg-gradient-to-b from-white/80 to-white/60 border-b border-gray-200">
                <div className="grid grid-cols-4 gap-2 text-[11px] font-semibold text-gray-500">
                  <span className="col-span-1">Category</span>
                  <span className="text-center">Email</span>
                  <span className="text-center">SMS</span>
                  <span className="text-center">Push</span>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {([
                  { key: "order_updates", label: "Order Updates", hint: "Shipping, delivery, returns" },
                  { key: "promotions", label: "Promotions", hint: "Sales & limited offers" },
                  { key: "security_alerts", label: "Security Alerts", hint: "Suspicious activity" },
                  { key: "newsletter", label: "Newsletter", hint: "Weekly highlights" },
                ] as const).map((row) => (
                  <div key={row.key} className="px-5 py-4">
                    <div className="grid grid-cols-4 gap-2 items-center">
                      <div className="col-span-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{row.label}</p>
                        <p className="text-xs text-gray-600 truncate">{row.hint}</p>
                      </div>
                      {(["email", "sms", "push"] as const).map((ch) => (
                        <div key={ch} className="flex justify-center">
                          <Toggle
                            checked={notif[row.key][ch]}
                            onChange={(checked) => {
                              setNotif((prev) => {
                                const next = {
                                  ...prev,
                                  [row.key]: { ...prev[row.key], [ch]: checked },
                                };
                                persistLocal({ notif: next });
                                return next;
                              });
                            }}
                            ariaLabel={`${row.label} via ${ch}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Preferences */}
          <SectionCard title="Preferences" subtitle="Personalize your experience." className="enter d4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectPopover
                label="Language"
                value={language}
                onChange={(v) => {
                  setLanguage(v);
                  persistLocal({ language: v });
                }}
                options={[
                  { value: "en-US", label: "🇺🇸 English (US)" },
                  { value: "en-GB", label: "🇬🇧 English (UK)" },
                  { value: "es-ES", label: "🇪🇸 Español" },
                  { value: "fr-FR", label: "🇫🇷 Français" },
                  { value: "de-DE", label: "🇩🇪 Deutsch" },
                ]}
              />
              <SelectPopover
                label="Currency"
                value={currency}
                onChange={(v) => {
                  setCurrency(v);
                  persistLocal({ currency: v });
                }}
                options={[
                  { value: "USD", label: "USD — $" },
                  { value: "EUR", label: "EUR — €" },
                  { value: "GBP", label: "GBP — £" },
                  { value: "JPY", label: "JPY — ¥" },
                ]}
              />
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-900">Theme</p>
              <p className="text-xs text-gray-600">Choose how the dashboard appears.</p>
              <div className="mt-3 grid grid-cols-3 rounded-2xl border border-gray-200 bg-white/70 p-1">
                {([
                  { key: "light", label: "Light", icon: <SunIcon /> },
                  { key: "dark", label: "Dark", icon: <MoonIcon /> },
                  { key: "system", label: "System", icon: <SystemIcon /> },
                ] as const).map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => {
                      setThemeMode(opt.key);
                      persistLocal({ themeMode: opt.key });
                    }}
                    className={`group relative rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                      themeMode === opt.key
                        ? "bg-gray-900 text-white shadow-sm"
                        : "text-gray-700 hover:bg-white"
                    }`}
                  >
                    <span className={`inline-flex items-center gap-2 ${themeMode === opt.key ? "icon-pop" : ""}`}>
                      <span className="h-4 w-4">{opt.icon}</span>
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Danger zone */}
          <SectionCard title="Danger Zone" subtitle="Proceed carefully." className="enter d5" tone="danger">
            <div className="space-y-3">
              <DangerAction
                title="Deactivate account"
                description="Temporarily disable your account and hide your profile." 
                cta="Request deactivation"
                onClick={() => {
                  setDangerPassword("");
                  setDangerError("");
                  setModal({ kind: "deactivate" });
                }}
              />
              <DangerAction
                title="Delete account"
                description="Permanently delete your account and associated data." 
                cta="Delete"
                onClick={() => {
                  setDangerPassword("");
                  setDangerError("");
                  setModal({ kind: "delete" });
                }}
                destructive
              />
            </div>
          </SectionCard>
        </div>
      </div>

      {modal?.kind === "delete" && (
        <ConfirmModal
          title="Delete your account"
          description="This action is permanent. To confirm, type DELETE and enter your password."
          confirmText="DELETE"
          confirmLabel="Delete account"
          tone="danger"
          error={dangerError}
          onClose={() => {
            setModal(null);
            setDangerError("");
          }}
          renderExtra={() => (
            <div className="mt-4">
              <FloatingPassword
                id="danger-password"
                label="Password"
                value={dangerPassword}
                onChange={(v) => {
                  setDangerPassword(v);
                  if (dangerError) setDangerError("");
                }}
                visible={false}
                onToggleVisible={() => {}}
                hideToggle
                error={dangerError}
                autoComplete="current-password"
              />
            </div>
          )}
          onConfirm={async () => {
            await confirmDeleteAccount();
          }}
        />
      )}

      {modal?.kind === "deactivate" && (
        <ConfirmModal
          title="Deactivate your account"
          description="We’ll temporarily disable your account. To confirm, type DEACTIVATE."
          confirmText="DEACTIVATE"
          confirmLabel="Confirm deactivation"
          onClose={() => setModal(null)}
          onConfirm={() => {
            confirmDeactivate();
            setModal(null);
          }}
        />
      )}

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .enter { opacity: 0; animation: fadeUp 520ms cubic-bezier(.2,.8,.2,1) forwards; }
        .d0 { animation-delay: 0ms; }
        .d1 { animation-delay: 100ms; }
        .d2 { animation-delay: 200ms; }
        .d3 { animation-delay: 300ms; }
        .d4 { animation-delay: 400ms; }
        .d5 { animation-delay: 500ms; }
        @keyframes iconPop {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-1px) scale(1.06); }
          100% { transform: translateY(0) scale(1); }
        }
        .icon-pop { animation: iconPop 280ms ease-out; }
      `}</style>
    </div>
  );
}

function SectionCard({
  title,
  subtitle,
  children,
  className = "",
  tone = "default",
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "danger";
}) {
  const shell =
    tone === "danger"
      ? "border-red-200 bg-gradient-to-b from-red-50/70 to-white/50"
      : "border-gray-200 bg-gradient-to-b from-white/80 to-white/50";

  return (
    <section className={`rounded-3xl border ${shell} backdrop-blur shadow-sm ${className}`}>
      <div className="px-6 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-gray-900">{title}</h2>
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
          {tone === "danger" && (
            <div className="h-10 w-10 rounded-2xl bg-red-500/10 border border-red-200 flex items-center justify-center">
              <WarningIcon />
            </div>
          )}
        </div>
      </div>
      <div className="px-6 pb-6 pt-5">{children}</div>
    </section>
  );
}

function AvatarUploader({
  value,
  name,
  onChange,
}: {
  value: string | null;
  name: string;
  onChange: (next: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    return () => {
      // Revoke object URL when component unmounts.
      if (value && value.startsWith("blob:")) URL.revokeObjectURL(value);
    };
  }, [value]);

  const initials = useMemo(() => {
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "A";
  }, [name]);

  return (
    <div className="flex flex-col items-center sm:items-start gap-3">
      <div
        className="relative h-28 w-28 rounded-full overflow-hidden border border-white/70 shadow-sm bg-white"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {value ? (
          // Circular crop preview.
          <img src={value} alt="Avatar" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-b from-gray-100 to-white flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-500">{initials}</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`absolute inset-0 grid place-items-center text-sm font-semibold text-white transition-opacity duration-200 ${
            hover ? "opacity-100" : "opacity-0"
          } bg-gray-900/45 backdrop-blur`}
          aria-label="Change photo"
        >
          <span className="inline-flex items-center gap-2">
            <CameraIcon />
            Change Photo
          </span>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const url = URL.createObjectURL(file);
            onChange(url);
          }}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-xs font-semibold text-gray-900 bg-white/70 hover:bg-white border border-gray-200 rounded-xl px-3 py-2 transition"
        >
          Upload
        </button>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="text-xs font-semibold text-gray-600 hover:text-gray-900 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function FloatingInput({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  inputMode,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
}) {
  const base =
    "peer w-full rounded-2xl border bg-white/70 px-4 pb-3 pt-5 text-sm text-gray-900 placeholder-transparent outline-none transition focus:ring-2";
  const border = error ? "border-red-300 focus:border-red-300 focus:ring-red-200" : "border-gray-200 focus:border-yellow-300 focus:ring-yellow-200";

  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          inputMode={inputMode}
          autoComplete={autoComplete}
          className={`${base} ${border}`}
        />
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 top-4 origin-left -translate-y-1 scale-90 text-xs font-semibold transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm ${
            error ? "text-red-600" : "text-gray-500 peer-focus:text-gray-700"
          } peer-focus:top-4 peer-focus:-translate-y-1 peer-focus:scale-90`}
        >
          {label}
        </label>
      </div>
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

function FloatingPassword({
  id,
  label,
  value,
  onChange,
  error,
  visible,
  onToggleVisible,
  autoComplete,
  hideToggle,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  visible: boolean;
  onToggleVisible: () => void;
  autoComplete?: string;
  hideToggle?: boolean;
}) {
  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          autoComplete={autoComplete}
          className={`peer w-full rounded-2xl border bg-white/70 px-4 pb-3 pt-5 pr-12 text-sm text-gray-900 placeholder-transparent outline-none transition focus:ring-2 ${
            error ? "border-red-300 focus:border-red-300 focus:ring-red-200" : "border-gray-200 focus:border-yellow-300 focus:ring-yellow-200"
          }`}
        />
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 top-4 origin-left -translate-y-1 scale-90 text-xs font-semibold transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm ${
            error ? "text-red-600" : "text-gray-500 peer-focus:text-gray-700"
          } peer-focus:top-4 peer-focus:-translate-y-1 peer-focus:scale-90`}
        >
          {label}
        </label>

        {!hideToggle && (
          <button
            type="button"
            onClick={onToggleVisible}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl border border-gray-200 bg-white/70 hover:bg-white transition grid place-items-center"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

function PasswordMeter({ strength }: { strength: { label: string; width: number; color: string } }) {
  const widthClass =
    strength.width === 12
      ? "w-[12%]"
      : strength.width === 30
        ? "w-[30%]"
        : strength.width === 55
          ? "w-[55%]"
          : strength.width === 78
            ? "w-[78%]"
            : "w-full";
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold text-gray-500">Strength</p>
        <p className="text-[11px] font-semibold text-gray-700">{strength.label}</p>
      </div>
      <div className="mt-1 h-2 rounded-full bg-gray-100 overflow-hidden">
        <div className={`h-full ${strength.color} ${widthClass} rounded-full transition-all duration-300`} />
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, ariaLabel }: { checked: boolean; onChange: (checked: boolean) => void; ariaLabel: string }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-8 w-14 items-center rounded-full border transition duration-200 ${
        checked ? "bg-gray-900 border-gray-900" : "bg-white/70 border-gray-200"
      }`}
    >
      <span
        className={`inline-block h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-7" : "translate-x-1"
        }`}
      />
      {checked && <span className="absolute left-2 text-[10px] font-bold text-white">ON</span>}
      {!checked && <span className="absolute right-2 text-[10px] font-bold text-gray-500">OFF</span>}
    </button>
  );
}

function SelectPopover<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (rootRef.current && !rootRef.current.contains(t)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const selected = options.find((o) => o.value === value)?.label ?? String(value);

  return (
    <div ref={rootRef}>
      <p className="text-xs font-semibold text-gray-500 mb-1.5">{label}</p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 text-sm text-gray-900 flex items-center justify-between gap-3 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300`}
        aria-expanded={open}
      >
        <span className="truncate">{selected}</span>
        <ChevronIcon open={open} />
      </button>
      <div
        className={`relative ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute z-20 mt-2 w-full rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden transition-all duration-200 ${
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
          }`}
        >
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition flex items-center justify-between ${
                o.value === value ? "bg-yellow-50 text-gray-900" : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <span className="truncate">{o.label}</span>
              {o.value === value && <CheckIcon />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToastInline({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onClose, 3200);
    return () => window.clearTimeout(t);
  }, [onClose]);

  return (
    <div className="enter d0 mb-6">
      <div
        className={`rounded-2xl border px-4 py-3 flex items-start justify-between gap-3 shadow-sm backdrop-blur ${
          type === "success"
            ? "border-green-200 bg-green-50/60"
            : "border-red-200 bg-red-50/60"
        }`}
        role="status"
      >
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 h-9 w-9 rounded-xl flex items-center justify-center ${
              type === "success" ? "bg-green-500/10 border border-green-200" : "bg-red-500/10 border border-red-200"
            }`}
          >
            {type === "success" ? <CheckCircleIcon /> : <ErrorIcon />}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{message}</p>
            <p className="text-xs text-gray-600">This is a demo UI; some preferences are stored locally.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="h-9 w-9 rounded-xl border border-gray-200 bg-white/70 hover:bg-white transition grid place-items-center"
          aria-label="Dismiss"
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
}

function DangerAction({
  title,
  description,
  cta,
  onClick,
  destructive,
}: {
  title: string;
  description: string;
  cta: string;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-white/60 p-4 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-600 mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        onClick={onClick}
        className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition active:scale-[0.98] ${
          destructive
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-white/70 hover:bg-white text-gray-900 border border-red-200"
        }`}
      >
        {cta}
      </button>
    </div>
  );
}

function ConfirmModal({
  title,
  description,
  confirmText,
  confirmLabel,
  onClose,
  onConfirm,
  tone = "default",
  error,
  renderExtra,
}: {
  title: string;
  description: string;
  confirmText: string;
  confirmLabel: string;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  tone?: "default" | "danger";
  error?: string;
  renderExtra?: () => ReactNode;
}) {
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);
  const ok = typed.trim().toUpperCase() === confirmText.toUpperCase();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const ctaClass =
    tone === "danger"
      ? "bg-red-600 hover:bg-red-700 text-white"
      : "bg-gray-900 hover:bg-gray-800 text-white";

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mx-auto mt-24 w-[92%] max-w-lg">
        <div className="rounded-3xl border border-gray-200 bg-white shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="h-10 w-10 rounded-2xl border border-gray-200 bg-white/70 hover:bg-white transition grid place-items-center"
                aria-label="Close"
              >
                <XIcon />
              </button>
            </div>
          </div>
          <div className="p-6">
            <FloatingInput
              id="typed-confirm"
              label={`Type ${confirmText} to confirm`}
              value={typed}
              onChange={setTyped}
              error={error}
            />
            {renderExtra?.()}

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-gray-200 bg-white/70 hover:bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!ok || busy}
                onClick={async () => {
                  setBusy(true);
                  try {
                    await onConfirm();
                  } finally {
                    setBusy(false);
                  }
                }}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${ctaClass}`}
              >
                {busy ? <Spinner light /> : <TrashIcon />}
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatRelative(iso: string) {
  const t = new Date(iso).getTime();
  const diff = Date.now() - t;
  const m = Math.round(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  return `${d}d ago`;
}

function Spinner({ light }: { light?: boolean }) {
  return (
    <span
      className={`inline-block h-4 w-4 rounded-full border-2 border-t-transparent animate-spin ${
        light ? "border-white/80" : "border-gray-900/80"
      }`}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG, self-contained)                                */
/* ------------------------------------------------------------------ */

function SaveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10v4H7V7Zm-2 14h14a2 2 0 0 0 2-2V9.828a2 2 0 0 0-.586-1.414l-2.828-2.828A2 2 0 0 0 16.172 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function DotIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 0 0-8 0v4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 11h12v10H6V11Z" />
    </svg>
  );
}

function QrIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h3v3H7V7Zm7 0h3v3h-3V7ZM7 14h3v3H7v-3Zm7 7v-3h3v3h-3Zm-1-7h2m-2 2h4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`h-4 w-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-gray-900" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-green-700" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-red-700" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 17h.01" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-gray-700" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-red-700" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 17h.01" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 6V4h8v2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l1 16h10l1-16" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-gray-700" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-gray-700" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="m3 3 18 18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.58 10.58A3 3 0 0 0 12 15a3 3 0 0 0 2.42-4.42" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.88 5.09A10.49 10.49 0 0 1 12 5c4.478 0 8.268 2.943 9.542 7a10.6 10.6 0 0 1-4.118 5.486" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.228 6.228A10.6 10.6 0 0 0 2.458 12c1.274 4.057 5.064 7 9.542 7 1.09 0 2.14-.174 3.132-.496" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h2l1-2h4l1 2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0-1.414-1.414M7.05 7.05 5.636 5.636" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17h6m-7 4h8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18v12H3V4Z" />
    </svg>
  );
}
