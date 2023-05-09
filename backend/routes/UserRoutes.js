import express from "express";
import {
  addToPlaylist,
  changePassword,
  createNote,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllNotes,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateNotePermission,
  updateProfile,
  updateProfilePicture,
  updateProfilePictureNew,
  updateProfilenew,
  updateUserRole,
  verifyEmailOtp,
} from "../controllers/userController.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
// otp-verify
router.route("/verifyemailotp").post(verifyEmailOtp);
//login user:
router.route("/login").post(login);
//logout:
router.route("/logout").get(logout);


//get my profile:
router.route("/me").get(isAuthenticated, getMyProfile);

//delete my profile:
router.route("/me").delete(isAuthenticated, deleteMyProfile);

//Change Password:
router.route("/changepassword").put(isAuthenticated, changePassword);
//forget password:
router.route("/forgetpassword").post(forgetPassword);
//reset password:
router.route("/resetpassword/:token").put(resetPassword);
//update profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);
router.route("/updateprofilenew").post(updateProfilenew);
//update Profile pic:
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateProfilePicture);
router
  .route("/updateprofilepictureui")
  .post(singleUpload, updateProfilePictureNew);

//add - remove course to playlist:
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

// Admin routes:
router.route("/admin/users").get(isAuthenticated, authorizedAdmin, getAllUsers);
router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizedAdmin, updateUserRole)
  .delete(isAuthenticated, authorizedAdmin, deleteUser);

router.route("/createnote").post(createNote);
router.route("/updatenoteper").post(updateNotePermission);
router.route("/getnotes").get(getAllNotes);

export default router;
