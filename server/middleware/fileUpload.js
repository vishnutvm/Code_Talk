/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
// file storage
import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/assets');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
    // cb(null, req.body.username + path.extname(file.originalname));
  },
});
export const upload = multer({ storage });
