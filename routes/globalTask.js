const express = require("express");

const router = express.Router();
const GlobalTask = require("../models/GlobalTask");

// send task to other table  
router.post("/upload", async (req, res) => {
    try {
      const { md, title, description, completed, createdate, modifydate, publisher, assignee, type, constraints, reward } = req.body;
      const task = new GlobalTask({
          md,
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
      await task.save();
      res.json({ msg: "Task uploaded successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

router.get("/getAll", async (req, res) => {
    try {
      const task = await GlobalTask.find();
      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
});

// get task by id
router.get("/getTaskId/:id", async (req, res) => {
  try {
    const task = await GlobalTask.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/getTaskMd/:md", async (req, res) => {
  try {
    const task = await GlobalTask.findOne({ md: req.params.md });
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/search/:type", async (req, res) => {
  const searchKeyword = req.params.type;
  try {
      const task = await GlobalTask.find({ type: { $in: [new RegExp(searchKeyword, 'i')] } });
      res.json(task);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
  }
});

router.delete("/delete/:md", async (req, res) => {
  try {
    const task = await GlobalTask.findOne({ md: req.params.md });
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

router.delete("/deleteid/:id", async (req, res) => {
  try {
    const task = await GlobalTask.findById(req.params.id);
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


router.get('/tasks', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const result = await GlobalTask.paginate({}, { page, limit: pageSize });

    res.json({
      tasks: result.docs,
      totalPages: result.totalPages,
    });
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ message: 'Error getting tasks',error: error.message });
  }
});

module.exports = router;
