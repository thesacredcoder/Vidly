const express = require("express");
const Joi = require("joi");
const router = express.Router();

const genres = [
  { id: 1, name: "romance" },
  { id: 2, name: "action" },
  { id: 3, name: "thriller" },
  { id: 4, name: "biography" },
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Course not found");
  res.send(genre);
});

router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genres);
});

router.put("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Course not found");

  //Validate
  const { error } = validateGenre(req.body); // this is result.error but destructured

  if (error) {
    // 400 Bad Request
    res.status(400).send(error.details[0].message);
    return;
  }

  genre.name = req.body.name;
  res.send(genres);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("genre not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

function validateGenre(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

module.exports = router;
