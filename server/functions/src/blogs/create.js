const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors")({ origin: true });
const { FieldValue } = require("firebase-admin/firestore");

exports.createBlog = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      // Your create blog logic here
      const { title, content, cover_image, description } = req.body;
      const id = uuidv4();
      const timestamp = FieldValue.serverTimestamp();
      const blogRef = admin.firestore().collection("blogs");

      const newBlog = {
        id,
        title,
        content,
        description,
        cover_image,
        timestamp,
      };

      await blogRef.doc(id).set(newBlog);

      res.status(200).send(newBlog);
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).send("Error creating blog.");
    }
  });
});
