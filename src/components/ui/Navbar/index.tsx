import { ThemeToggleButton } from "./ThemeToggleButton";
import { useTheme } from "../../../context/ThemeContext";

interface props {
  title: string;
  children: React.ReactNode;
}

export default function Navbar({ title, children }: props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <header
        className={`flex flex-row items-center justify-between w-full h-15 ${
          isDark ? "bg-black" : "bg-white"
        }`}
      >
        <h1 className={`text-2xl ${isDark ? "text-white" : "text-black"}`}>
          {title}
        </h1>
        <ThemeToggleButton />
      </header>
      <div
        className={`w-full h-full ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        {children}
      </div>
    </>
  );
}
