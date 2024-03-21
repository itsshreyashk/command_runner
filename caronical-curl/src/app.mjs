import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { exec } from 'child_process';


dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;
app.use(cors({
    origin : "*"
}))
app.use(express.json());

app.post('/run/command', async (req, res, next) => {
    const body = req.body;
    const command = body.command;
    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(`exec error: ${err}`);
            return;
        }
        try {
            res.send(stdout);
        } catch (err) {
            res.send("OOPS! Got an error")
        }
    });
});

app.get('/health', (req, res)=> {
    res.send("OK")
})
server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});