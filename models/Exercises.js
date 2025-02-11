import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const ExercisesSchema = new Schema(
  {
    exerciseName: { type: String, required: true },
    equipmentType: {
      type: Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
    },
    variantType: {
      type: Schema.Types.ObjectId,
      ref: "Variant",
      required: true,
    },
    primaryMuscleGroup: {
      type: Schema.Types.ObjectId,
      ref: "MuscleGroup",
      required: true,
    },
    secondaryMuscleGroups: [
      { type: Schema.Types.ObjectId, ref: "MuscleGroup" },
    ],
    description: { type: String, default: null },
    imageUrl: { type: String, default: null },
    instructions: { type: [String], default: null },
  },
  { timestamps: true }
);

const ExerciseModel = models.Exercises || model("Exercises", ExercisesSchema);

export default ExerciseModel;
