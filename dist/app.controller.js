"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: (0, path_1.resolve)("./config/.env.development") });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = require("express-rate-limit");
const auth_controller_1 = __importDefault(require("./modules/auth/auth.controller"));
const error_response_1 = require("./utils/response/error.response");
const Limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 60000,
    limit: 2000,
    message: { error: "too many request please try again later" },
    statusCode: 429,
});
const bootstrap = () => {
    const app = (0, express_1.default)();
    const port = process.env.PORT || 5000;
    app.use((0, cors_1.default)(), express_1.default.json(), (0, helmet_1.default)(), Limiter);
    app.get("/", (req, res) => {
        res.json({ message: `Welcome to ${process.env.APPLICATION_NAME} Backend` });
    });
    app.use("/auth", auth_controller_1.default);
    app.use("{/*dummy}", (req, res) => {
        return res.status(404).json({
            message: "invalid application routing plz check the method and url",
        });
    });
    app.use(error_response_1.globalErrorHandling);
    app.listen(port, () => {
        console.log(`server is  running on port ${port}`);
    });
};
exports.default = bootstrap;
