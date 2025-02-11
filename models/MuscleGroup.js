import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const MuscleGroupSchema = new Schema(
  {
    muscleGroupName: { type: String, required: true, unique: true },
    description: { type: String },
    imageUrl: { type: String, default: null },
  },
  { timestamps: true }
);

const MuscleGroupModel =
  models.MuscleGroup || model("MuscleGroup", MuscleGroupSchema);

export default MuscleGroupModel;
