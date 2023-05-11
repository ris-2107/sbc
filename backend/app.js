import cookieParser from "cookie-parser";
import cors from "cors";
import * as CronJobWrapper from "cron";
import { config } from "dotenv";
import express from "express";
import * as fs from "fs";
import ErrorMiddleWare from "./middlewares/Error.js";
import { s3ListAndDelete, s3Upload } from "./utils/pushToS3.js";
import bodyParser from 'body-parser';

var CronJob = CronJobWrapper.CronJob;

config({
  path: "./config/config.env",
});
const app = express();

const allowedOrigins = ["http://localhost:3000", "https://*", "http://*","*"];

const options = {
  credentials: true,
  origin: allowedOrigins,
};

var cJobUploadLogs = new CronJob(
  "* */2160 * * *",
  async function () {
    await s3Upload();
    //2160 min = 2 days
    console.log("You will see this message every 2 days");
  },
  null,
  true,
  "America/Los_Angeles"
);

var cJob2 = new CronJob(
  "* */2162 * * *",
  function () {
    fs.writeFile(
      "./systemLogs.txt",
      `[${dateTime}] INFO: Old Logs cleared at ${Date.now()} \n`,
      function (err) {
        if (err) {
          return console.log(err);
        }
      }
    );
    console.log("You will see this message every 2.001 Days");
  },
  null,
  true,
  "America/Los_Angeles"
);


// var cJob4 = new CronJob(
//   "* */1080 * * *",
//   async function () {
//     //await s3ListAndDelete();
//     console.log("You will see this message 18 hours ");
//   },
//   null,
//   true,
//   "America/Los_Angeles"
// );

var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + " " + time;

//using important middleWares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
//app.use(cors('*'));
app.use(cors(options));

//Importing User Routes:
import course from "./routes/CourseRoutes.js";
import user from "./routes/UserRoutes.js";
import payment from "./routes/paymentRoutes.js";

// Using routes into our app:
app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);

export default app;

app.use(ErrorMiddleWare);
