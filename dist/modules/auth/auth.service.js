"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthService {
    constructor() { }
    signup = async (req, res) => {
        let { username, email, password } = req.body;
        console.log({ username, email, password });
        return res.status(201).json({ message: "Done", data: req.body });
    };
    login = (req, res) => {
        return res.json({ message: "Done", data: req.body });
    };
}
exports.default = new AuthService();
