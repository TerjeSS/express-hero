import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  HashRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import Signin from "./Signin";

const Homepage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  useEffect(async () => {
    const res = await fetch("/api/login");
    setUser(await res.json());
    console.log(user);
    if (user) {
      setLoggedIn(!loggedIn);
    }
  }, []);
  if (loggedIn) {
    return <QuizApp user={user} />;
  }
  return <Link to={"/signin"}>Log in</Link>;
};

function QuizApp({ user }) {
  const [randomQuestion, setRandomQuestion] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(async () => {
    const res = await fetch("/api/quiz/random");
    setRandomQuestion(await res.json());
    setIsLoading(!isLoading);
  }, []);

  const handleAnswer = async (a) => {
    const { id } = randomQuestion;
    const res = await fetch("/api/quiz/answer", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        a,
      }),
    });
    if (res.ok) {
      setScore(score + 1);
    }
  };
  return (
    <>
      <h1>Welcome to the quiz.</h1>
      <h2>Your score is: {score} correct answers </h2>
      {isLoading ? (
        <div>
          <h3>{randomQuestion.question}</h3>
          {Object.keys(randomQuestion.answers)
            .filter((a) => randomQuestion.answers[a])
            .map((a) => {
              return (
                <div key={a}>
                  {randomQuestion.answers[a]}
                  <button onClick={() => handleAnswer(a)}>Answer</button>
                </div>
              );
            })}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<QuizApp />} />
        <Route path={"/signin"} element={<Signin />} />
        <Route path={"/*"} element={<h2>Not found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
