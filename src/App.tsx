import './i18n'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navigation/NavBar";
import { HomePage, AboutUsPage, BookingPage, ContactPage, GalleryPage } from "./pages";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/about-us" element={<AboutUsPage />}></Route>
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </Router>
    );
}

export default App;
