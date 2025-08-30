"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = void 0;
const verifyEmail = ({ otp, title, }) => {
    return `
            Title / ${title}
            otp/${otp}
  `;
};
exports.verifyEmail = verifyEmail;
