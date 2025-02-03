import mongoose from "mongoose"

const HeroImageSchema = new mongoose.Schema(
  {
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("HeroImages", HeroImageSchema);
