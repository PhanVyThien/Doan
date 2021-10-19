import React from "react";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import cookieCutter from 'cookie-cutter'
import Router from 'next/router'
const Frame=styled.div`
  width:100%;
  height:100%;
  display: flex;
  position: fixed;
  background-color: rgba(0,0,0,0.7);
  justify-content:center;
  font-family:times, "Times New Roman";
`;
const Loginform=styled.div`
  height:50%;
  width:30%;
  background-color: white;
  transform: translate(0px,30%);
  border-radius:10px;
`;
const TextBox=styled.input`
  height:40px;
  width:300px;
  border-radius: 6px;
  font-size: 120%;
  padding-left: 8px;
  border: 1px solid black;
`;
const Headconten=styled.header`
  font-size:200%;
  text-align: center;
  text-decoration: none;
  width:100%;
`;
const Label=styled.a`
  font-size:100%;
  text-align: center;
  text-decoration: none;
  color:blue;
  cursor:pointer;
`;
const Div=styled.div`
  text-align: center;
  margin-bottom: 20px;
`;
const LoginButton=styled.a`
  padding: 1rem 2rem;
  border-radius: 10px;
  background-color: skyblue;
  border: 0px;
  text-decoration: none;

  transition: all 0.2s ease-in-out;
  &:hover { 
    background-color: #2690d1;
  }
`;
const Cancel=styled.span`
  font-size:100%;
  float:right;
  width:50px;
  height:50px;
  position:absolute;
  background-color: black;
  border-radius:50px;
  color:white;
  transform:translate(150px,-70px);
  font-family: Andale Mono, monospace;
  cursor:pointer;
  &:hover{
    color: lightskyblue;
  }
`;
const DIV=styled.div`
  background-color: red;
`;
const H6=styled.h6`
    color:red;
    padding: 0.25rem 0;
    width: 100%;
    text-align: center;
`;
export const ChangePassword =({show,setShow,emaill})=>{
    const [email, setEmail] = useState(emaill);
    const [password, setPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [validatemessage, setvalidatemessage] = useState("");
    const hide=()=>{
        setShow(false);
        setPassword("");
        setEmail("");
        setvalidatemessage("");
        setShow(false);
    };
    const handleChange = () => (e) => {
      const name = e.target.name;
      const value = e.target.value;
      if (name == "name") {
        setName(value);
      } else if (name == "email") {
        setEmail(value);
      } else if (name == "password") {
        setPassword(value);
      } else if (name == "newpassword") {
        setNewPassword(value);
      }
      
    };
  function checkEmail(email) {
    var re = /\S+@\S+\.\S+/;
    if(!re.test(email)){
      setvalidatemessage("Định dạng email không hợp lệ");
    }
    return re.test(String(email).toLowerCase());
  }
  function checkPass(pass) {
    if(pass.length>5){
      return true;
    }
    else { 
     setvalidatemessage("-password có ít hơn 6 ký tự");
     return false;
    }
  }
  function staticcheck() {
    setvalidatemessage("Để kiểm tra định dạng cái");
     if(!checkPass(password)&&checkEmail(email))
     {
      return false;
     }
     setvalidatemessage("");
     return true;
  }
    const handleSubmit = () => {
    if(!staticcheck()){
      return;
    }

    //check Account and previus password
    axios
      .post(
        "http://localhost:5035/users/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(function (response) {
        //check susscess,update
            axios
            .put(
              "http://localhost:5035/users/"+response.data.user._id,
              {  password:newpassword },
              {
                headers: { "Content-Type": "application/json" },
              }
            )
            .then(function (response) {
              setvalidatemessage('cập nhật thành công');
              hide();
            })
            .catch(function (error) {
              console.log(error);
              setvalidatemessage('Cập nhật không thành công');
              hide();
            });
        hide();
      })
      .catch(function (error) {
        console.log(error);
        setvalidatemessage('Sai mật khẩu');
      });
    };
  return <>
    {show ? (
      <Frame>
        <Loginform>
          <Headconten>Đổi mật khẩu<Cancel onClick={()=>hide()}>X</Cancel></Headconten>
          <Div><TextBox  type="text"
              id="role"
              placeholder="Nhập email"
              required
              name="email"
              value={email}
              onChange={handleChange()}
              disabled="disabled"
              /></Div>
          <Div><TextBox  type="password"
              id="role"
              placeholder="Mật khẩu cũ"
              name="password"
              onChange={handleChange()}
              /></Div>
          <Div><TextBox  type="password"
              id="role"
              placeholder="Mật khẩu mới"
              name="newpassword"
              onChange={handleChange()}
              /></Div>
          <H6>{validatemessage}</H6>
          <Div><LoginButton onClick={handleSubmit} >Xác nhận</LoginButton></Div>
        </Loginform>
      </Frame>
    ):null}
  </>
};