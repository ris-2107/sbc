import * as fs from "fs";
export const catchAsyncErrors = (passedFunction) => (req, res, next) => {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  fs.appendFile(
    "./systemLogs.txt",
    `[${dateTime}] INFO CatchAsyncErrors :No Error \n`,
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );

  Promise.resolve(passedFunction(req, res, next)).catch(next);
};
