

// import { createContext, useContext, useEffect, useState } from "react";

// type Theme = "light" | "dark";

// interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
//   const [theme, setTheme] = useState<Theme>("light");

//   useEffect(() => {
//     const savedTheme = (localStorage.getItem("theme") as Theme) || "light";
//     setTheme(savedTheme);

//     if (savedTheme === "light") {
//       document.documentElement.classList.add("light");
//     } else {
//       document.documentElement.classList.remove("light");
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme: Theme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);

//     if (newTheme === "light") {
//       document.documentElement.classList.add("light");
//     } else {
//       document.documentElement.classList.remove("light");
//     }
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useThemeContext = () => {
//   const ctx = useContext(ThemeContext);
//   if (!ctx) throw new Error("useThemeContext must be inside ThemeProvider");
//   return ctx;
// };
