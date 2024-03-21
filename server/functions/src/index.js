const createBlog = require("./blogs/create");
const updateBlog = require("./blogs/update");
const readBlog = require("./blogs/read");
const readABlog = require("./blogs/readById");
const deleteBlog = require("./blogs/delete");
module.exports = {
  createBlog,
  readBlog,
  readABlog,
  updateBlog,
  deleteBlog,
};
