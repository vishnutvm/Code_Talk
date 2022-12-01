import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import {BrowserRouter,Navigate,Routes,Route} from 'react-router-dom'
import HomePage from 'pages/userPages/homePage/HomePage'
import Loginpage from 'pages/userPages/loginPage/Loginpage'
import ProfilePage from 'pages/userPages/profilePage/ProfilePage'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CssBaseline,ThemeProvider} from '@mui/material';
import { createTheme } from '@mui/material'
import { themeSettings } from 'theme'



function App() {
  // const [count, setCount] = useState(0)
  const mode = useSelector((state)=>state
  .mode)
  const theme = useMemo(()=>{
    createTheme(themeSettings(mode))
  },[mode])

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
