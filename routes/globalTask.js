const express = require("express");
const router = express.Router();
const GlobalTask = require("../models/GlobalTask");

// send task to other table  
router.post("/upload", async (req, res) => {
    try {
      const { title, description, completed, createdate, modifydate, publisher, assignee, type, constraints, reward } = req.body;
  
      const task = new GlobalTask({
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
      const tasks = await GlobalTask.find();
      res.json(tasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
});

// get task by id
router.get("/getTask/:id", async (req, res) => {
    try {
      const task = await GlobalTask.findById(req.params.id);
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
      const tasks = await GlobalTask.find({ type: { $in: [new RegExp(searchKeyword, 'i')] } });
      res.json(tasks);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
  }
});

module.exports = router;
