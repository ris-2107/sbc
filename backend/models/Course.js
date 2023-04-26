import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter course title"],
    minLength: [4, "title must be of 4 characters or more"],
    maxLength: [80, "title must be of 80 characters or less"],
  },
  description: {
    type: String,
    required: [true, "Please enter course title"],
    minLength: [20, "title must be of 20 characters or more"],
    maxLength: [10000, "title must be of 10000 characters or less"],
  },
  lectures: [
    {
      title: {
        type: String,
        required: [true, "Please enter lecture title"],
      },
      description: {
        type: String,
        required: [true, "Please enter lecture description"],
      },
      video: {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    },
  ],

  poster: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },

  views: {
    type: Number,
    default: 0,
  },
  numOfVideos: {
    type: Number,
    default: 0,
  },

  category: {
    type: String,
    required: true,
  },

  createdBy: {
    type: String,
    required: [true, "Enter course creator name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Course = mongoose.model("Course", schema);
