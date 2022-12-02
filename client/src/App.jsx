import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import {BrowserRouter,Navigate,Routes,Route} from 'react-router-dom'
import HomePage from './pages/userPages/homePage/HomePage.jsx'
import Loginpage from './pages/userPages/loginPage/Loginpage.jsx'
import ProfilePage from './pages/userPages/profilePage/ProfilePage.jsx'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CssBaseline,ThemeProvider} from '@mui/material';
import { createTheme } from '@mui/material'
import { themeSettings } from './theme.js'



function App() {
  // const [count, setCount] = useState(0)
  const mode = useSelector((state)=>state
  .mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isUserAuth = Boolean(useSelector((state)=> state.token))
  console.log(isUserAuth)
  return (
<div className='app'>

<BrowserRouter>

<ThemeProvider theme={theme}>
  <CssBaseline />
 <Routes>

<Route  path='/' element={isUserAuth ?<HomePage/> : <Loginpage/>}/>
<Route  path='/home' element={isUserAuth ? <HomePage/> : <Navigate to="/" />}/>
<Route  path='/profile/:userId' element={isUserAuth ?  <ProfilePage/> : <Navigate to="/"/>}/>

</Routes> 
</ThemeProvider>



</BrowserRouter>

</div>
  )
}

export default App
