import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/index";
import { addTask } from "../store/TaskSlice.ts";

interface FormData {
  title: string;
  description: string;
  endDate: Date;
  tags: string;
  status: string;
}

interface AddNewTaskProps {
  closeModal: () => void;
}

const AddNewTask: FC<AddNewTaskProps> = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    endDate: new Date(),
    tags: "",
    status: "",
  });

  const dispatch: AppDispatch = useDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    if (name === "endDate") {
      setFormData((prev) => ({
        ...prev,
        endDate: value ? new Date(value) : new Date(),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    try {
      dispatch(
        addTask({
          title: formData.title,
          description: formData.description,
          endDate: new Date(formData.endDate),
          tags: formData.tags,
          status: formData.status,
        })
      );
      alert("Task submitted successfully!");
      setFormData({
        title: "",
        description: "",
        endDate: new Date(),
        tags: "",
        status: "",
      });
      closeModal();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
          Add New Task
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter task title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter task description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              End Date:
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              onChange={handleChange}
              name="endDate"
              value={formData.endDate.toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Tags:
            </label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
            >
              <option value="">Select a tag</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Shopping">Shopping</option>
              <option value="Urgent">Urgent</option>
              <option value="Errands">Errands</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Status:
            </label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Select a status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="To be Done">To be Done</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="border border-gray-400 py-2 px-4 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border border-gray-400 px-4 py-2 rounded bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-gray-700 dark:text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewTask;
