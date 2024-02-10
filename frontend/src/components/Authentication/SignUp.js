import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import axios from 'axios';

const SignUp = () => {

  
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const toast=useToast();
  const history = useNavigate();

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {

      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-vibe");
      data.append("cloud_name", "dhpf32w53");
      fetch("https://api.cloudinary.com/v1_1/dhpf32w53/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };


  const submitHandler = async () => {
    setPicLoading(true);
    
   
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        variant: "subtle", // Use "subtle" variant for similar background behavior
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

 

  
  return (
    <div class="form_fild signup_form" style={{height:'200px'}}>
      <div class="input_group">
        <input type="text" class="input" id='name' placeholder="Name" onChange={(e)=>{setName(e.target.value)}} required />
      </div>
      <div class="input_group">
        <input type="email" id='email' class="input" placeholder="Email Address" onChange={(e) => { setEmail(e.target.value) }}  required />
      </div>
      <div class="input_group">
        <input type="password" id='password' class="input" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
      </div>

      <div class="input_group">
        <input type="password" id='confirmpassword' class="input" placeholder="Confirm Password" onChange={(e) => { setConfirmpassword(e.target.value) }} />
      </div>
      <div class="input_group">
        <input isLoading={picLoading} type="file" id='profile-pic' accept='image/*' class="input" placeholder="Profile Picture" onChange={(e) => {  postDetails(e.target.files[0]) }} />
      </div>

      <input type="submit" onClick={() => {setTimeout(submitHandler, 100);} } class="btn" value="Signup" />

    </div>
  )
}

export default SignUp;