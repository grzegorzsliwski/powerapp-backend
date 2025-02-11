import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const VariantSchema = new Schema(
  {
    variantName: { type: String, required: true, unique: true },
    description: { type: String },
    imageUrl: { type: String, default: null },
  },
  { timestamps: true }
);

const VariantModel = models.Variant || model("Variant", VariantSchema);

export default VariantModel;
