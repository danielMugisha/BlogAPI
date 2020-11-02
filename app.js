const express = require("express");
const Post = require("./api/models/posts");
const app = express();
const postsData = new Post();
let multer = require("multer");
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
  },
});

const getExt = (mimeType) => {
  switch (mimeType) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
    default:
      return ".jpg";
  }
};
let upload = multer({ storage: storage });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/uploads", express.static("uploads"));
app.use(express.json());

app.get("/api/posts", (req, res) => {
  res.status(200).send(postsData.get());
});

app.get("/api/posts/:post_id", (req, res) => {
  const postId = req.params.post_id;
  const foundPost = postsData.getIndividualBlog(postId);
  if (foundPost) {
    res.status(200).send(foundPost);
  } else {
    res.status(404).send("NOT FOUND");
  }
});

app.post("/api/posts/", upload.single("post-image"), (req, res) => {
  let updatedPath = `uploads/${req.file.filename}`;
  const newPost = {
    id: `${Date.now()}`,
    title: req.body.title,
    content: req.body.content,
    post_image: updatedPath,
    added_date: `${Date.now()}`,
  };
  postsData.add(newPost);
  res.status(201).send(newPost);
});

app.listen(3000, () => console.log("Listening on port http://localhost:3000"));
