import NavBar from './Components/Navbar/NavBar'
import LoginModal from './Components/modals/LoginModal'
import { AuthContextComponent } from './auth/authContext'

function App() {

  return (
    <>
    <AuthContextComponent>
      <div>
        <LoginModal/>
        <NavBar/>
      </div>
    </AuthContextComponent>
    </>
  )
}

export default App
