"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
function getFileContent(file_path) {
    const contents = fs_1.default.readFileSync(file_path, 'utf-8');
    return contents;
}
function getFilePath(file_name) {
    const file_path = path_1.default.join('static', file_name);
    return file_path;
}
app.use('/public', express_1.default.static(path_1.default.join('public')));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*"
}));
app.get('/', (req, res) => {
    try {
        const file_path = getFilePath("index.html");
        res.send(getFileContent(file_path));
    }
    catch (err) {
        res.send(`Error : ${err}`);
    }
});
server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
