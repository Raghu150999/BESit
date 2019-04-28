const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routers = require('./server/routes');
const cors = require('cors');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const Product = require('./server/models/productSchema');

const app = express();

// environment letiables for jwt token
require('dotenv').config();

mongoose.Promise = global.Promise;

const mongodb_uri = process.env.NODE_ENV ? process.env.MONGODB_URI : "mongodb://localhost/mydb";

mongoose.connect(mongodb_uri, { useNewUrlParser: true })
    .catch(err => console.error(err));

// Setup mongodb connection for image storage
const conn = mongoose.connection;

let gfs;

conn.once('open', () => {
  // Init Stream
  gfs = Grid(conn.db, mongoose.mongo);
  // Specifying name of the collection
  gfs.collection('uploads');
});


// Middleware Setup
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routers);

// Custom middleware to handle errors
app.use((err, req, res, next) => {
  console.log('Error:', err.message);
  res.status(422).json(err.message);
});

const port = process.env.NODE_ENV ? process.env.PORT : 8000;

// Create Storage Engine
const storage = new GridFsStorage({
  url: mongodb_uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads' // this name should match the collection name
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

// Route for image upload(s)
app.post('/uploaditem', upload.array('files'), (req, res) => {
  const imageIsAvailable = req.files.length > 0;
  const fileNames = [];
  if (imageIsAvailable) {
    const len = req.files.length;
    for (let i = 0; i < len; i++) {
      fileNames.push(req.files[i].filename);
    }
  }
  const product = new Product({
    ...req.body,
    imageIsAvailable,
    fileNames
  });
  product.save().then(() => {
    res.send('ok');
  });
});

// Route for getting image
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file exists
    if (!file) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    //Check if an image 
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/jpg' || file.contentType) {
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

// @route: for removing item from database
app.post('/removeitem', (req, res) => {
  const item = req.body;
  for (let i = 0; i < item.fileNames.length; i++) {
    gfs.remove({ 
      filename: item.fileNames[i], 
      root: 'uploads' // Important to specify collection name (Not given in docs)
    }, function (err, gridStore) {
      if (err) throw err;
    });
  }
  Product.deleteOne({ _id: item._id }).then((result) => {
    res.send('item deleted');
  });
});

app.listen(process.env.PORT || 8000);
console.log(`Listening to port ${port}`);