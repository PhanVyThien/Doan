import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import cookieCutter from 'cookie-cutter'
import Router from 'next/router'
import { toast, ToastContainer } from 'react-nextjs-toast'

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
  height:auto;
`;
const H6=styled.h6`
    color:red;
    height:50px;
`;
export const Login =({show,setShow,setShowRegister,setLoginstate})=>{
  const hide=()=> {
    setPassword("");
    setEmail("");
    setPassnoity("");
    setShow(false);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer");
  const [Passnoity,setPassnoity ]=useState("");

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    } else if (name == "role") {
      setRole(value);
    }
  };
  const handleSubmit = () => {
    setPassnoity("để coi đúng hôn");
    console.log(email);
    axios
      .post(
        "http://localhost:5035/users/login",
        { email, password, role },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(function (response) {
        cookieCutter.set('Acc', response.data.user._id);
        var k=false;
        if(response.data.user.role=='Manager'){
          k=true;
        }
        setLoginstate[0](setLoginstate[7](response.data.user.name,setLoginstate[2],setLoginstate[3],setLoginstate[4],setLoginstate[5],setLoginstate[6],k));
        setPassnoity("Đúng rồi");
        // if(response.data.user.role=='Customer'){
        //   setManger(true);
        // }
        hide();
      })
      .catch(function (error) {
        console.log(error);
        setPassnoity("Sai rồi");
      });
  };
  const Regis=()=>{
    hide();
    setShowRegister(true);
  }
  return <>
    {show ? (
      <Frame>
        <Loginform>
          <Headconten>Đăng nhập<Cancel onClick={()=>hide()}>X</Cancel></Headconten>
          <Div><TextBox  type="text"
              id="role"
              placeholder="Nhập email đăng nhập"
              required
              name="email"
              value={email}
              onChange={handleChange()}
              
              /></Div>
          <Div><TextBox  type="password"
              id="role"
              placeholder="nhập mật khẩu"
              required
              value={password}
              name="password"onChange={handleChange()}
              /></Div>
            
          <Div><Label style={{float: 'left',marginLeft: '50px'}}>quên mật khẩu?</Label><Label style={{float: 'right',marginRight: '54px'}} onClick={()=>Regis()}>Tạo tài khoản</Label></Div>
          <H6>{Passnoity}</H6>
          <Div><LoginButton onClick={handleSubmit}>Đăng nhập</LoginButton></Div>
          
        </Loginform>
      </Frame>
    ):null}
  </>
};