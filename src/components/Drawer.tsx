import { faEdit, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, FC, useState } from "react";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { updateTask } from "../store/TaskSlice.ts";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  tags: string;
  endDate: Date;
}

interface DrawerProps {
  openDeleteModal: (task: Task) => void;
  isEditMode: boolean;
  closeDrawer: () => void;
  toggleEditMode: () => void;
  task: Task;
}

const tagColors: Record<string, string> = {
  Personal: "bg-purple-200 dark:bg-purple-600",
  Work: "bg-blue-200 dark:bg-blue-600",
  Shopping: "bg-yellow-200 dark:bg-yellow-600",
  Urgent: "bg-red-200 dark:bg-red-600",
  Errands: "bg-green-200 dark:bg-green-600",
};

const Drawer: FC<DrawerProps> = ({
  openDeleteModal,
  isEditMode,
  closeDrawer,
  toggleEditMode,
  task,
}) => {
  const [editTask, setEditTask] = useState<Task>(task);
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    if (name === "endDate") {
      setEditTask((prev) => ({
        ...prev,
        endDate: value ? new Date(value) : new Date(),
      }));
    } else {
      setEditTask((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async (): Promise<void> => {
    try {
      await dispatch(updateTask(editTask)).unwrap();
      toggleEditMode();
      alert("Task updated successfully!");
      closeDrawer();
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  return (
    <div className="border-2 border-gray-400 rounded bg-slate-100 dark:bg-gray-800 dark:border-gray-600 h-[85vh] p-2 transition-all duration-300 ease-in-out z-2">
      <div className="flex justify-between">
        <span className="text-gray-900 dark:text-gray-100">
          {isEditMode ? "Edit Task" : "Task:"}
        </span>
        <FontAwesomeIcon
          icon={faXmark}
          className="text-gray-500 dark:text-gray-300 cursor-pointer"
          onClick={closeDrawer}
        />
      </div>
      {isEditMode ? (
        <>
          <input
            type="text"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
            placeholder="Enter task title"
            name="title"
            value={editTask.title}
            onChange={handleChange}
          />
          <textarea
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
            placeholder="Enter task description"
            name="description"
            value={editTask.description}
            onChange={handleChange}
          />
          <input
            type="date"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
            name="endDate"
            value={new Date(editTask.endDate).toISOString().split("T")[0]}
            onChange={handleChange}
          />
          <label className="block font-medium text-gray-900 dark:text-gray-100">
            Tags:
          </label>
          <select
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
            name="tags"
            value={editTask.tags}
            onChange={handleChange}
          >
            <option value="">Select a tag</option>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Shopping">Shopping</option>
            <option value="Urgent">Urgent</option>
            <option value="Errands">Errands</option>
          </select>
          <div>
            <label className="block font-medium text-gray-900 dark:text-gray-100">
              Status:
            </label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
              name="status"
              value={editTask.status}
              onChange={handleChange}
            >
              <option value="">Select a status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="To be Done">To be Done</option>
            </select>
          </div>
        </>
      ) : (
        <>
          <div className="border border-gray-200 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-gray-100 my-2">
            <label className="block font-medium text-gray-900 dark:text-gray-100">
              Title:
            </label>
            {task.title}
          </div>
          <div className="border border-gray-200 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-gray-100 mb-2">
            <label className="block font-medium text-gray-900 dark:text-gray-100">
              Description:
            </label>
            {task.description}
          </div>
          <div className="border border-gray-200 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-gray-100 mb-2">
            End Date: {new Date(task.endDate).toLocaleDateString()}
          </div>
          <div className="border border-gray-200 dark:border-gray-600 rounded px-2 py-3 text-gray-900 dark:text-gray-100 mb-2">
            <span>Tags:</span>
            <span
              className={`border border-gray-200 rounded p-2 ${
                tagColors[editTask.tags]
              } my-1 ml-2 `}
            >
              {task.tags}
            </span>
          </div>
          <div className="border border-gray-200 dark:border-gray-600 rounded p-2 text-gray-900 dark:text-gray-100 mb-2">
            <span>Status:</span>
            <span className="ml-2">{task.status}</span>
          </div>
        </>
      )}

      <div className="flex justify-between">
        <button
          className="border border-gray-400 dark:border-gray-600 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100"
          onClick={() => openDeleteModal(task)}
        >
          Delete Task <FontAwesomeIcon icon={faTrash} />
        </button>
        <button
          className="border border-gray-400 dark:border-gray-600 px-4 py-2 rounded bg-yellow-200 dark:bg-yellow-600 hover:bg-yellow-300 dark:hover:bg-yellow-500 text-gray-700 dark:text-gray-100"
          onClick={isEditMode ? handleSave : toggleEditMode}
        >
          {isEditMode ? (
            "Save Task"
          ) : (
            <>
              <span>Edit Task</span> <FontAwesomeIcon icon={faEdit} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Drawer;
