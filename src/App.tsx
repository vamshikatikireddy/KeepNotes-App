import "./App.css";
import CreateNotes from "./pages/createNotes";
import { Layout } from "./components/ui/Layout";
import { ThemeProvider } from "./context/ThemeContext";
import NotesGallery from "./pages/notesGallery";
import { NotesProvider } from "./context/NotesContext";
import SpeedDail from "./components/ui/MUI_components/SpeedDail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./pages/createList";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <NotesProvider>
          <Layout title="My app">
            <Routes>
              <Route path="/" element={<NotesGallery />} />
              <Route path="/create" element={<CreateNotes />} />
              <Route path="/list" element={<List />} />
            </Routes>
            <SpeedDail />
          </Layout>
        </NotesProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
