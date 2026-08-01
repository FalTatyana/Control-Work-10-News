import express from "express";
import { Message } from "../types";
import { promises as fs } from "fs";

const messagesRouter = express.Router();

const path = "./messages";
let data: Message[] = [];

const run = async () => {
  const files = await fs.readdir(path);
  const messages = await Promise.all(
    files.map(async (file) => {
      const fileContents = await fs.readFile(path + "/" + file);
      return JSON.parse(fileContents.toString());
    })
  );
  data = messages;
};

run().catch(console.error);

messagesRouter.get(`/messages`, async (req, res) => {
  const queryDate = req.query.datetime as string;

  if (!queryDate) {
    return res.send(data.slice(-30));
  }

  const date = new Date(queryDate);

  if (isNaN(date.getTime())) {
    return res.status(400).send({
      error: "Invalid datetime",
    });
  }

  const filtered = data.filter(
    (message) => new Date(message.datetime) > date
  );

  return res.send(filtered);
});

messagesRouter.post("/messages", async (req, res) => {
  if (!req.body.message.trim() || !req.body.author.trim()) {
    return res
      .status(400)
      .send({ error: "Author and message must be present in the request" });
  }

  const newMessage = {
    message: req.body.message,
    author: req.body.author,
    id: crypto.randomUUID(),
    datetime: new Date().toISOString(),
  };
  
  const fileName = `./messages/${newMessage.id}.txt`;
  try {
    await fs.writeFile(fileName, JSON.stringify(newMessage));
  } catch (e) {
    console.error(e);
  }
  data.push(newMessage);
  res.send(newMessage);
});

export default messagesRouter;
