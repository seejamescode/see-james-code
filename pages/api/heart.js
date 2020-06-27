import { hearts, connectMongoose } from "../../lib/mongoose";

connectMongoose();

const Heart = async (req, res) => {
  const { count, slug } = req.body;

  if (!slug) {
    res.status(400).json({ error: "No slug provided." });
    return;
  }

  if (!count || count < 1) {
    res.status(400).json({ error: "No count provided." });
    return;
  }

  if (count > 10) {
    res.status(400).json({
      error: "Count too high. Somebody is trying to manipulate my stats!",
    });
    return;
  }

  const result = await hearts.findOne({ slug }).select("_id").lean();

  if (result) {
    await hearts.findOneAndUpdate(
      { _id: result._id },
      { $inc: { hearts: count }, updated: Date.now() }
    );
  } else {
    const newHeart = new hearts({
      hearts: count,
      slug,
    });
    await newHeart.save();
  }
  res.status(200).json({});
};

export default Heart;
