import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/bookModel.js";

const app = express();

// middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN");
});

// Route to Save a new Book
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
