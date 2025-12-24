const { readFilesFromSiblingDirectory } = require("./utils.cjs");

const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Read JSON file
app.get("/api/json", async (req, res) => {
  try {
    const data = await fs.readFile(
      await readFilesFromSiblingDirectory("data", "sam.json"),
      "utf-8"
    );
    console.log("read the json");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update JSON file
app.put("/api/json", async (req, res) => {
  try {
    const currentDir = __dirname;
    const mockDataPath = path.join(currentDir, "mock/data.json");

    await fs.writeFile(mockDataPath, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
