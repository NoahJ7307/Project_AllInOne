import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { useState } from "react";
import ServerTest from "./components/ServerTest";
import Add from "./components/Add";
import Ex01 from "./components/allInOne/Ex01";
import Login from "./components/allInOne/Login";
import Logout from "./components/allInOne/Logout";
import Sidebar from "./components/allInOne/Sidebar";
import Feed from "./components/allInOne/Feed";
import Rightbar from "./components/allInOne/Rightbar";
import Navbar from "./components/allInOne/Navbar";

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
              <Route path="/user" element={<ServerTest />} />
              <Route path="/" element={<Feed />} />
              <Route path="/yu" element={<Ex01 />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
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
