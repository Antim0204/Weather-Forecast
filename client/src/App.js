import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherPage from "./pages/Weather";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherPage />} />

        <Route path="/weather" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
}

export default App;