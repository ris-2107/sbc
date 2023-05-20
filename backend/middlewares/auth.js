import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncErrors } from "./CatchAsyncErrors.js";
import * as fs from "fs";
import * as redis from "redis";
let redisClient;


var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + " " + time;

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // if(req.headers.isverifiedui==true){req.user = user;}
  const { token } = req.cookies;
  console.log("reached here Auth")
  console.log(token)

  if (!token) {
    fs.appendFile(
      "./systemLogs.txt",
      `[${dateTime}] Error: The Token is missing \n`,
      function (err) {
        if (err) {
          return console.log(err);
        }
      }
    );
    return next(new ErrorHandler("Not Logged In", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  let user;
  let isCached = false;

  const cacheResults = await redisClient.get(`${decodedData._id}`);
  if (cacheResults) {
    isCached = true;
    user = JSON.parse(cacheResults);
    console.log("Chached result");
  } else {
    user = await User.findById(decodedData._id);
    await redisClient.set(`${decodedData._id}`, JSON.stringify(user));
    console.log("cache set result");
  }
  req.user = user;
  if (user.isEmailVerified == false) {
    fs.appendFile(
      "./systemLogs.txt",
      `[${dateTime}] Error: Email is not verified for userId: ${user._id}\n isCached: ${isCached}`,

      function (err) {
        if (err) {
          return console.log(err);
        }
      }
    );

    return next(new ErrorHandler("Not Logged In", 401));
  }

  fs.appendFile(
    "./systemLogs.txt",
    `[${dateTime}] INFO The Token is: ${token} \n loggedIn User Id :${decodedData._id}\n  isCached: ${isCached}`,
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );
  next();
});

export const authorizedAdmin = async (req, res, next) => {
  const { token } = req.cookies;
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  const userFetched = await User.findById(decodedData._id);
  req.user = userFetched;
  if (req.user.role !== "admin") {
    fs.appendFile(
      "./systemLogs.txt",
      `[${dateTime}] ERROR The User: ${req.user._id} is not an Admin and accessing admin route\n `,
      function (err) {
        if (err) {
          return console.log(err);
        }
      }
    );
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource`,
        403
      )
    );
  }

  fs.appendFile(
    "./systemLogs.txt",
    `[${dateTime}] INFO The Token is: ${token} \n loggedIn User Id :${decodedData._id}  `,
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );
  next();
};
