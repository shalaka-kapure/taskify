import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
  description: string;
  endDate: Date;
  tags: string;
  status: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (formData: Omit<Task, "id">) => {
    const response = await fetch(
      "https://to-do-list-app-d239c-default-rtdb.asia-southeast1.firebasedatabase.app/to-do-list.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add task");
    }
    return formData;
  }
);

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch(
    "https://to-do-list-app-d239c-default-rtdb.asia-southeast1.firebasedatabase.app/to-do-list.json"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data: Record<string, unknown> = await response.json();

  return Object.entries(data || {}).map(([id, task]) => {
    if (typeof task === "object" && task !== null) {
      const { id: _, ...rest } = task as Task; // Exclude the existing 'id' in the task object
      return {
        id, // Use the id from Object.entries
        ...rest, // Spread the rest of the task properties
      };
    }
    throw new Error("Invalid task format");
  }) as Task[];
});

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (editTask: Task) => {
    console.log("edit task from taskSlice", editTask);
    const response = await fetch(
      `https://to-do-list-app-d239c-default-rtdb.asia-southeast1.firebasedatabase.app/to-do-list/${editTask.id}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editTask),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    return editTask;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    console.log("edit task from taskSlice", id);
    const response = await fetch(
      `https://to-do-list-app-d239c-default-rtdb.asia-southeast1.firebasedatabase.app/to-do-list/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    return id;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addTask.fulfilled,
        (state, action: PayloadAction<Omit<Task, "id">>) => {
          state.loading = false;
          state.tasks.push({ id: Date.now().toString(), ...action.payload });
        }
      )
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add task";
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const updatedTask = action.payload;
        const taskIndex = state.tasks.findIndex(
          (task) => task.id === updatedTask.id
        );
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = updatedTask;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update task";
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        const deletedTaskId = action.payload;
        state.tasks = state.tasks.filter((task) => task.id !== deletedTaskId);
      })
      
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update task";
      });
  },
});

export default taskSlice;
