import { catchAsyncErrors } from "../middlewares/CatchAsyncErrors.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";
import { Course } from "../models/Course.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import * as redis from "redis";
import { GlobalNote } from "../models/GlobalNote.js";
let redisClient;

(async () => {
  redisClient = redis.createClient({
    password: 'LLZ1CPC639ipEv9orgUdpXCAUIbmcpIQ',
    socket: {
      host: 'redis-15636.c301.ap-south-1-1.ec2.cloud.redislabs.com',
      port: 15636
    }
  });

  redisClient.on("error", (error) => console.error(`Error Redis Connection : ${error}`));

  await redisClient.connect();
})();

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const file = req.file;

  if (!name || !email || !password || !file)
    return next(new ErrorHandler("Please Enter All Fields", 400));

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exists", 409));

  //upload file on cloudinary:

  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  const OTP = await user.userRegOtp;
  var msg = `<p>Your Email-verification OTP is: <b>${OTP}</b></p>`;
  await sendEmail(email, "Course Bundler Email Verification OTP", msg);
  //await User.deleteOne({email})
  res.status(200).json({
    success: true,
    message: `OTP sent on mail to ${user.email}, please verify`,
  });
  //sendToken(res, user, "Registered Successfully", 201);
});

export const verifyEmailOtp = catchAsyncErrors(async (req, res, next) => {
  const otp = req.body.datab['otp'];
  const email = req.body.datab.email
  console.log(otp, email)
  if (!email || !otp)
    return next(new ErrorHandler("Please Enter All Fields", 400));
  console.log(otp, email)

  const user = await User.findOne({ email });
  if (user.userRegOtp == otp) {
    user.isEmailVerified = true;
    await user.save();
    sendToken(res, user, "Registered Successfully", 201);
  } else {
    await User.deleteOne({ email });
    res.status(200).json({
      success: true,
      message: `Incorrect OTP, Register Again`,
    });
  }
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please Enter All Fields", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Incorrect Email or Password", 409));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password", 409));

  sendToken(res, user, `Welcome back, ${user.name}`, 200);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

export const getMyProfile = catchAsyncErrors(async (req, res, next) => {
  let user;
  let isCached = false;
  const cacheResults = await redisClient.get(`${req.user.id}`);

  if (cacheResults) {
    isCached = true;
    user = JSON.parse(cacheResults);
  } else {
    user = await User.findById(req.user._id);
    await redisClient.set(`${req.user.id}`, JSON.stringify(user));
  }

  res.status(200).json({
    success: true,
    fromCache: isCached,
    user,
  });
});

export const deleteMyProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  //cancel Subscription:
  await user.remove();
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Profile Deleted ",
    });
});

export const changePassword = catchAsyncErrors(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("Please Enter All Fields", 400));

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) return next(new ErrorHandler("Incorrect Old Password", 400));
  user.password = newPassword;

  await user.save();

  // await logout();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id).select("+password");

  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
  });
});

export const updateProfilenew = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(formData.userId).select("+password")
  req.headers['user'] = user;

  if (formData.name) user.name = formData.name;
  if (formData.email) user.email = formData.email;

  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
    user: user
  });
});

export const updateProfilePicture = catchAsyncErrors(async (req, res, next) => {
  //upload file on cloudinary:
  const file = req.file;
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const user = await User.findById(req.user._id).select("+password");

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile Picture Updated Successfully",
  });
});
export const updateProfilePictureNew = catchAsyncErrors(async (req, res, next) => {
  //upload file on cloudinary:
  var userId = req.body.userid;
  console.log(userId)
  const file = req.file;
  const fileUri = getDataUri(file);
  //console.log(fileUri)
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const user = await User.findById(userId).select("+password");

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile Picture Updated Successfully",
  });
});

export const forgetPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandler("No Such User with this email", 400));

  const resetToken = await user.getResetToken();
  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  await user.save();

  const message = ` Click on the link to reset your password. <a><p>${url}</p></a> If not requested, please call: +91 6203478186`;
  //send token via email
  await sendEmail(user.email, "Course Bundler Reset Password", message);

  res.status(200).json({
    success: true,
    message: `Reset Token sent to ${user.email}`,
  });
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) return next(new ErrorHandler("Token is invalid or is expired"));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});

export const addToPlaylist = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.body.id);
  if (!course) return next(new ErrorHandler("invalid course id", 404));
  const itemExists = user.playlist.find((item) => {
    if (item.course.toString() === course._id.toString()) return true;
  });

  if (itemExists) return next(new ErrorHandler("Course already added", 409));
  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });

  await user.save();

  res.status(200).json({
    success: true,
    message: "Course added to playlist ",
  });
});

export const removeFromPlaylist = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const course = await Course.findById(req.query.id);
  if (!course) return next(new ErrorHandler("invalid course id", 404));

  const newPlaylist = user.playlist.filter((item) => {
    if (item.course.toString() !== course._id.toString()) return item;
  });

  user.playlist = newPlaylist;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Course removed playlist ",
  });
});

// Admin Controllers
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

export const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return next(
      new ErrorHandler(`User Not find with id: ${req.params.id}`, 404)
    );
  if (user.role === "user") user.role = "admin";
  else user.role = "user";

  await user.save();

  res.status(200).json({
    success: true,
    message: "Role Changed Successfully",
  });
});

export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return next(
      new ErrorHandler(`User Not find with id: ${req.params.id}`, 404)
    );
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  //TODO: cancel Subscription
  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted ",
  });
});

export const createNote = catchAsyncErrors(async (req, res, next) => {
  console.log("Entered createNote ")
  const user = await User.findById(req.body.datac.userid);
  console.log(req.body.datac);

  //create a course:
  const newNote = await GlobalNote.create({
    note_creator: user.name,
    note_creator_id: user._id,
    emailsAllowed: [`${req.body.datac.emailallowed}`],
    note_title: req.body.datac.note_title,
    note_description: req.body.datac.note_description,
  });
  res.status(200).json({
    success: true,
    message: "Note created ",
    data: newNote
  });

})

export const getAllNotes = catchAsyncErrors(async (req, res, next) => {
  const allNotes = await GlobalNote.find({});
  console.log(allNotes)
  res.status(200).json({
    success: true,
    message: "Notes fetched",
    data: allNotes
  });
})

export const getSingleNoteById = catchAsyncErrors(async (req, res, next) => {
  const noteId = req.params.noteid;
  const singleNote = await GlobalNote.findById(noteId)
  console.log(singleNote)
  res.status(200).json({
    success: true,
    message: "Note fetched",
    data: singleNote
  });
})

export const updateNotePermission = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.body.datac.userid);

  //update a Note:
  const note = await GlobalNote.findById(req.body.datac.noteid);
  if ((note.emailsAllowed).includes(`${req.body.datac.emailtoedit}`)) {
    const index = (note.emailsAllowed).indexOf(`${req.body.datac.emailtoedit}`); if (index > -1) {
      (note.emailsAllowed).splice(index, 1);
    }
  } else {
    note.emailsAllowed.push(req.body.datac.emailtoedit);
  }
  await note.save();
  res.status(200).json({
    success: true,
    message: "Email Modified Successfully ",
    data: note
  });

})
