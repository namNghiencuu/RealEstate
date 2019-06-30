var multer = require("multer");
var randomString = require("randomstring");

module.exports = {
  uploadFile: type => {
    var placeStore = `${type}`;
    let storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "src/app/public/upload/" + placeStore);
      },
      filename: (req, file, cb) => {
        let fileName = file.originalname.split(".");
        let newFileName = `${randomString.generate(
          10
        )}-${new Date().getTime()}`;
        console.log(newFileName);
        cb(null, `${newFileName}.${fileName[fileName.length - 1]}`);
      }
    });
    return multer({ storage: storage });
  },
  getLink: file => {
    const length = file.filename.split(".");
    const fileId = file.filename.split(".")[0];
    const endFile = file.filename.split(".")[length.length - 1];
    // Remove public in destination and add filename in the link
    let fileLink =
      file.destination.substring(14, file.destination.length) +
      "/" +
      file.filename;
    return fileLink;
  },
  getLinkMany: files => {
    var fileLink = [];
    files.map((file, index) => {
      const length = file.filename.split(".");
      const fileId = file.filename.split(".")[0];
      const endFile = file.filename.split(".")[length.length - 1];
      // Remove public in destination and add filename in the link
      fileLink.push(
        file.destination.substring(14, file.destination.length) +
          "/" +
          file.filename
      );
    });
    return fileLink;
  }
};
