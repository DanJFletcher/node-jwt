import bodyParser from 'body-parser';
import express from 'express';
import user from './models/user';
import db from './db';

export const app = express();
const PORT = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    // TODO: show is logged in or not
    .get("/", (req, res, next) => {
        res.send("<h1>Home</h1>");
    })
    .get("/users", (req, res, next) => {
        db("users").then(users => {
            res.send(users);
        }, next);
    })
    .get("/users/:id", (req, res, next) => {
        const { id } = req.params;
        db("users")
            .where("id", id)
            .then(users => {
                if (!users) {
                    return res.send(400);
                }
                res.send(users);
            }, next);
    })
    .post("/users", (req, res, next) => {
        // TODO: validate input
        db("users")
            .insert(req.body)
            .then(userIds => {
                res.send(userIds);
            }, next);
    })
    .put("/users/:id", (req, res, next) => {
        const { id } = req.params;
        db("users")
            .where("id", id)
            .update(req.body)
            .then(result => {
                if (result === 0) {
                    return res.send(400);
                }
                res.send(200);
            }, next)
    })
    .delete("/users/:id", (req, res, next) => {
        db("users")
            .where("id", id)
            .delete()
            .then(result => {
                if (result === 0) {
                    return res.send(400);
                }
                res.send(200);
            }, next);
    })

    // Listen for requests
    .listen(PORT || '3000');

console.log(`Minds are blown on port: ${PORT}`);
