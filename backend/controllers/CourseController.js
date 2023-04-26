import cloudinary from "cloudinary";
import { catchAsyncErrors } from "../middlewares/CatchAsyncErrors.js";
import { Course } from "../models/Course.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
export const getAllCourses = catchAsyncErrors(async (req, res, next) => {
  const courses = await Course.find().select("-lectures");

  res.status(200).json({
    success: true,
    courses,
  });
});



export const createCourse = catchAsyncErrors(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;
  if (!title || !description || !category || !createdBy)
    return next(new ErrorHandler("Please Provide All Fields", 400));

  const file = req.file;
  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    message: "Course Created Successfully",
  });
});

export const getCourseLectures = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  
  if (!course) return next(new ErrorHandler("No such course", 400));
  course.views += 1;
  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});

//Max Video size: 100MB
export const addLectures = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const course = await Course.findById(id);

  if (!course) return next(new ErrorHandler("No such course", 404));

  //upload file here:
  const file = req.file;
  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    resource_type: "video",
  });

  course.lectures.push({
    title,
    description,
    video: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  course.numOfVideos = course.lectures.length;
  await course.save();
  res.status(200).json({
    success: true,
    message: `Lectures Added in Course`,
  });
});

export const deleteCourse = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) return next(new ErrorHandler("No Such Course", 404));

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  for (let i = 0; i < course.lectures.length; i++) {
    const singleLecture = course.lectures[i];
    await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
      resource_type: "video",
    });
  }

  await course.remove();

  res.status(201).json({
    success: true,
    message: "Course Deleted Successfully",
  });
});

export const deleteLecture = catchAsyncErrors(async (req, res, next) => {
  const { courseId, lectureId } = req.query;

  const course = await Course.findById(courseId);
  if (!course) return next(new ErrorHandler("No Such Course", 404));

  const lecture = course.lectures.find((item) => {
    if (item._id.toString() === lectureId.toString()) return item;
  });

  await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
    resource_type: "video",
  });
  course.lectures = course.lectures.filter((item) => {
    if (item._id.toString() !== lectureId.toString()) return item;
  });

  course.numOfVideos = course.lectures.length;
  await course.save();

  res.status(201).json({
    success: true,
    message: "Lecture Deleted Successfully",
  });
});
