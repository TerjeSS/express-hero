import express, { response } from "express";
import path from "path";
import bodyparser from "body-parser";
import cookieparser from "cookie-parser";
import { urlencoded } from "express";
import dotenv from "dotenv";
import { isCorrectAnswer, Questions, randomQuestion } from "./questions.js";

dotenv.config();

const app = express();
app.use(bodyparser.json());
app.use(cookieparser(process.env.COOKIE_SECRET));
app.use(
  urlencoded({
    extended: false,
  })
);

const users = [
  {
    username: "admin",
    password: "admin",
  },
  {
    username: "terje",
    password: "terje",
  },
];

//Destruct  a question to only return the question and answers, but without the "correct_answers".
app.get("/api/quiz/random", (req, res) => {
  const { question, answers, id } = randomQuestion();
  res.json({ question, answers, id });
});
app.post("/api/quiz/answer", (req, res) => {
  const { id, a } = req.body;
  const question = Questions.find((q) => q.id === id);
  if (isCorrectAnswer(question, a)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

//Custom middleware som kjører på hver eneste request.
app.use((req, res, next) => {
  const { username } = req.signedCookies;
  req.user = users.find((u) => u.username === username);
  next();
});

app.get("/api/login", (req, res) => {
  const { username } = req.signedCookies;
  if (username) {
    res.json(username);
  } else {
    res.sendStatus(401);
  }
});

//Setter cookie ved suksesfull login, sletter cookie
app.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);
  if (user && user.password === password) {
    res.cookie("username", username, { signed: true });
    res.redirect("/");
  } else {
    res.clearCookie("username");
    res.sendStatus(401);
  }
});

//Bruke statiske filer
app.use(express.static("../client/dist"));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
});
