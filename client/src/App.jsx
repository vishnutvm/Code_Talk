import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import {BrowserRouter,Navigate,Routes,Route} from 'react-router-dom'
import HomePage from 'pages/userPages/homePage/HomePage'
import Loginpage from 'pages/userPages/loginPage/Loginpage'
import ProfilePage from 'pages/userPages/profilePage/ProfilePage'



function App() {
  // const [count, setCount] = useState(0)

  return (
<div className='app'>

<BrowserRouter>
<Routes>

<Route  path='/' element={<Loginpage/>}/>
<Route  path='/home' element={<HomePage/>}/>
<Route  path='/profile/:userId' element={<ProfilePage/>}/>

</Routes>


</BrowserRouter>

</div>
  )
}

export default App
