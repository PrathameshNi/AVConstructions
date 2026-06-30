import AdminLogin from './components/AdminLogin.jsx'
import AdminHome from './components/AdminHome.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddAdmin from './components/AddAdmin.jsx';
import EditHome from './components/EditHome.jsx';
import EditClient from './components/EditClient.jsx';
import EditServices from './components/EditServices.jsx';
import EditProjects from './components/EditProjects.jsx';
import EditAbout from './components/EditAbout.jsx';
import Appointments from './components/ViewAppointments.jsx';
import ViewAdmins from './components/ViewAdmins.jsx';
import EditContact from './components/EditContact.jsx';
import BillingPage from './components/Billing.jsx';
import ViewFeedback from "./pages/ViewFeedback";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path='/add-admin' element={<AddAdmin/>}/>
        <Route path="/edit-home" element={<EditHome />}/>
        <Route path='/edit-client' element={<EditClient/>}/>
        <Route path='/edit-services' element={<EditServices/>}/>
        <Route path="/edit-projects" element={<EditProjects />}/>
        <Route path='/edit-about' element={<EditAbout/>}/>
        <Route path="/appointments" element={<Appointments />}/>
        <Route path="/view-admins" element={<ViewAdmins />}/>
        <Route path="/edit-contact" element={<EditContact />}/>
        <Route path='/billing' element={<BillingPage/>}/>
        <Route path="/view-feedback" element={<ViewFeedback />}
/>
      </Routes>
    </Router>
  )
}

export default App
