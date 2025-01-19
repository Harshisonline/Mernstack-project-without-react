import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    isAdmin: Boolean,
    purchases: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const courseSchema = new Schema({
    title: String,
    description: String,
    Author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);

export { User, Course };