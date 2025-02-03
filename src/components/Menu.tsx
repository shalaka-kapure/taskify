import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleCheck,
  faClockRotateLeft,
  faHourglassHalf,
  faListCheck,
  faSearch,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

interface MenuProps {
  setSearch: (query: string) => void;
  search: string;
  setSelectedStatus: (status: string) => void;
  selectedStatus: string;
  setSelectedTag: (tag: string) => void;
  selectedTag: string;
  setSelectedFromDate: (date: Date | null) => void;
  selectedFromDate: Date | null;
  setSelectedToDate: (date: Date | null) => void;
  selectedToDate: Date | null;
}

const Menu: FC<MenuProps> = ({
  setSearch,
  search,
  setSelectedStatus,
  selectedStatus,
  setSelectedTag,
  selectedTag,
  setSelectedFromDate,
  selectedFromDate,
  setSelectedToDate,
  selectedToDate,
}) => {
  const [toggle, setToggle] = useState<boolean>(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setToggle(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleFromDate = (e: ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value ? new Date(e.target.value) : null;
    setSelectedFromDate(dateValue);
  };

  const handleToDate = (e: ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value ? new Date(e.target.value) : null;
    setSelectedToDate(dateValue);
  };

  const clearDates = () => {
    setSelectedFromDate(null);
    setSelectedToDate(null);
  };

  const handleToggle = (): void => {
    setToggle(!toggle);
  };

  return (
    <div
      className={`border-2 border-gray-400 dark:border-gray-600 rounded bg-slate-100 dark:bg-gray-800 h-[95vh] p-2 top-0 left-0 z-1
      ${toggle ? "w-[3rem] relative" : "w-full sm:w-[30%] sm:relative fixed"} transition-all duration-300 ease-in-out text-gray-700 dark:text-gray-200`}
    >
      <div
        className={`w-[100%] flex items-center p-2 ${
          toggle ? "justify-center" : "justify-between"
        }`}
      >
        <span className={toggle ? "hidden" : ""}>Menu</span>
        <span>
          <FontAwesomeIcon
            icon={faBars}
            className="text-gray-500 dark:text-gray-300 cursor-pointer"
            onClick={handleToggle}
            size="1x"
          />
        </span>
      </div>

      <div
        className={`flex items-center border border-gray-300 dark:border-gray-500 rounded px-2 py-1 my-4 transition-opacity duration-300 ${
          toggle ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <FontAwesomeIcon
          icon={faSearch}
          className="text-gray-500 dark:text-gray-300 mr-2"
        />
        <input
          type="search"
          placeholder="Search for a task"
          className="flex-grow bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          onChange={handleSearchChange}
          value={search}
        />
      </div>

      <div
        className={`border-b border-b-gray-200 dark:border-gray-600 ${
          toggle ? "hidden" : ""
        } transition-opacity duration-300`}
      ></div>
      <div
        className={`border-b border-b-gray-200 dark:border-gray-600 py-4 transition-opacity duration-300 ${
          toggle ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span>Filter By:</span>
        <ul className="cursor-pointer mt-3">
          <div className="flex justify-between">
            <label>Status:</label>
            {selectedStatus && (
              <label
                className="my-1 cursor-pointer font-bold"
                onClick={() => handleStatusFilter("")}
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="text-gray-500 dark:text-gray-300 mr-1"
                />
                Clear Filter
              </label>
            )}
          </div>
          {["Completed", "Pending", "To be Done", "In Progress"].map(
            (status) => (
              <li
                key={status}
                className={`my-1 ${
                  selectedStatus === status
                    ? "bg-blue-200 dark:bg-gray-700 font-bold"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => handleStatusFilter(status)}
              >
                <FontAwesomeIcon
                  icon={
                    status === "Completed"
                      ? faCircleCheck
                      : status === "Pending"
                      ? faListCheck
                      : status === "To be Done"
                      ? faClockRotateLeft
                      : faHourglassHalf
                  }
                  className="text-gray-500 dark:text-gray-300 mr-2"
                />
                {status}
              </li>
            )
          )}
        </ul>
      </div>
      <div className={`flex justify-between my-1 ${
          toggle ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}>
        <label>Date:</label>
        {selectedFromDate && selectedToDate && (
          <label className="my-1 cursor-pointer font-bold" onClick={clearDates}>
            <FontAwesomeIcon
              icon={faTrashCan}
              className="text-gray-500 dark:text-gray-300 mr-1"
            />
            Clear Filter
          </label>
        )}
      </div>
      <div
        className={`flex justify-evenly items-center ${
          toggle ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <input
          type="date"
          className="border border-gray-300 dark:border-gray-500 bg-transparent p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700 text-gray-700 dark:text-gray-200"
          value={
            selectedFromDate ? selectedFromDate.toISOString().split("T")[0] : ""
          }
          onChange={handleFromDate}
        />
        <span>to</span>
        <input
          type="date"
          className="border border-gray-300 dark:border-gray-500 bg-transparent p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700 text-gray-700 dark:text-gray-200"
          value={
            selectedToDate ? selectedToDate.toISOString().split("T")[0] : ""
          }
          onChange={handleToDate}
        />
      </div>

      {/* Tags */}
      <div
        className={`border-b border-b-gray-200 dark:border-gray-600 py-4 transition-opacity duration-300 ${
          toggle ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="flex justify-between">
          <span>Tags:</span>
          {selectedTag && (
            <label
              className="my-1 cursor-pointer font-bold"
              onClick={() => handleTagFilter("")}
            >
              <FontAwesomeIcon
                icon={faTrashCan}
                className="text-gray-500 dark:text-gray-300 mr-1"
              />
              Clear Filter
            </label>
          )}
        </div>
        <ul className="cursor-pointer mt-3 flex space-x-4 flex-wrap justify-center">
          {["Personal", "Shopping", "Urgent", "Work", "Errands"].map((tag) => (
            <li
              key={tag}
              className={`my-1 border rounded p-2 ${
                tag === "Personal"
                  ? "bg-purple-200 dark:bg-purple-700"
                  : tag === "Shopping"
                  ? "bg-yellow-200 dark:bg-yellow-700"
                  : tag === "Urgent"
                  ? "bg-red-200 dark:bg-red-700"
                  : tag === "Work"
                  ? "bg-blue-200 dark:bg-blue-700"
                  : "bg-green-200 dark:bg-green-700"
              } ${
                selectedTag === tag
                  ? "border-gray-800 dark:border-gray-200 font-bold"
                  : "border-gray-200 dark:border-gray-600"
              }`}
              onClick={() => handleTagFilter(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
