import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { taskAPI } from '../api/api';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSavingTask, setIsSavingTask] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await taskAPI.getTasks();
      setTasks(response.data.tasks || []);
    } catch (err) {
      toast.error('Failed to load tasks. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (formData) => {
    setIsSavingTask(true);
    try {
      if (selectedTask) {
        // Update existing task
        await taskAPI.updateTask(selectedTask._id, formData);
        setTasks(
          tasks.map((t) =>
            t._id === selectedTask._id ? { ...t, ...formData } : t
          )
        );
        toast.success('Task updated successfully!');
      } else {
        // Create new task
        const response = await taskAPI.createTask(formData);
        setTasks([response.data.task, ...tasks]);
        toast.success('Task created successfully!');
      }
      setIsModalOpen(false);
      setSelectedTask(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save task.');
    } finally {
      setIsSavingTask(false);
    }
  };

  const handleDeleteTask = async () => {
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await taskAPI.deleteTask(confirmDelete._id);
      setTasks(tasks.filter((t) => t._id !== confirmDelete._id));
      setConfirmDelete(null);
      toast.success('Task deleted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete task.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      
      // Optimistic update
      setTasks(
        tasks.map((t) =>
          t._id === task._id ? { ...t, status: newStatus } : t
        )
      );
      
      // API call
      await taskAPI.updateTask(task._id, { status: newStatus });
      toast.success(newStatus === 'completed' ? 'Task completed!' : 'Task marked pending.');
    } catch (err) {
      toast.error('Failed to update task.');
      setTasks(tasks);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Tasks
          </h2>
          <button
            onClick={handleCreateTask}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold"
            aria-label="Create new task"
          >
            Add Task
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              No tasks yet. Create your first task to get started!
            </p>
            <button
              onClick={handleCreateTask}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create First Task
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={(t) => setConfirmDelete(t)}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        )}
      </main>

      <TaskModal
        isOpen={isModalOpen}
        task={selectedTask}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onSubmit={handleSaveTask}
        isLoading={isSavingTask}
      />

      <ConfirmDialog
        isOpen={!!confirmDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${confirmDelete?.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteTask}
        onCancel={() => setConfirmDelete(null)}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default DashboardPage;
