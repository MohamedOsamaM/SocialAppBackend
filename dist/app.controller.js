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
const user_controller_1 = __importDefault(require("./modules/user/user.controller"));
const error_response_1 = require("./utils/response/error.response");
const connection_db_1 = __importDefault(require("./DB/connection.db"));
const s3_config_1 = require("./utils/multer/s3.config");
const util_1 = require("util");
const stream_1 = require("stream");
const createS3WriteStream = (0, util_1.promisify)(stream_1.pipeline);
const Limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 60000,
    limit: 2000,
    message: { error: "too many request please try again later" },
    statusCode: 429,
});
const bootstrap = async () => {
    const app = (0, express_1.default)();
    const port = process.env.PORT || 5000;
    app.use((0, cors_1.default)(), express_1.default.json(), (0, helmet_1.default)(), Limiter);
    app.get("/", (req, res) => {
        res.json({ message: `Welcome to ${process.env.APPLICATION_NAME} Backend` });
    });
    app.use("/auth", auth_controller_1.default);
    app.use("/user", user_controller_1.default);
    app.get("/upload/*path", async (req, res) => {
        const { path } = req.params;
        if (!path?.length) {
            throw new error_response_1.BadRequestException("validation error", {
                validationError: {
                    key: "params",
                    issue: [{ path: "path", message: "missing asset path" }],
                },
            });
        }
        const Key = path.join("/");
        const s3Response = await (0, s3_config_1.getFile)({ Key });
        if (!s3Response?.Body) {
            throw new error_response_1.BadRequestException("fail to fetch this response");
        }
        res.setHeader("Content-Type", s3Response.ContentType || "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename="${Key.split("/").pop()}"`);
        return await createS3WriteStream(s3Response.Body, res);
    });
    app.get("/upload/signed/*path", async (req, res) => {
        const { path } = req.params;
        if (!path?.length) {
            throw new error_response_1.BadRequestException("validation error", {
                validationError: {
                    key: "params",
                    issue: [{ path: "path", message: "missing asset path" }],
                },
            });
        }
        const Key = path.join("/");
        const url = await (0, s3_config_1.createPreSignedGetLink)({ Key, download: true });
        return res.json({ url });
    });
    app.use("{/*dummy}", (req, res) => {
        return res.status(404).json({
            message: "invalid application routing plz check the method and url",
        });
    });
    app.use(error_response_1.globalErrorHandling);
    await (0, connection_db_1.default)();
    app.listen(port, () => {
        console.log(`server is  running on port ${port}`);
    });
};
exports.default = bootstrap;
