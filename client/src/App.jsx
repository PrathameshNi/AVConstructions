import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Services from './pages/Services'
import Projects from './pages/Projects'
import ProjectsPage from "./pages/ProjectsPage";
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact"
import './App.css'


function App() {
  return (
    <Router>
      
       <Routes>
        <Route
          path="/"
          element={
             <>
             <Navbar/>
              <Home/>
              <Services/>
              <Projects/>
              <About/>
              <Contact/>
            </>
          }
        />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
    </Router>
  )
}

export default App
