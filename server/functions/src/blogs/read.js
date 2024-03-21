const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

exports.readBlog = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      let blogs = [];

      const snapshot = await admin
        .firestore()
        .collection("blogs")
        .orderBy("timestamp", "desc")
        .get();
      snapshot.forEach((doc) => {
        blogs.push(doc.data());
      });

      if (blogs.length > 0) {
        return res.status(200).json(blogs);
      } else {
        return res.status(404).json({ message: "No data found", data: [] });
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).send("Error on reading  blog.");
    }
  });
});
