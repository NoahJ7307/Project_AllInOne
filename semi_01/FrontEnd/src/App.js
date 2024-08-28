import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Login from "./components/allInOne/user/Login";
import Logout from "./components/allInOne/user/Logout";
import Mypage from "./components/allInOne/user/Mypage";
import Revise from "./components/allInOne/user/Revise";
import Register from "./components/allInOne/user/Register";
import VisitPark from "./components/allInOne/visit/VisitPark";
import VisitList from "./components/allInOne/visit/VisitList";
import StudyRoom from "./components/allInOne/study/StudyRoom";
import Reservation from "./components/allInOne/study/Reservation";
import ServerTest from "./components/allInOne/ServerTest";
import Sidebar from "./components/allInOne/Sidebar";
import Navbar from "./components/allInOne/Navbar";
import Home from "./components/Home";

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
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<ServerTest />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/my_page" element={<Mypage />} />
              <Route path="/study_res" element={<StudyRoom />} />
              <Route path="/revise" element={<Revise />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/visitpark" element={<VisitPark />} />
              <Route path="/visitlist" element={<VisitList />} />
            </Routes>
          </Stack>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
