import React, { FC } from "react";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { deleteTask } from "../store/TaskSlice.ts";

interface DeleteTaskProps {
  closeModal: () => void;
  id: string;
}

const DeleteTask: FC<DeleteTaskProps> = ({
  closeModal,
  id,
}: {
  closeModal: () => void;
  id: string;
}) => {
  const dispatch: AppDispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
    closeModal();
    alert("Task Deleted Successfully");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Delete Task</h2>
        <h2 className="text-sm mb-4 text-gray-700 dark:text-gray-300">
          Are you sure you want to delete your Task?
        </h2>
        <div className="flex justify-end space-x-2">
          <button
            className="border border-gray-400 py-2 px-4 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
            onClick={closeModal}
          >
            No
          </button>
          <button
            className="border border-gray-400 py-2 px-4 rounded bg-red-300 hover:bg-red-400 text-gray-700 dark:bg-red-600 dark:hover:bg-red-500 dark:text-gray-300"
            onClick={() => handleDelete(id)}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
