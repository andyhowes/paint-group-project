require('dotenv').config();
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require('multer')
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "image-upload",
  },
});
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  console.log('in upload image router');
  const query = `SELECT * FROM photo_test WHERE user_id = $1`;
  const value = [req.user.id]
  pool.query(query, value)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR spawning projects', err);
      res.sendStatus(500)
    })
});

router.post('/', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.send(req.file.path);
  console.log(req.file.path);
});

router.post('/database', async (req, res) => {
  console.log('url to database POST:', req.body);
  let photos = req.body;
  try {
    const client = await pool.connect();
    await client.query('BEGIN');
    await Promise.all( // Allows for concurrent requests
      photos.map(async (photo) => {
        const queryString = `INSERT INTO photo_upload ( "photo_upload_path", "user_id" ) VALUES ( $1, $2 );`;
        const values = [photo, req.user.id];
        await client.query(queryString, values);
      })
    );
    await client.query('COMMIT');
    client.release();
    res.sendStatus(201);
  } catch (error) {
    console.log('ROLLBACK', error);
    await client.query('ROLLBACK');
    client.release();
    res.sendStatus(500);
  }
})//end database POST

router.get('/', (req, res) => {
  console.log('in upload image router');
  const query = `SELECT * FROM photo_test WHERE user_id = $1`;
  const value = [req.user.id]
  pool.query(query, value)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR spawning projects', err);
      res.sendStatus(500)
    })
});

router.post('/database2', (req, res) => {
  console.log('url to database POST:', req.body);
  const queryString = `INSERT INTO photo_test ( "photo_upload_path", "user_id" ) VALUES ( $1, $2 );`;
  const values = [req.body, req.user.id]
  
  pool.query(queryString, values)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Error in database POST route', err);
      res.sendStatus(500);
    });
})//end database POST

module.exports = router;