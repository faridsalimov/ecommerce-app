import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ad tələb olunur"],
      trim: true,
      minlength: [2, "Ad ən azı 2 simvol olmalıdır"],
      maxlength: [50, "Ad 50 simvoldan çox ola bilməz"],
    },
    email: {
      type: String,
      required: [true, "Email tələb olunur"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Düzgün email daxil edin"],
    },
    password: {
      type: String,
      required: [true, "Şifrə tələb olunur"],
      minlength: [6, "Şifrə ən azı 6 simvol olmalıdır"],
    },
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// Prevent duplicate email registration
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
