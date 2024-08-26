import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ServerTest from "./components/ServerTest";
import Rightbar from "./components/Rightbar";
import Add from "./components/Add";
import UserForm from "./components/UserForm";  // Assuming Hello component is defined
import About from "./components/About";  // Assuming About component is defined

function App() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <Navbar />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar setMode={setMode} mode={mode} />
            <Routes>
              <Route path="/" element={<ServerTest />} />
              <Route path="/user" element={<UserForm />} />
              <Route path="/about" element={<About />} />
            </Routes>
            <Rightbar />
          </Stack>
          <Add />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
