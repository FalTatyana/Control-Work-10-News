import express from "express";
import cors from "cors";
import postsRouter from "./routers/posts.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', postsRouter);

const port = 8000;


app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
