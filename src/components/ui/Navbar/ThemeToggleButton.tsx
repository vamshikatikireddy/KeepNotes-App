import { useTheme } from "../../../context/ThemeContext";
import { Switch } from "../switch";

interface props {
  children?: string;
}

export const ThemeToggleButton = ({ children }: props) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  // console.log(theme);
  return (
    <>
      <div
        className={`flex flex-row items-center h-15 gap-2 ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <Switch onCheckedChange={toggleTheme} checked={isDark}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </Switch>
        <h2 className="text-xl font-bold">{theme}</h2>
      </div>
    </>
  );
};
