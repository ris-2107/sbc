//import * as AWS from "aws-sdk";
import S3 from 'aws-sdk/clients/s3.js';
import * as util from "util";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

const s3Config = {
   accessKeyId: "AKIAUNZUINU76OKQ757A",
  secretAccessKey: "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",
};

//const s3 = new AWS.S3(s3Config);
const pushToS3 = () => {
  const s3 = new S3(s3Config);
  console.log(s3);
};
//bucket-for-node-logs
export async function s3Upload(filePath) {
  const s3 = new S3(s3Config);
  var filePath = "./systemLogs.txt";
  const readFile = util.promisify(fs.readFile);
  const fileData = await readFile(filePath);

  s3.upload(
    {
      Bucket: "bucket-for-node-logs", //bucket name to upload your file too
      Key: `LogFile upto ${new Date().getDate()}-${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}_${new Date().getHours()}-${new Date().getMinutes()}_${uuidv4()}`, //name of the file will be the last element in the array
      Body: fileData,
      acl: "private",
    },
    (err, data) => {
      if (err) {
        console.log("There was an error uploading your file: ", err);
      }
      console.log("Successfully uploaded file.", data);
    }
  );
}

export async function s3ListAndDelete() {
  var sz;
  const s3 = new S3(s3Config);
  var bucketParams = {
    Bucket: "bucket-for-node-logs",
  };
  s3.listObjects(bucketParams, async function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      var noOfRecordsToKeep = 5;
      var toDel = data.Contents?.length - 1 - noOfRecordsToKeep;
      for (var i = 0; i < toDel; i++) {
        console.log(data["Contents"][i]["Key"]);
        await s3.deleteObject(
          {
            Bucket: "bucket-for-node-logs",
            Key: `${data["Contents"][i]["Key"]}`,
          },
          (err, data) => {
            console.error(err);
            console.log(data);
          }
        );
      }
      return data.Contents;
    }
  });
}

export default pushToS3;
