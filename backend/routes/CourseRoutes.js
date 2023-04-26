import express, { Router } from "express";
import {
  addLectures,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourseLectures,
} from "../controllers/CourseController.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//get all courses:
router.route("/courses").get(getAllCourses);


//create new course
router
  .route("/createcourse")
  .post(isAuthenticated, authorizedAdmin, singleUpload, createCourse);

//add lectures:
router
  .route("/course/:id")
  .get(isAuthenticated, getCourseLectures)
  .post(isAuthenticated, authorizedAdmin, singleUpload, addLectures)
  .delete(isAuthenticated, authorizedAdmin, singleUpload, deleteCourse);

//delete lecture:
router
  .route("/lecture")
  .delete(isAuthenticated, authorizedAdmin, deleteLecture);

export default router;
