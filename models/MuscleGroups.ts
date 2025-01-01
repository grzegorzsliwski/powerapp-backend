import mongoose, { Schema, model, models } from "mongoose";

interface IMuscleGroup extends mongoose.Document {
  muscleGroupName: string;
  description?: string;
}

const MuscleGroupSchema = new Schema<IMuscleGroup>(
  {
    muscleGroupName: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

const MuscleGroupModel =
  models.MuscleGroup || model<IMuscleGroup>("MuscleGroup", MuscleGroupSchema);

export default MuscleGroupModel;
