import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { useState } from "react";
import ServerTest from "./components/ServerTest";
import Add from "./components/Add";
import Login from "./components/allInOne/Login";
import Logout from "./components/allInOne/Logout";
import Sidebar from "./components/allInOne/Sidebar";
import Feed from "./components/allInOne/Feed";
import Rightbar from "./components/allInOne/Rightbar";
import Navbar from "./components/allInOne/Navbar";
import Mypage from "./components/allInOne/Mypage";
import Register from "./components/allInOne/Register";
import Reservation from "./components/allInOne/Reservation";
import Revise from "./components/allInOne/Revise";
import StudyRoom from "./components/allInOne/StudyRoom";
import VisitPark from "./components/allInOne/VisitPark";
import VisitList from "./components/allInOne/VisitList";

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
            <Rightbar />
          </Stack>
          <Add />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
