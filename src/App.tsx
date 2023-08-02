import './App.css'
import NavBar from './Components/Navbar/NavBar'
import { AuthContextComponent } from './auth/authContext'

function App() {

  return (
    <>
    <AuthContextComponent>
      <div>
        <NavBar/>
      </div>
    </AuthContextComponent>
    </>
  )
}

export default App
