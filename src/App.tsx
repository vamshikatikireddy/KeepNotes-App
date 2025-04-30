import "./App.css";

import { Layout } from "./components/ui/Layout";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Layout title="My app">
        <h2>Hello World</h2>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
