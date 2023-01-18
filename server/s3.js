/* eslint-disable no-async-promise-executor */
/* eslint-disable import/extensions */

import AWS from 'aws-sdk';

import dotenv from 'dotenv';
import crypto from 'crypto';
import path from 'path';

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
AWS.config.update({
  secretAccessKey,
  accessKeyId: accessKey,
  region: bucketRegion,
  signatureVersion: 'v4', // API version
});

// Creating an S3 instance
const s3 = new AWS.S3({ signatureVersion: 'v4' });


// uploading file to s3,return file location
function uploadS3(file) {
  return new Promise(async (res, rej) => {
    const fileType = path.extname(file.originalname);

    const fileName = crypto.randomBytes(16).toString('hex') + fileType;
    console.log(fileName);
    console.log(file);
    console.log('debug');
    const params = {
      Bucket: bucketName,
      Body: file.buffer,
      Key: file.originalname,
    };

    const s3UploadPromise = s3.upload(params).promise();
    s3UploadPromise
      .then((data) => {
        console.log('File uploaded successfully at ', data.Location);
        res(data);
        // return data;
      })
      .catch((err) => {
        console.log('Error uploading file: ', err);
        rej(err);
      });
  });
}

export default uploadS3;
