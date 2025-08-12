const dotenv = require('dotenv').config();
const mime = require('mime-types'); // ← note: mime-types, not mime
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Ensure the OpenAI API key is set
if (!process.env.OPENAI_API_KEY) { 
  console.error("Error: OPENAI_API_KEY environment variable is not set.");
  process.exit(1);
}

const app = express();
const PORT = 3000;

// Ensure the upload directory exists
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Set storage location & file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = req.params.destination || ''; // category param
    const uploadPath = path.join(__dirname, 'uploads', dest);

    // Ensure directory exists
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage });

// Serve your static front-end
app.use(express.static(path.join(__dirname, 'public')));

// Handle uploads with category/destination
app.post('/upload/:destination', upload.array('images'), (req, res) => {
  console.log(`Files uploaded to category "${req.params.destination}":`, req.files);
  res.send(`Images saved successfully in ${req.params.destination}!`);
});

// Serve uploaded images
app.use('/uploads', express.static(uploadPath)); // serve files in /uploads

app.get('/api/images/:destination', (req, res) => {
  const dest = req.params.destination || ''; // category param
  const uploadPath = path.join(__dirname, 'uploads', dest);
  fs.readdir(uploadPath, (err, files) => {
    if (err) return res.status(500).json({ error: 'Error reading uploads' });
    res.json(files); // ["file1.jpg","file2.png",...]
  });
});

// helper: pick one random file from a category folder
function pickOne(category) {
  const folder = path.join(uploadPath, category);
  const files = fs.existsSync(folder) ? fs.readdirSync(folder).filter(f =>
    /\.(png|jpe?g|webp)$/i.test(f)
  ) : [];
  if (!files.length) return null;
  return { category, file: files[Math.floor(Math.random() * files.length)] };
}

// helper: build absolute URL for the browser & API (served by your static /uploads)
function publicUrl(req, category, file) {
  // I already do: app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
  return `${req.protocol}://${req.get("host")}/uploads/${encodeURIComponent(category)}/${encodeURIComponent(file)}`;
}

// helper: convert file to base64 (for vision model)
function toDataUrl(fp) {
  const b64 = fs.readFileSync(fp).toString('base64');
  const mt = mime.lookup(fp) || 'image/jpeg';
  return `data:${mt};base64,${b64}`;
}

async function analyzeItemsLocalFiles(localPaths) {
  const prompt = `
Return ONLY a JSON object. No markdown fences, no explanations.
For each image (top, bottom, shoes, accessories, outerwear), include:
- garmentType
- colorMain
- colorPalette (≤4)
- material
- styleWords (3–6)
- notablePatterns
`;

const content = [
  { type: "input_text", text: prompt },

  { type: "input_text", text: "top:" },
  { type: "input_image", image_url: toDataUrl(localPaths.top) },

  { type: "input_text", text: "bottom:" },
  { type: "input_image", image_url: toDataUrl(localPaths.bottom) },

  { type: "input_text", text: "shoes:" },
  { type: "input_image", image_url: toDataUrl(localPaths.shoes) },

  { type: "input_text", text: "accessories:" },
  { type: "input_image", image_url: toDataUrl(localPaths.accessories) },

  { type: "input_text", text: "outerwear:" },
  { type: "input_image", image_url: toDataUrl(localPaths.outerwear) },
  ];

  const res = await openai.responses.create({
    model: "gpt-4o",
    input: [{ role: "user", content }],
    text: { format: { type: "json_object" } } 
  });

  const text = res.output_text?.trim();
  if (!text) throw new Error("Empty JSON from model");

  let attributes;
  try {
    attributes = JSON.parse(text);
  } catch (e) {
    console.error("Raw model output:", text);
    throw new Error("Model did not return valid JSON");
  }
  return attributes;
}

