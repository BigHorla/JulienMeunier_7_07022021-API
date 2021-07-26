/* Multer is a node.js middleware for handling multipart/form-data, 
which is primarily used for uploading files. 
In this case for articles pictures*/

const multer = require('multer');
const path = require('path');

//expected MIME type :

const storage = multer.diskStorage({

  destination: (req, file, callback) => {
    callback(null, './img');
    console.log(req);
  },

  filename: (req, file, callback) => {
    console.log(file);
    callback(null, "art_"+ Date.now() + path.extname(file.originalname))
  }

})



const uploadArticlePic = multer({storage: storage});
module.exports = uploadArticlePic;