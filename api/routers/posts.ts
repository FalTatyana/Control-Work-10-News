import express from "express";
import { Post } from "../types";
import { promises as fs } from "fs";
import path from "path";

const postsRouter = express.Router();

const dbPath = path.resolve(process.cwd(), "bd.json");
let data: Post[] = [];

const run = async () => {
  const fileContents = await fs.readFile(dbPath, "utf-8");
  const parsedData = JSON.parse(fileContents);
  if (!Array.isArray(parsedData)) {
    throw new Error("not array");
  }
  data = parsedData as Post[];
};

run().catch(console.error);

postsRouter.get(`/`, async (req, res) => {
  const queryDate = req.query.datetime as string;

  if (!queryDate) {
    return res.send(data);
  }

  const date = new Date(queryDate);

  if (isNaN(date.getTime())) {
    return res.status(400).send({
      error: "Invalid datetime",
    });
  }

  const filtered = data.filter((post) => {
    const postDate = new Date(post.datetime);

    return postDate;
  });
  return res.send(filtered);
});

postsRouter.post("/", async (req, res) => {
  if (!req.body.message.trim() || !req.body.title.trim()) {
    return res
      .status(400)
      .send({ error: "All data must be present" });
  }

  const newPost: Post = {
    title: req.body.title,
    message: req.body.message,
    id: crypto.randomUUID(),
    datetime: new Date().toISOString(),
  };

  const updatedData = [...data, newPost];
  try {
    await fs.writeFile(dbPath, JSON.stringify(updatedData));
    data = updatedData;
    return res.status(201).send(newPost);
  } catch (e) {
    console.error(e);
  }
  data.push(newPost);
  res.send(newPost);
});

postsRouter.delete(`/:id`, async (req, res) => {
  const {id} = req.params;

  const postToDelete = data.some((post) => post.id === id);

  if (!postToDelete) {
    return res.status(404).send({
      error: "Post not found",
    });
  }

  const updatedData = data.filter((post) => post.id !== id);

  try {
    await fs.writeFile(
      dbPath,
      JSON.stringify(updatedData),
    );

    data = updatedData;

    return res.send({
      message: "Post deleted",
      id,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).send({
      error: "Error",
    });
  }

});

export default postsRouter;
