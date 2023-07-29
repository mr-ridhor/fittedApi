const express=require("express")
const router=express.Router()
const Task=require('../models/Task');
const validateAdmin = require("../helpers/validateAdmin");

// router.get("/", (req,res)=>{
//     res.send("This is my router")
// })
/* GET ALL TASK ASSIGNED */
router.get('/', validateAdmin, async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
      return res.status(200)
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the tasks.' });
    }
  });

/* GET A SINGLE TASK BY ID */
router.get('/:id', validateAdmin, async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found.' });
      }
      res.json(task);
      return res.status(200)
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the task.' });
    }
  });

/* CREATE A NEW TASK  */
router.post('/', validateAdmin, async (req, res) => {
    try {
      const { title, assignedUser, completed } = req.body;
      const task = new Task({ title, assignedUser, completed });
      const savedTask = await task.save();
      res.json(savedTask);
      return res.status(201)

    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the task.' });
    }
  });


  // Delete a specified task
router.delete('/:id', validateAdmin, async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found.' });
      }
      return res.status(204)
      res.json({ message: 'Task deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the task.' });
    }
  });
  /* EDIT A THE TITLE OR COMPLETION STA */

  router.patch('/:id', validateAdmin, async (req, res) => {
    try {
      const { title, completed } = req.body;
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { $set: { title, completed } },
        { new: true }
      );
      if (!task) {
        return res.status(404).json({ error: 'Task not found.' });
      }
      res.json(task);
      return res.status(204)
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the task.' });
    }
  });

  /* MULTIPLE TASK  */
router.post('/bulk', validateAdmin, async (req, res) => {
    try {
      const tasks = req.body;
      const savedTasks = await Task.insertMany(tasks);
      res.json(savedTasks);
      return res.status(201)
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating multiple tasks.' });
    }
  });
  

  /* bUL DELETE */

  router.delete('/bulk', validateAdmin, async (req, res) => {
    try {
      const taskIds = req.body;
      await Task.deleteMany({ _id: { $in: taskIds } });
      res.json({ message: 'Tasks deleted successfully.' });
      return res.status(201)
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting multiple tasks.' });
    }
  });
module.exports=router;