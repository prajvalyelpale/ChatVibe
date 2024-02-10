import '../App.css'
import logo from '../img/chatvibe-logo.png'
import Login from '../components/Authentication/Login.js'
import SignUp from '../components/Authentication/SignUp.js'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


function Homepage() {
  const history = useNavigate();
  console.log("Homepage")
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user)
    if (user) history("/chats");
  }, [history]);

  return (
    <div className="main-body">
      <div className='container-main'>
        <div className="chat-logo-main">
          <div className="chat-logo">
            <img src={logo} alt="LOGO" />
          </div>
        </div>
        <section class="main">
          <div class="form_wrapper">
            <input type="radio" class="radio" name="radio" id="login" checked />
            <input type="radio" class="radio" name="radio" id="signup" />
            <div class="tile">
              <h3 class="login">Login Form</h3>
              <h3 class="signup">Signup Form</h3>
            </div>

            <label class="tab login_tab" for="login">
              Login
            </label>

            <label class="tab signup_tab" for="signup">
              SignUp
            </label>
            <span class="shape"></span>
            <div class="form_wrap">
              <Login />
              <SignUp />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Homepage