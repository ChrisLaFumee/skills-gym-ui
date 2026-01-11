import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import ChallengeDetails from "./pages/ChallengeDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/challenges/:id" element={<ChallengeDetails />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
