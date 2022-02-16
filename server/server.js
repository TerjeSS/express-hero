import express from 'express';
import path from 'path';
import bodyparser from 'express';
import cookieparser from 'cookie-parser'
import {urlencoded} from "express";
import dotenv from 'dotenv'

dotenv.config();

const app = express();
app.use(bodyparser());
app.use(cookieparser(process.env.COOKIE_SECRET))
app.use(urlencoded({
    extended: false
}))


const users = [
    {
        username: 'admin',
        password: 'admin'
    },
    {
        username: 'terje',
        password: 'terje'
    }
];
//Custom middleware som kjører på hver eneste request.
app.use((req, res, next) => {
    const {username} = req.signedCookies
    req.user = users.find(u => u.username === username)
    next();
})

app.post("/login", (req, res, next) => {
    const {username, password} = req.body;

    const user = users.find(user => user.username === username);
	if (user && user.password === password) {
		res.cookie("username", username, {signed: true})
		res.redirect("/users")
	} else{
		res.sendStatus(401)
	}
}
)

app.get("/login", (req, res) => {
    if (!req.user) {
        res.sendStatus(401)
    } else {
        res.send("not ok");
    }
})

app.get("/users", ((req, res) => {
    if (!req.user) {
        res.sendStatus(401)
    } else {
        res.send(users.map(({username}) => ({username})));
    }
}))

app.use(express.static('../client/dist'));

app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
        res.sendFile(path.resolve('../client/dist/index.html'));
    } else {
        next();
    }
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Started on http://localhost:${server.address().port}`);
});
