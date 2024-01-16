const express = require('express');
const crypto = require('node:crypto');
const cors = require('cors');

const arts = require('./arts.json');
const { validateArt, validatePartialArt } = require('./schemas/arts');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'http://localhost:1234',
        'http://arts.com',
      ];

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
  })
);
app.disable('x-powered-by');

app.get('/arts', (req, res) => {
  const { categories } = req.query;
  if (categories) {
    const filteredArts = arts.filter(art =>
      art.categories.some(
        cate => cate.toLowerCase() === categories.toLowerCase()
      )
    );
    return res.json(filteredArts);
  }
  res.json(arts);
});

app.get('/arts/:id', (req, res) => {
  const { id } = req.params;
  const art = arts.find(art => art.id === id);

  if (art) return res.json(art);

  req.status(404).json({ message: 'Art not Found' });
}); // path-to-regexp

app.post('/arts', (req, res) => {
  const result = validateArt(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  // depois na base de dados...
  const newArt = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  // depois ajustar
  arts.push(newArt);

  res.status(201).json(newArt);
});

app.delete('/arts/:id', (req, res) => {
  const { id } = req.params;
  const artIndex = arts.findIndex(art => art.id === id);

  if (artIndex === -1) {
    return res.status(404).json({ message: 'Movie not Found' });
  }

  arts.splice(artIndex, 1);

  return res.json({ message: 'Movie deleted' });
});

app.patch('/arts/:id', (req, res) => {
  const result = validatePartialArt(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const artIndex = arts.findIndex(art => art.id === id);

  if (artIndex === -1)
    return res.status(404).json({ message: 'Art Not Found' });

  const updateArt = {
    ...arts[artIndex],
    ...result.data,
  };

  arts[artIndex] = updateArt;

  return res.json(updateArt);
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
