import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import axios from 'axios';
//import { ChatState } from "../../Context/ChatProvider";



const Login = () => {
    
    const toast = useToast();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    //const { setUser } = ChatState(); 

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );

            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            //setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate('/chats');
            console.log("login successful!!!!!!!!!!!!!!!!!!!")
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };


  return(
      <>
          <div class="form_fild login_form">
              <div class="input_group">
                  <input type="email" id='email' class="input" placeholder="Email Address" onChange={(e) => { setEmail(e.target.value) }} required />
              </div>
              <div class="input_group">
                  <input type="password" id='password' class="input" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
              </div>

              <a href="#forgot" class="forgot">Forgot password?</a>

              <input isLoading={loading} type="submit" class="btn" value="Login" onClick={submitHandler} />

              <div class="not_mem">
                  <label for="signup">Not a member? <span> SignUp now</span></label>
              </div>
          </div>
      </>
  )
}

export default Login