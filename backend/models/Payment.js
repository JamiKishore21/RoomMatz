import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  hostelName: { type: String, required: true },
  roomType: { type: String, required: true },
  price: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  transactionId: { type: String, required: true, unique: true },
  paymentDate: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
