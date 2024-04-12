const express = require('express');
const { CompileFile } = require('ve-compiler');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Endpoint to check the health/status of the server
app.get('/health', (req, res) => {
  res.status(200).send('Server is up and running');
});

app.post('/compile', async (req, res) => {
  const { code, language } = req.body;

  try {
    const output = await CompileFile(language, code);
    const stdout = output.stdout || '';
    res.json({ message: stdout });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
