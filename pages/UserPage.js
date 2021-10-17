import styled from "styled-components";
import Frame from "../components/Frame";
import axios from "axios";
import React, { useState } from 'react';
import cookies from 'next-cookies'
import { set } from "js-cookie";
import Router from 'next/router'

const Background = styled.div`
    background-color: #e7e7e7;
    height:auto;
    padding-top:20px ;
    padding-bottom:20px ;
`;
const Block=styled.div`
    height:auto;
    width: 60%;
    background-color:white;
    margin-left: 20%;
    border-radius:4px;
    border:0.5px solid grey;
    padding-bottom: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
`;
const Tittle=styled.header`
    height:50px;
    color: black;
    font-size:200%;
    text-align: center;
    border-bottom: 3px solid black;
`;
const Detail= styled.div`
    height:40px;
    width: 400px;
    background-color: transparent;
    margin-top:2px;
    padding-left:20px;
    display: flex;
`;
const Edit= styled.img`
    height:27px;
    width: 32px;
    margin-left:5px;
    cursor: pointer;
`;
const Blockk=styled.div`
    height:400px;
    width: 100%;
    background-color: transparent;
    border-radius:5px;
    padding-bottom: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
`;
const Table= styled.table`
    width:100%;
    height:100%;
    
`;
const Avartar=styled.img`
    width:300px;
    height:width;
    border: 3px solid black;
    margin-top: 47px;
`;
const Tdd=styled.td`
    text-align: center;
    border-bottom: 0.5px solid #dbd8d8;
    height:40px;
`;
const Td=styled.td`
    text-align: center;
    height:40px;
    margin:5px;
`;
const Droper=styled.ul`
    opacity: 0%;
    position: absolute;
    width: auto;
    list-style: none;
    display: inline-block;
    pointer-events: none;
`;
const Options=styled.li`
    text-align:center;
    background-color: #f1f1f1;
    height:30px;
`;
const ButtonMoreProd=styled.button`
    border:0px;
    background-color: transparent;
    transition: all 0.2s ease-in-out;
    height: 100%;
    &:hover {
        background-color: #f1f1f1;
    }
    &:hover .Drop{
        opacity: 100%;
        transition: opacity 0.4s ease-in-out;
        transform: translate(-28px,-6px);
    }
`;
const getuser = (Id) => {
    const [re,setre]=useState('loading...');
    axios
      .get(
        "http://localhost:5035/users/"+Id,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(function (response) {
        console.log(response.data.name);
        setre(response.data);
      })
      .catch(function (error) {
        console.log(error);
      }); 
    return re;
  };
const GetProducname = (Id) => {
    const [re,setre]=useState('Loading...');
    axios
      .get(
        "http://localhost:5035/courses/"+Id,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(function (response) {
        setre(response.data.Name);
        console.log('e');
      })
      .catch(function (error) {
        console.log(error);
      });
      return re;
  };
//   useEffect(() => {
//     const ourRequest = Axios.CancelToken.source() // <-- 1st step
//     const [re,setre]=useState('Loading...');
//     const GetProducname = async (Id) => {
//       try {
//         const response = await Axios.get("http://localhost:5035/courses/"+Id, {
//           cancelToken: ourRequest.token, // <-- 2nd step
//         })
//         setre(response.data.Name);
//         setPost(response.data)
//         setIsLoading(false)
//       } catch (err) {
//         console.log('There was a problem or request was cancelled.')
//       }
//       return re;
//     }
//     fetchPost()
  
//     return () => {
//       ourRequest.cancel() 
//     }
//   }, [])
function Idfilter(arr,id){
    // var re=[];
    // for(var i=0;i<arr.length;i++){
    //     if(arr[i].userId==id){
    //         re.push(arr[i]);
    //     }
    //     console.log(arr[i].userId+' '+id);
    // }
    // return re;
    return arr;
}
// export const getStaticPaths = async () => {
//     const res = await fetch("http://localhost:5035/users");
//     const data = await res.json();
  
//     const paths = data.map((item) => {
//       return {
//         params: {
//           id: item._id.toString(),
//         },
//       };
//     });
//     return {
//       paths,
//       fallback: false,
//     };
//   };
  
//   export const getStaticProps = async (context) => {
//     const id = context.params.id;
//     const res = await fetch("http://localhost:5035/users/" + id);
//     const data = await res.json();
//     return {
//       props: {
//         user: data,
//       },
//     };
//   };
const EditBar=styled.input`
    width:200px;
    height:30px;
`;
const SaveButton=styled.button`
    height:30px;
    width:40px;
    border-radius: 4px;
    background-color: #098b3f;
    border:none;
`;
export default function UserPage({data}){
    var Dv1 = data[0].name;
    var Dv2 = data[0].email;
    var Dv3 = data[0].role;

    const ShowMode=(title)=>{
        return <h5>{title}</h5>;
    }
    function UpdateCloud(dataa){
        console.log(dataa);
        axios
            .post(
            "http://localhost:5035/users/"+dataa._id,
            dataa,
            {
                headers: { "Content-Type": "application/json" },
            }
            )
            .then(function (response) {
            console.log(response);
            cookieCutter.set('Acc', response.data.user._id);
            setLoginstate[0](setLoginstate[7](response.data.user.name,setLoginstate[2],setLoginstate[3],setLoginstate[4],setLoginstate[5],setLoginstate[6]));
            hide();
            })
            .catch(function (error) {
            console.log('aa');
            console.log(error);
            setvalidatemessage("Email đã được sử dụng");
            });
    }
    const Update=(up)=>{
        if(up.name=="name"){
            data[0].name=Dv1;
            setD1([ShowMode(data[0].name)]);
           // UpdateCloud(data[0]);
        }else if(up.name=="email"){
            data[0].email=Dv2;
            setD2([ShowMode('G-mail: '+data[0].email)]);
            console.log(data[0]);
           // UpdateCloud(data[0]);
        }else{
            data[0].role=Dv3;
            setD3([ShowMode('Vai trò: '+data[0].role)]);
           // UpdateCloud(data[0]);
        }
    }
    const [btnsave,setbtnsave]=useState(null);
    

    const btnEdit=(onclick)=>{
        return <Edit src='imgs/Edit.jpg' onClick={onclick}></Edit>;
    }
    
    const [D1,setD1]=useState([ShowMode(data[0].name)]);
    const [D2,setD2]=useState([ShowMode('G-mail: '+data[0].email)]);
    const [D3,setD3]=useState([ShowMode('Vai trò: '+data[0].role)]);

    const [E1,setE1]=useState(btnEdit(()=>setD1(EditMode(data[0].name,"name",{value: Dv1,name:"name"}))));
    const [E2,setE2]=useState(btnEdit(()=>setD2(EditMode(data[0].email,"email",{value: Dv2,name:"email"}))));
    const [E3,setE3]=useState(btnEdit(()=>setD3(EditMode(data[0].role,"role",{value: Dv3,name:"role"}))));

    const HandleChange=()=>(e)=>{
        if(e.target.name=="name"){
           Dv1=e.target.value;
            setD1(EditMode(e.target.value,"name",{value: Dv1,name:"name"}));
        }else if(e.target.name=="email"){
            Dv2=e.target.value;
            setD2(EditMode(e.target.value,"email",{value: Dv2,name:"email"}));
        }else{
            Dv3=e.target.value;
            setD3(EditMode(e.target.value,"role",{value: Dv3,name:"role"}));
            
        }
    }
    const EditMode=(title,name,up)=>{
         Dv1 = data[0].name;
         Dv2 = data[0].email;
         Dv3 = data[0].role;
        return [<EditBar value={title} name={name} onChange={HandleChange()}/>,<SaveButton onClick={()=>Update(up)}>Lưu</SaveButton>];
    }
    
    return (
        <Frame data={data[0].name}>
            <Background>
                <Block>
                    <Table>
                        <tr>
                            <td>
                                <Blockk>
                                    <Tittle>
                                        Thông tin cá nhân
                                    </Tittle>
                                    <Detail>
                                        {D1[0]}
                                        {E1}
                                        {D1[1]}
                                    </Detail>
                                    <Detail>
                                        {D2[0]}
                                        {E2}
                                        {D2[1]}
                                    </Detail>
                                    <Detail>
                                        {D3[0]}
                                        {E3}
                                        {D3[1]}
                                    </Detail>
                                    
                                </Blockk>
                                {btnsave}
                            </td>
                            <td>
                                <Blockk>
                                    <Avartar src={"http://localhost:5035/upload/images/" + data[0].avatar} />
                                </Blockk>
                            </td>
                        </tr>
                    </Table>
                </Block>
                <Block >
                    <Tittle>
                        Lịch sử mua hàng
                    </Tittle>
                    <Table>
                        <tr>
                            <Tdd><strong>Mã đơn hàng</strong></Tdd>
                            <Tdd><strong>Trạng thái</strong></Tdd>
                            <Tdd><strong>Hàng hóa</strong></Tdd>
                            <Tdd><strong>Giá tổng giá</strong></Tdd>
                            <Tdd><strong>Ngày thanh toán</strong></Tdd>
                        </tr>
                        {(Idfilter(data[1],data[0]._id)).map((item)=>(
                            <tr>
                                <Tdd>{item._id}</Tdd>
                                <Tdd>{item.Status}</Tdd>
                                <Tdd>
                                    <ButtonMoreProd>{((item.Products)[0].courseName)}
                                        <Droper className='Drop'>
                                            {(item.Products).map((iitem)=>(
                                                <Options>
                                                    <Table>
                                                        <tr>
                                                            <Td>
                                                                <strong>Tên:</strong> {(iitem.courseName)}
                                                            </Td>
                                                            <Td>
                                                                <strong>Số lượng:</strong> {iitem.quantity}
                                                            </Td>
                                                            <Td>
                                                                <strong>Giá/1:</strong> {iitem.unitPrice}
                                                            </Td>
                                                        </tr>
                                                    </Table>
                                                </Options>
                                            ))}
                                            
                                        </Droper>
                                    </ButtonMoreProd>
                                </Tdd>
                                <Tdd>{item.TotalPrice}</Tdd>
                                <Tdd>{item.BillDate}</Tdd>
                            </tr>
                        ))}
                    </Table>
                </Block>
            </Background>
        </Frame>
    );
}
UserPage.getInitialProps = async (ctx) => {
    const res11 = await fetch("http://localhost:5035/bills");
    var json11 = await res11.json();
    for(var i=0;i<json11.length;i++) {
        for(var j=0;j<(json11[i].Products).length;j++) {
            var courseId=(json11[i].Products)[j].courseId;
            if((json11[i].Products)[j].courseId==undefined){
                courseId=(json11[i].Products)[j].product.id;
            }
            const res21 = await fetch("http://localhost:5035/courses/" +courseId);
            const json21 = await res21.json();
            if(!json21) {
                (json11[i].Products)[j].courseName="Không tồn tại";
                continue;
            }
            (json11[i].Products)[j].courseName=json21.Name;
        }
    }
    const {Acc} =cookies(ctx);
    const res21 = await fetch("http://localhost:5035/users/"+Acc);
    var json21 = await res21.json();

    return { data: [json21,json11] };
  };