import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const handleToggleComplete = () => {
    onToggleComplete(task);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 flex items-start gap-3">
          {/* Checkbox for marking complete */}
          <button
            type="button"
            onClick={handleToggleComplete}
            aria-label={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
            className={`flex-shrink-0 mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${
              task.status === 'completed'
                ? 'bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600'
                : 'border-gray-300 dark:border-gray-500 hover:border-green-500 hover:bg-green-50 dark:hover:bg-gray-700'
            }`}
          >
            {task.status === 'completed' && (
              <FontAwesomeIcon icon={faCheck} className="text-white w-3 h-3" />
            )}
          </button>

          <div className="flex-1">
            <h3
              className={`text-lg font-bold mb-2 transition-all ${
                task.status === 'completed'
                  ? 'line-through text-gray-500 dark:text-gray-400'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {task.title}
            </h3>
            <p
              className={`text-sm mb-4 transition-all ${
                task.status === 'completed'
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {task.description || 'No description'}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-4 flex-shrink-0 ${
            task.status === 'completed'
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200'
          }`}
          aria-label={`Status: ${task.status}`}
        >
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onEdit(task)}
          aria-label={`Edit task: ${task.title}`}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faPen} />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task)}
          aria-label={`Delete task: ${task.title}`}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
