// /* eslint-disable import/no-import-module-exports */
// // eslint-disable-next-line import/extensions
// // import S3 from 'aws-sdk/clients/s3.js';
// import AWS from 'aws-sdk';
// import fs from 'fs';
// import dotenv from 'dotenv';

// const S3bucket = AWS.S3();

// dotenv.config();
// const bucketName = process.env.AWS_BUCKET_NAME;
// const region = process.env.AWS_BUCKET_REGION;
// const accessKeyId = process.env.AWS_ACCESS_KEY;
// const secretAccesskey = process.env.AWS_SECRET_KEY;

// const s3 = new S3bucket({
//   bucketName,
//   region,
//   accessKeyId,
//   secretAccesskey,
// });

// // eslint-disable-next-line import/prefer-default-export
// export function uploadFile(file) {
//   const fileStream = fs.createReadStream(file.path);

//   const uploadParams = {
//     Bucket: bucketName,
//     Body: fileStream,
//     Key: file.filename,
//   };

//   return s3.upload(uploadParams).promise();
// }