async function generateOutfitImage(attributes) {
  // Build a high-signal prompt from the analyzed attributes
  const desc = (k) => {
    const a = attributes[k];
    if (!a) return "";
    return `${k}: ${a.garmentType || k}, colors ${a.colorPalette?.join(", ") || a.colorMain || ""}, material ${a.material || ""}, style ${a.styleWords?.join(", ") || ""}, patterns ${a.notablePatterns || "none"}.`;
  };

  const outfitPrompt = `
Photorealistic outfit mockup on a clean studio background.
Include these pieces styled together cohesively:
${desc("top")}
${desc("bottom")}
${desc("outerwear")}
${desc("shoes")}
${desc("accessories")}
Ensure realistic proportions, consistent lighting, and true-to-color rendering.
Avoid logos or brand marks. Camera: mid-shot, straight-on, soft shadows.
`;

  const image = await openai.images.generate({
    model: "gpt-image-1",
    prompt: outfitPrompt,
    size: "1024x1024"
  }); // returns base64 data by default

    // Save to disk and return a URL
    const b64 = image.data[0].b64_json;
    const buf = Buffer.from(b64, "base64");
    const outDir = path.join(__dirname, "generated");
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const filename = `outfit-${Date.now()}.png`;
    const outPath = path.join(outDir, filename);
    fs.writeFileSync(outPath, buf);
    return `/generated/${filename}`;
}

// make generated images web-accessible
app.use("/generated", express.static(path.join(__dirname, "generated")));

// main endpoint: pick items → analyze → generate → return URL
app.get("/api/outfit/generate", async (req, res) => {
  try {
    const picks = ["tops","bottoms","shoes","accessories","outerwear"]
      .map(pickOne)
      .reduce((acc, v) => (v ? (acc[v.category] = v.file, acc) : acc), {});

    // verify all categories found
    for (const c of ["tops","bottoms","shoes","accessories","outerwear"]) {
      if (!picks[c]) return res.status(400).json({ error: `No images in /uploads/${c}` });
    }

    const publicUrls = {
      top:         publicUrl(req, "tops", picks.tops),
      bottom:      publicUrl(req, "bottoms", picks.bottoms),
      shoes:       publicUrl(req, "shoes", picks.shoes),
      accessories: publicUrl(req, "accessories", picks.accessories),
      outerwear:   publicUrl(req, "outerwear", picks.outerwear),
    };
    
    const localPaths = {
      top:       path.join(uploadPath, "tops", picks.tops),
      bottom:    path.join(uploadPath, "bottoms", picks.bottoms),
      shoes:     path.join(uploadPath, "shoes", picks.shoes),
      accessories:path.join(uploadPath, "accessories", picks.accessories),
      outerwear: path.join(uploadPath, "outerwear", picks.outerwear),
    };

    const attributes = await analyzeItemsLocalFiles(localPaths);
    const imageUrl = await generateOutfitImage(attributes); // Images API → final PNG
    res.json({ imageUrl, attributes, sourceUrls: publicUrls });
  } catch (e) {
    console.error('Generate outfit failed:', e?.response?.data || e?.message || e);
    res.status(500).json({ error: "Failed to generate outfit" });
  }
});

// History endpoint: get all previously generated outfits
const generatedRoot = path.join(__dirname, 'generated');
fs.mkdirSync(generatedRoot, { recursive: true }); // ensure it exists
app.use('/generated', express.static(generatedRoot));

// List previously generated images (newest first)
app.get('/api/generated', async (req, res) => {
  try {
    const files = (await fs.promises.readdir(generatedRoot))
      .filter(f => /\.(png|jpe?g|webp)$/i.test(f));

    // sort by mtime desc
    const withStats = await Promise.all(
      files.map(async (f) => {
        const stat = await fs.promises.stat(path.join(generatedRoot, f));
        return { filename: f, mtime: stat.mtimeMs };
      })
    );
    withStats.sort((a, b) => b.mtime - a.mtime);

    // return URLs the browser can load
    const items = withStats.map(({ filename }) => ({
      filename,
      url: `/generated/${encodeURIComponent(filename)}`
    }));

    res.json(items);
  } catch (e) {
    console.error('Failed to list generated images:', e);
    res.status(500).json({ error: 'Could not list generated images' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
