const Subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "No email provided." });
    return;
  }

  const response = await fetch("https://api.sendinblue.com/v3/contacts", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": process.env.SEND_IN_BLUE_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({ email }), // body data type must match "Content-Type" header
  });

  if (response.ok) {
    res.status(200).json({});
  } else {
    console.error(response.statusText);
    res.status(response.status).json({ error: response.statusText });
  }
};

export default Subscribe;
