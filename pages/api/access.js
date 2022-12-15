import { checkAccessCode } from "../../lib/contentful";
import { hearts, connectMongoose } from "../../lib/mongoose";

connectMongoose();

const Access = async (req, res) => {
  const { accessCode, preview } = req.body;

  if (!accessCode) {
    res.status(400).json({ error: "No access code provided." });
    return;
  }

  const result = await checkAccessCode({ accessCode, preview });
  res.status(200).json({ isValidated: !!result?.total });
};

export default Access;
