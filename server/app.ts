import express, { Application, Request, Response } from "express";
const bodyParser = require('body-parser');
const app: Application = express();
// add express.json middleware to get req.body
app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a GET route for "/"
app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Hello World");
});

export default app;