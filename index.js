const express = require("express");
const genres = require("./routes/genres");
const home = require("./routes/home");

const app = express();

app.use(express.json());
app.use("/", home);
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The app is running on port ${port}`);
});
