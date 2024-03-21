const functions = require("firebase-functions");
const admin = require("firebase-admin");

const {
  createBlog,
  readBlog,
  readABlog,
  updateBlog,
  deleteBlog,
} = require("./src");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export blog CRUD functions
exports.createBlog = createBlog;
exports.readBlog = readBlog;
exports.readABlog = readABlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
