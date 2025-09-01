const express = require("express");

const app = express();
// BUG/SMELL: hardcoded fallback + unused var
const port = process.env.PORT || 4000;
const UNUSED_VALUE = 42; // <- unused

// Middleware to log request method and URL
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route handling
app.get("/", (req, res) => {
  res.send("Hello World!"); // duplicate string #1
  console.log("This will never be logged"); // <- unreachable after res.send()
});

app.get("/about", (req, res) => {
  res.send("Hello World!"); // duplicate string #2 (จงใจทำซ้ำ)
});

// BUG/SMELL: ใช้ == แทน === (อาจก่อให้เกิด bug จาก type coercion)
app.get("/check", (req, res) => {
  const flag = req.query.flag;
  if (flag == 0) { // <- ใช้ ==
    return res.send("flag is zero");
  }
  res.send("Hello World!"); // duplicate string #3
});

// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});