const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const { FieldValue } = require("firebase-admin/firestore");

exports.updateBlog = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      // Your create blog logic here

      const { id } = req.query;

      if (!id) {
        return res
          .status(500)
          .json({ id: undefined, msg: "Id parameter is missing" });
      }

      const updatedAt = FieldValue.serverTimestamp();
      const blogDoc = await admin.firestore().collection("blogs").doc(id).get();

      if (blogDoc.exists) {
        await admin
          .firestore()
          .collection("blogs")
          .doc(id)
          .update({ updatedAt, ...req.body })
          .then(async () => {
            const updated = await admin
              .firestore()
              .collection("blogs")
              .doc(id)
              .get();
            if (updated.exists) {
              return res.status(200).json(updated.data());
            }
          });
      } else {
        return res.status(404).json({ id, msg: "Blog Not Found" });
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).send("Error on updating blog : ", error);
    }
  });
});
