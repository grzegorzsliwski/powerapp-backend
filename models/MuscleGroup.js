import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const MuscleGroupSchema = new Schema(
  {
    muscleGroupName: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

const MuscleGroupModel =
  models.MuscleGroup || model("MuscleGroup", MuscleGroupSchema);

export default MuscleGroupModel;
