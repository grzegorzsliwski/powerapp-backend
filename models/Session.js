import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
import { ExercisesSchema } from "./Exercises.js";

const SessionSchema = new Schema(
  {
    program: {
      type: Schema.Types.ObjectId,
      ref: "Program",
      required: [true, "Program reference is required"],
    },
    weekNumber: {
      type: Number,
      required: [true, "Week number is required"],
      min: [1, "Week number must be at least 1"],
    },
    dayNumber: {
      type: Number,
      required: [true, "Day number is required"],
      min: [1, "Day number must be at least 1"],
      max: [7, "Day number cannot exceed 7"],
    },
    sessionName: {
      type: String,
      default: function () {
        return `Week ${this.weekNumber} Day ${this.dayNumber}`;
      },
    },
    exercises: [ExercisesSchema],
  },
  { timestamps: true }
);

const SessionModel = models.Session || model("Session", SessionSchema);

export default SessionModel;
