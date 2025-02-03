import React, { FC, useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu.tsx";
import List from "./components/List.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/index.tsx";
import { fetchTasks } from "./store/TaskSlice.ts";

const App: FC = () => {
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const [search, setSearch] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [selectedToDate, setSelectedToDate] = useState<Date | null>(null);
  const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      !selectedStatus ||
      task.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchTag =
      !selectedTag || task.tags.toLowerCase() === selectedTag.toLowerCase();
    const matchDate =
      (!selectedFromDate && !selectedToDate) ||
      (selectedFromDate &&
        selectedToDate &&
        new Date(task.endDate).getTime() >= selectedFromDate.getTime() &&
        new Date(task.endDate).getTime() <= selectedToDate.getTime()) ||
      (selectedFromDate && !selectedToDate) ||
      (!selectedFromDate && selectedToDate);
    return matchSearch && matchStatus && matchTag && matchDate;
  });

  return (
    <div className="flex flex-row p-4 text-gray-700 bg-white dark:bg-slate-600 h-[100vh]">
      <Menu
        setSearch={setSearch}
        search={search}
        setSelectedStatus={setSelectedStatus}
        selectedStatus={selectedStatus}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        selectedToDate={selectedToDate}
        setSelectedToDate={setSelectedToDate}
        selectedFromDate={selectedFromDate}
        setSelectedFromDate={setSelectedFromDate}
      />
      <List tasks={filteredTasks} />
    </div>
  );
};

export default App;
