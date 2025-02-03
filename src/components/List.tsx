import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faChevronRight,
  faEdit,
  faMoon,
  faSun,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AddNewTask from "./AddNewTask.tsx";
import Drawer from "./Drawer.tsx";
import DeleteTask from "./DeleteTask.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/index.tsx";
import { toggleTheme } from "../store/themeSlice.ts";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  tags: string;
  endDate: Date;
}

interface ListProps {
  tasks: Task[];
}

const List: FC<ListProps> = ({ tasks }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleModal = (): void => setModalOpen(!modalOpen);

  const handleDrawer = (task: Task, editMode: boolean = false): void => {
    setSelectedTask(task);
    setDrawerOpen(true);
    setIsEditMode(editMode);
  };

  const closeDrawer = (): void => {
    setDrawerOpen(false);
    setIsEditMode(false);
    setSelectedTask(null);
  };

  const handleDelete = (task: Task): void => {
    console.log("button clicked");
    setSelectedTask(task);
    setDeleteOpen(true);
  };

  return (
    <div className="p-2 w-full">
      <div className="flex justify-between">
        <h4 className="text-lg font-bold dark:text-white h-[3.5rem]">To Do List</h4>      
      <div
        className={`relative w-14 h-7 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-all duration-300`}
        onClick={() => dispatch(toggleTheme())}
      >
        <div
          className={`absolute w-6 h-6 bg-white dark:bg-black rounded-full shadow-md transform transition-all duration-300
            ${theme === "dark" ? "translate-x-7" : "translate-x-0"}`}
        />

        <FontAwesomeIcon
          icon={faSun}
          className="absolute left-1 w-5 h-5 text-yellow-500"
        />
        <FontAwesomeIcon
          icon={faMoon}
          className="absolute right-1 w-5 h-5 text-gray-100 dark:block"
        />
      </div>
      </div>
      <div className="flex">
        <div
          className={`transition-all duration-300 ${
            drawerOpen ? "w-[70%]" : "w-full"
          }`}
        >
          <div
            className="border border-gray-200 rounded p-2 cursor-pointer"
            onClick={handleModal}
          >
            <FontAwesomeIcon icon={faAdd} className="text-gray-500 mr-2 dark:text-white" />
            <span className="dark:text-white">Add New Task</span>
          </div>
          {modalOpen && <AddNewTask closeModal={handleModal} />}
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border-b border-b-gray-200 p-2 flex justify-between"
            >
              <div>
                <span className={`dark:text-white ${task.status === "Completed" ? "line-through" : ""}`}>{task.title}</span>
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faEdit}
                  className="text-gray-500 cursor-pointer mr-4 dark:text-white"
                  onClick={() => handleDrawer(task, true)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-red-400 cursor-pointer mr-4"
                  onClick={() => handleDelete(task)}
                />

                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-gray-500 cursor-pointer dark:text-white"
                  onClick={() => handleDrawer(task, false)}
                />
              </div>
            </div>
          ))}
        </div>
        {drawerOpen && selectedTask && (
          <div className="fixed sm:top-0 top-[73px] left-0 w-full sm:w-[30%] sm:relative transition-all duration-300 ml-2">
            <Drawer
              task={selectedTask}
              isEditMode={isEditMode}
              closeDrawer={closeDrawer}
              toggleEditMode={() => setIsEditMode(!isEditMode)}
              openDeleteModal={handleDelete}
            />
          </div>
        )}
        {deleteOpen && selectedTask && (
          <div className="transition-all duration-300">
            <DeleteTask
              closeModal={() => {
                setDeleteOpen(false);
                setDrawerOpen(false);
                setSelectedTask(null);
              }}
              id={selectedTask.id}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default List;  