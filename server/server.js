const express = require('express');
const cors = require('cors');
const axios = require('axios');
const otpRoute = require('./routes/otp');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', otpRoute);

app.get('/api/games', async (req, res) => {
  try {
    const { platform = 'pc', 'sort-by': sortBy = 'popularity' } = req.query;
    const url = `https://www.freetogame.com/api/games?platform=${platform}&sort-by=${sortBy}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching games:', error.message);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

app.get('/api/game', async (req, res) => {
  try {
    const { id } = req.query;
    const response = await axios.get(`https://www.freetogame.com/api/game?id=${id}`);
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching game details:', err.message);
    res.status(500).json({ error: 'Failed to fetch game details' });
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get('https://www.freetogame.com/api/games');
    const games = response.data;

    const filtered = games.filter(game =>
      game.title.toLowerCase().includes(query.toLowerCase())
    );

    res.json(filtered);
  } catch (error) {
    console.error('Error searching games:', error.message);
    res.status(500).json({ error: 'Failed to search games' });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});