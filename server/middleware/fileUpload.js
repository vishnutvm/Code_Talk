/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import multer from 'multer';

// file uploader middleware

// in previous state the files stored in local, Now files are stored in server

const storage = multer.memoryStorage();
export const upload = multer({ storage });
