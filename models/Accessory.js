import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const AccessorySchema = new Schema(
  {
    mainLiftName: { type: String, required: true, unique: true },
    description: { type: String },
    imageUrl: { type: String, default: null },
  },
  { timestamps: true }
);
{
}
const AccessoryModel = models.Accessory || model("Accessory", AccessorySchema);

export default AccessoryModel;
