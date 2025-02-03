import { createSlice } from "@reduxjs/toolkit";

type ThemeState = {
  theme: "light" | "dark";
};

const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
const initialTheme = storedTheme || "light";

if (initialTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const themeSlice = createSlice({
  name: "theme",
  initialState: { theme: initialTheme },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", state.theme === "dark");
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice;
