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
const SelectBox=styled.select`
  height:40px;
  width:300px;
  border-radius: 6px;
  font-size: 120%;
  padding-left: 8px;
  border: 1px solid black;
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
export const UpdateAddress =({show,setShow,idd,previusAddress,setStatic})=>{
    function getTilMeet(stringg,charr){
        var re='';
        for(var i=0;i<stringg.length;i++){
            if(charr==stringg[i])break;
            re+=stringg[i];
        }
        return re;
    }
    function MeetThenGet(stringg,charr){
        var re='';
        var gg=false;
        for(var i=0;i<stringg.length;i++){
            if(charr==stringg[i]&&!gg){
                gg=true;
                i++;
                continue;
            }
            if(charr==stringg[i]||gg==true){
                re+=stringg[i];
            }
            
        }
        return re;
    }
    const [Province, setProvince] = useState(getTilMeet(previusAddress,','));
    const [ExactLocal, setExactLocal] = useState(MeetThenGet(previusAddress,','));
    const [validatemessage, setvalidatemessage] = useState("");
    const hide=()=>{
        setShow(false);
        setProvince("");
        setvalidatemessage("");
        setExactLocal("");
    };
    const handleChange = () => (e) => {
      const name = e.target.name;
      const value = e.target.value;
      console.log(Province);
      if (name == "Privince") {
        setProvince(value);
      } else if (name == "ExactLocal") {
        setExactLocal(value);
      }
      
    };
    const handleSubmit = () => {
    console.log(Province+', '+ExactLocal);
    axios
      .put(
        "http://localhost:5035/users/"+idd,
        { address:Province+', '+ExactLocal },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(function (response) {
        console.log(response);
        setvalidatemessage("C???p nh???t th??nh c??ng");
        setStatic([<h6>{'?????a ch???: '+Province+', '+ExactLocal}</h6>]);
        hide();
      })
      .catch(function (error) {
        console.log(error);
        setvalidatemessage("???? x???y ra l???i, th??? l???i sau!");
      });
    };
  return <>
    {show ? (
      <Frame>
        <Loginform>
          <Headconten>?????a ch???<Cancel onClick={()=>hide()}>X</Cancel></Headconten>
          <Div>
                <SelectBox  type="text"
                    id="Privince"
                    name="Privince"
                    value={Province}
                    onChange={handleChange()}>
                <option value="B??nh D????ng">B??nh D????ng</option>
                <option value="T??y Ninh">T??y Ninh</option>
                <option value="Thanh H??a">Thanh H??a</option>
                <option value="B??nh Ph?????c">B??nh Ph?????c</option>
                <option value="HCTp.HCMM">Tp.HCM</option>
                <option value="H?? N???i">H?? N???i</option>
                <option value="Lai Ch??n">Lai Ch??u</option>
                <option value="C?? Mau">C?? Mau</option>
                <option value="Gia Lai">Gia Lai</option>
                <option value="Hu???">Hu???</option>
                <option value="???? L???t">???? L???t</option>
                <option value="T??y Nguy??n">T??y Nguy??n</option>
                <option value="D???k L???k">D??k l??k</option>
                </SelectBox>
              </Div>
          <Div>
                <TextBox  type="text"
                    id="ExactLocal"
                    name="ExactLocal"
                    value={ExactLocal}
                    placeholder="Nh???p ?????a ch???"
                    onChange={handleChange()}/>
            </Div>
          <H6>{validatemessage}</H6>
          <Div><LoginButton onClick={handleSubmit} >C???p nh???t</LoginButton></Div>
        </Loginform>
      </Frame>
    ):null}
  </>
};