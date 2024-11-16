// firstly, Don't get overwhelmed and if you are then go with client-easy.
import Home from "./pages/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import { RecoilRoot } from "recoil"
import Nopage from "./components/404"
import Courses from "./components/Courses"
import About from "./components/about"
import RegisterAdmin from "./components/RegisterAdmin"
import LoginAdmin from "./components/LoginAdmin"
function App() {

  return (
    <>
      <BrowserRouter>
      <RecoilRoot>

      <Routes>
      <Route>
        <Route path="/" element={<Register/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="*" element={<Nopage/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/adminRegister" element={<RegisterAdmin/>}/>
        <Route path="/adminLogin" element={<LoginAdmin/>}  />
      </Route>
      </Routes>
      </RecoilRoot>

      </BrowserRouter>
      {/* <Login/> */}

    </>
  )
}

export default App
