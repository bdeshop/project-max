import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    game_uuid: { type: String, required: true },
    image: { type: String, required: true },
    providerName: { type: String, required: true },
    gameName: { type: String, required: true },
    gameApiImage: { type: String, required: true },
    subMenuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubOption",
      required: true,
    },
    isHomeShow: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Game", GameSchema);
