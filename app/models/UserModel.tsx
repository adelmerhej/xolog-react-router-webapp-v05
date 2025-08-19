/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import type { Document, Model } from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "admin" | "user" | "customer";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  fullName?: string;
  profilePicture?: string;
  twoFactorEnabled: boolean;
  twoFactorSecret: string;
  resetToken: string;
  tokenExpiryDate: Date;
  role: UserRole;
  loginAttempts: number;
  lockoutExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers and underscores",
      ],
    },
    password: {
      type: String,
      required: [true, "password is required"],
  minlength: [6, 'Password must be at least 6 characters'],
  select: false, // hide by default; must be explicitly selected
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
  lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },
    fullName: {
      type: String,
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },
    profilePicture: {
      type: String,
      default: "",
      validate: {
        validator: (v: string) => v === "" || /\.(jpe?g|png|gif|bmp)$/i.test(v),
        message: "Profile picture must be a valid image URL",
      },
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: {
      type: String,
      default: "",
    },
    resetToken: {
      type: String,
      default: "",
    },
    tokenExpiryDate: {
      type: Date,
      default: () => new Date(Date.now() + 3600000), // 1 hour from now
    },

    role: {
      type: String,
      enum: ["admin", "user", "customer"],
      default: "user",
      required: true,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockoutExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// 🔑 Password field should not be returned in queries
// Prevent returning resetToken in queries
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.resetToken;
  delete user.__v;
  return user;
};

// 🔐 Pre-save hook to hash password
UserSchema.pre("save", async function (next) {
  const user = this as IUser;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

// 🔍 Method to compare hashed password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.path('email').validate(async function (email: string) {
  const count = await mongoose.models.User.countDocuments({ email });
  return !count;
}, 'Email already exists');

UserSchema.path('username').validate(async function (username: string) {
  const count = await mongoose.models.User.countDocuments({ username });
  return !count;
}, 'Username already exists');

// 🔒 Export the model
// Prevent model overwrite during hot reloads
export const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export const getUsers = async () => {
  return await UserModel.find().select('-password -resetToken');
};

export const getUserByUsername = async (username: string) => {
  return await UserModel.findOne({ username }).select('-password -resetToken');
};

// New: fetch by username OR email (case-insensitive for email)
export const getUserByIdentifier = async (identifier: string) => {
  const query = identifier.includes('@')
    ? { email: identifier.toLowerCase() }
    : { username: identifier };
  return await UserModel.findOne(query).select('-password -resetToken');
};
