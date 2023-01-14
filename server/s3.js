// /* eslint-disable import/prefer-default-export */
// /* eslint-disable import/no-import-module-exports */
// // eslint-disable-next-line import/extensions
// // import S3 from 'aws-sdk/clients/s3.js';
// import aws from 'aws-sdk';
// import fs from 'fs';
// import dotenv from 'dotenv';
// import crypto from 'crypto';
// import { promisify } from 'util';
// import { S3Client } from '@aws-sdk/client-s3';

// const randomBytes = promisify(crypto.randomBytes);

// dotenv.config();

// const bucketName = process.env.AWS_BUCKET_NAME;
// const region = process.env.AWS_BUCKET_REGION;
// const accessKeyId = process.env.AWS_ACCESS_KEY;
// const secretAccesskey = process.env.AWS_SECRET_KEY;

// const s3 = new S3Client({
//   region,
//   accessKeyId,
//   secretAccesskey,
//   signatureVersion: 'v4',
// });

// export async function generateUploadURL() {
//   const rawBytes = await randomBytes(16);
//   const imageName = rawBytes.toString('hex');

//   const params = {
//     Bucket: bucketName,
//     Key: imageName,
//     Expires: 60,
//   };

//   const uploadURL = await s3.getSignedUrlPromise('putObject', params);
//   return uploadURL;
// }
