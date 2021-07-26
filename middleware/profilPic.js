/* Multer is a node.js middleware for handling multipart/form-data, 
which is primarily used for uploading files. 
In this case for users pictures*/

const multer = require('multer');
const path = require('path');

//expected MIME type :

const storage = multer.diskStorage({

  destination: (req, file, callback) => {
    callback(null, './img')
  },

  filename: (req, file, callback) => {
    console.log(file);
    callback(null, req.params.id +"_"+ Date.now() + path.extname(file.originalname))
  }

})

const uploadProfilPic = multer({storage: storage});
module.exports = uploadProfilPic;
