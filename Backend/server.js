require('dotenv').config();
const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');  // Import Axios
const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY

app.post('/completions', async (req, res) => {
  const options = {
    method: 'POST',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    data: {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: req.body.message }],
      max_tokens: 100,
    }
  };

  try {
    const response = await axios(options);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

app.listen(PORT, () => console.log('Server is running on ' + PORT));
