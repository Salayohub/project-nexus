

export type Theme = "light" | "dark";

export default interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface ReactComponentProps {
  children: React.ReactNode;
}

export interface ThemeProvider{
  children: React.ReactNode;
}