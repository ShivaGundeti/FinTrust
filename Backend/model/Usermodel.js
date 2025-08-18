import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    description: { type: String, trim: true },
    type: { type: String, enum: ["sent", "received"], required: true },
    date: { type: Date, default: Date.now },
    otherUserId: { type: mongoose.Schema.Types.ObjectId, ref: "user"},
    otherUserName: { type: String}
  },
  { _id: false } 
);

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    balance: { type: Number, default: 5000 },
    accountNumber: { type: String, unique: true },
    phone: { type: String },
    address: { type: String },
    pin: { type: String, required: true, minlength: 4 },
    transactions: [TransactionSchema] 
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("user", UserSchema);
export default User;
