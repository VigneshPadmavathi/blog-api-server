const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

exports.readABlog = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { id } = req.query;
    if (!id) {
      return res
        .status(500)
        .json({ id: undefined, msg: "Id parameter is missing" });
    }

    try {
      const blogDoc = await admin.firestore().collection("blogs").doc(id).get();

      if (blogDoc.exists) {
        return res.status(200).json(blogDoc.data());
      } else {
        return res.status(404).json({ id, msg: "Blog Not Found" });
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).send("Error on reading  blog.");
    }
  });
});
