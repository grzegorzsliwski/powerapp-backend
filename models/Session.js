import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

// Session Set Schema (for individual exercises)
const SessionSetSchema = new Schema({
  exerciseId: {
    type: Schema.Types.ObjectId,
    ref: "Exercises",
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    default: null,
  },
  repRangeMin: {
    type: Number,
    default: null,
  },
  repRangeMax: {
    type: Number,
    default: null,
  },
  weight: {
    type: Number,
    default: null,
  },
  notes: {
    type: String,
    default: null,
  },
});

// Session Schema
const SessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workoutPlanId: {
      type: Schema.Types.ObjectId,
      ref: "WorkoutPlan",
      required: true,
    },
    weekNumber: {
      type: Number,
      required: true,
    },
    dayNumber: {
      type: Number,
      required: true,
    },
    sessionName: {
      type: String,
      required: true,
    },
    lastPerformed: {
      type: Date,
      default: Date.now,
    },
    exercises: [SessionSetSchema],
    notes: {
      type: String,
      default: null,
    },
    duration: {
      type: Number, // in minutes
      default: null,
    },
    status: {
      type: String,
      enum: ["planned", "in-progress", "completed"],
      default: "planned",
    },
  },
  {
    timestamps: true,
  }
);

// Week Schema
const WeekSchema = new Schema({
  weekNumber: {
    type: Number,
    required: true,
  },
  sessions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Session",
    },
  ],
  notes: {
    type: String,
    default: null,
  },
});

// Workout Plan Schema
const WorkoutPlanSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    totalWeeks: {
      type: Number,
      required: true,
    },
    weeks: [WeekSchema],
    status: {
      type: String,
      enum: ["draft", "active", "completed", "archived"],
      default: "draft",
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "intermediate",
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
SessionSchema.index({ userId: 1, workoutPlanId: 1, weekNumber: 1 });
WorkoutPlanSchema.index({ userId: 1, status: 1 });

const SessionModel = models.Session || model("Session", SessionSchema);
const WorkoutPlanModel =
  models.WorkoutPlan || model("WorkoutPlan", WorkoutPlanSchema);

export { SessionModel, WorkoutPlanModel };
