const multer = require('multer')
const fs = require('fs') //file system
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let file_destination = 'public/uploads'

    if (!fs.existsSync(file_destination)) {
      fs.mkdirSync(file_destination, { recursive: true })
    }

    cb(null, file_destination)
  },
  filename: function (req, file, cb) {
    let extname = path.extname(file.originalname)
    let filename = path.basename(file.originalname, extname)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,  filename + '-' + uniqueSuffix + extname)


  }
})

const upload = multer({
  storage: storage,
  limits: 2000000 //upto 2mb smmauplpad grna paiyo

})

module.exports = upload