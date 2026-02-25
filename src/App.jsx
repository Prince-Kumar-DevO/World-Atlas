import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Countries from "./pages/Countries";
import CountryDetail from "./pages/CountryDetail";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/country/:code" element={<CountryDetail />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
