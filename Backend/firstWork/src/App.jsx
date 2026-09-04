import Home from './Home'
import Nav from './Nav'
import Header from './Header'
import Footer from './Footer'
import Login from './login'
import Doctors from './Doctors'
import About from './About'
import { Routes, Route } from 'react-router-dom'
import useWindowSize from './hooks/windowsize'
import Contact from './Contact'
import MyProfile from './MyProfile'
import MyAppointment from './MyAppointment'
import Appointment from './Appointment'
import Practice from './practice'
import Services from './Services'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import QueueGenerate from './QueueGenerate'
import Consultationvideo from './Consultationvideo'
// import Consultaion from './userConst'


function App() {

  

const {width} = useWindowSize();
  return (
    <div className="
  
  mx-2
  sm:mx-[5%]
  bg-gradient-to-br
  from-slate-50
  via-white
  to-blue-50/50
">
      <ToastContainer />
     
      
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='service' element={<Services />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/Login' element={<Login />} /> 
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointment' element={<MyAppointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />userCons
        <Route path='/queueGenerate' element={<QueueGenerate />} />
        {/* <Route path='/service' element={<Services />} /> */}
        <Route path='/liveVideo/:appointmentId' element={<Consultationvideo />} />
      </Routes>
       <Footer />
    </div>
  )
}

export default App
