import mongoose from "mongoose";

const SubOptionSchema = new mongoose.Schema({
  providerId: { type: String, required: true },
  image: { type: String, required: true },
  menuName: { type: String, required: true },
});

export default mongoose.model("SubOption", SubOptionSchema);
