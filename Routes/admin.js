import { Router } from "express";
import adminMiddleware from "../middlewares/adminmw";
import { Course } from "../db";  
const router = Router();

router.use(adminMiddleware);

router.post('/make-course', async (req, res) => {
    const id = req.id;
    const { description, title } = req.body;

    try {
        const result = await Course.create({
            description,
            title,
            Author: id
        });
        res.status(201).json({ message: "Course added successfully", result });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.put('/update-course', async (req, res) => {
    const { description, title, courseId } = req.body;

    try {
        const result = await Course.updateOne(
            { _id: courseId },
            {
                $set: {
                    description,
                    title
                }
            }
        );
        res.json({ message: "Successfully updated", result });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.get('/preview', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json({ courses });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

export default router;
