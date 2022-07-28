import NavMenu from './components/NavMenu'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Surveys from './components/Surveys'
import Login from './components/Login'
import Register from './components/Register'

export default function App() {
    return (
      <>
        <Routes>
          <Route path='/' element={<NavMenu />}>
            <Route index element={<Home />} />
            <Route path="surveys" element={<Surveys />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </>
    )
}