import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  dob: string;
  password: string;
  address: IUserAddress;
  currentToken?: string;
  createdAt: Date;
}

const AddressSchema = new Schema<IUserAddress>(
  {
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zipCode: { type: String, default: "" },
    country: { type: String, default: "" },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  dob: { type: String, default: "" },
  password: { type: String, required: true },
  address: { type: AddressSchema, default: () => ({}) },
  currentToken: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
}, { collection: "users" });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
