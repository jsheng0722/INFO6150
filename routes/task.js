const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// add task
router.post("/add", async (req, res) => {
    const { _id, title, description, completed, createdate, modifydate, publisher, assignee, type, constraints, reward } = req.body;

    try {
        let task = await Task.findOne({ _id });

        if (task) {
            // If task already exists, update it
            task.title = title;
            task.description = description;
            task.completed = completed;
            task.createdate = createdate;
            task.modifydate = modifydate;
            task.publisher = publisher;
            task.assignee = assignee;
            task.type = type;
            task.constraints = constraints;
            task.reward = reward;
        } else {
            // If task does not exist, create it
            task = new Task({
                _id,
                title,
                description,
                completed,
                createdate,
                modifydate,
                publisher,
                assignee,
                type,
                constraints,
                reward
            });
        }

        await task.save();
        res.json({ task });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// delete task by id
router.delete("/delete/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }
        await task.deleteOne();
        res.json({ msg: "Task removed" });
    } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Task not found" });
    }
    res.status(500).send("Server error");
    }
});

// modify task by id
router.put("/edit/:id", async (req, res) => {
    const { title, description, completed, createdate, modifydate, publisher, assignee, type, constraints, reward } = req.body;

    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }

        task.title = title;
        task.description = description;
        task.completed = completed;
        task.createdate = createdate;
        task.modifydate = modifydate;
        task.publisher = publisher;
        task.assignee = assignee;
        task.type = type;
        task.constraints = constraints;
        task.reward = reward;

        await task.save();
        res.json({ task });
    } catch (err) {
        console.error(err.message);

        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Task not found" });
        }

        res.status(500).send("Server error");
    }
});
  
// get task
router.get("/getAll", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// update statu by id
router.put("/updateCompleted/:id", async (req, res) => {
    const { completed } = req.body;

    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }
        task.completed = completed;
        await task.save();
        res.json({ task });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.status(500).send("Server error");
    }
});

router.get("/getId/:id", async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ msg: "Task not found" });
      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

module.exports = router;