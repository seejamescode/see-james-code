async function socialImageRedirect(req, res) {
  const { url } = req.query;

  const redirectUrl = decodeURIComponent(url);
  res.redirect(redirectUrl);
}

export default socialImageRedirect;
