const express = require('express');
const { CompileFile } = require('ve-compiler');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

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