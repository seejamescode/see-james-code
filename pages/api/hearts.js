import { hearts, connectMongoose } from "../../lib/mongoose";

connectMongoose();

const Hearts = async (req, res) => {
  const { slug } = req.query;

  if (!slug) {
    res.status(400).json({ error: "No slug provided." });
    return;
  }

  const result = await hearts.findOne({ slug }).select("hearts").lean();

  res.status(200).json({ hearts: (result && result.hearts) || 0 });
};

export default Hearts;
