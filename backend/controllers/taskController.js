const Task = require('../models/Task');

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private (requires token)
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    // Validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a title',
      });
    }

    // Create task
    const task = await Task.create({
      title,
      description: description || '',
      userId,
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// @route   GET /api/tasks
// @desc    Get all tasks for logged-in user
// @access  Private (requires token)
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all tasks sorted by creation date (newest first)
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Tasks retrieved successfully',
      count: tasks.length,
      tasks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @route   PATCH /api/tasks/:id
// @desc    Update a task
// @access  Private (requires token)
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, status } = req.body;

    // Find task
    let task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Check if user owns this task
    if (task.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task',
      });
    }

    // Update fields if provided
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) {
      if (!['pending', 'completed'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Status must be either "pending" or "completed"',
        });
      }
      task.status = status;
    }

    task.updatedAt = Date.now();
    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private (requires token)
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find task
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Check if user owns this task
    if (task.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task',
      });
    }

    // Delete task
    await Task.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
