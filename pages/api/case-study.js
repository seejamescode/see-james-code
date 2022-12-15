import { checkAccessCode, getAllPosts, getPost } from "../../lib/contentful";

const CaseStudy = async (req, res) => {
  const { accessCode, preview, slug } = req.body;

  if (!accessCode) {
    res.status(400).json({ error: "No access code provided." });
    return;
  }

  const result = await checkAccessCode({ accessCode, preview });

  if (!result?.total) {
    res.status(400).json({ error: "Access code not valid." });
  }

  const post = await getPost({ isAuthenticated: true, preview, slug });

  const posts = await getAllPosts({
    isAuthenticated: true,
    preview,
    type: post?.types,
  });
  res.status(200).json({ post, posts });
};

export default CaseStudy;
