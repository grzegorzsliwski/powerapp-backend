import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

// interface IExercise extends mongoose.Document {
//   exerciseName: string;
//   equipmentType: Types.ObjectId;
//   primaryMuscleGroup: Types.ObjectId;
//   secondaryMuscleGroups: Types.ObjectId[];
//   description?: string;
//   imageUrl?: string;
//   instructions?: string[];
// }
// <IExercise>
const ExercisesSchema = new Schema(
  {
    exerciseName: { type: String, required: true },
    equipmentType: {
      type: Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
    },
    primaryMuscleGroup: {
      type: Schema.Types.ObjectId,
      ref: "MuscleGroup",
      required: true,
    },
    secondaryMuscleGroups: [
      { type: Schema.Types.ObjectId, ref: "MuscleGroup", required: true },
    ],
    description: { type: String },
    imageUrl: { type: String },
    instructions: [{ type: String }],
  },
  { timestamps: true }
);
// <IExercise>
const ExerciseModel = models.Exercises || model("Exercises", ExercisesSchema);

export default ExerciseModel;
