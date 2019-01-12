"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.UserSchema = new Schema({
    schoolId: {
        type: String,
        required: 'The studentId is mandatory',
        unique: true
    },
    role: {
        type: String,
        required: 'The role is mandatory'
    },
    password: {
        type: String,
        required: 'The password is mandatory'
    },
});
//# sourceMappingURL=UserSchema.js.map