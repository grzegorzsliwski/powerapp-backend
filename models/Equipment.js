import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

// interface IEquipment extends mongoose.Document {
//   equipmentName: string;
//   description?: string;
// }
{
  /* <IEquipment> */
}
const EquipmentSchema = new Schema(
  {
    equipmentName: { type: String, required: true, unique: true },
    description: { type: String },
    imageUrl: { type: String, default: null },
  },
  { timestamps: true }
);
{
  /* <IEquipment> */
}
const EquipmentModel = models.Equipment || model("Equipment", EquipmentSchema);

export default EquipmentModel;
