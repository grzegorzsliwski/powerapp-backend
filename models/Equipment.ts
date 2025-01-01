import mongoose, { Schema, model, models } from "mongoose";

interface IEquipment extends mongoose.Document {
  equipmentName: string;
  description?: string;
}

const EquipmentSchema = new Schema<IEquipment>(
  {
    equipmentName: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

const EquipmentModel =
  models.Equipment || model<IEquipment>("Equipment", EquipmentSchema);

export default EquipmentModel;
