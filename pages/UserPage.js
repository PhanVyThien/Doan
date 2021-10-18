import styled from "styled-components";
import Frame from "../components/Frame";
import axios from "axios";
import React, { useState } from 'react';
import cookies from 'next-cookies'
import { useRef } from 'react';
import {ChangePassword} from '../components/ChangePassword';
import {UpdateAddress} from '../components/UpdateAddress';
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
    function GetDate(fulltime){
        const dateTime=new Date(fulltime);
        
        return dateTime.toLocaleDateString();
    }
    // const [Dv1,setDv1] = useState('');
    // const [Dv2,setDv2] = useState('');
    // const [Dv3,setDv3] = useState('');
    const Dv = useRef([]);
    const ShowMode=(title)=>{
        return <h6>{title}</h6>;
    }
    function UpdateCloud(){
        axios
            .put(
                "http://localhost:5035/users/"+data[0]._id,
                {name:(Dv.current)[0],email:(Dv.current)[1],address:(Dv.current)[3]},
                {
                    headers: { "Content-Type": "application/json" },
                }
            )
            .then(function (response) {
                console.log('sussces');
            })
            .catch(function (error) {
                console.log('error');
                console.log(error);
            });
    }
    const Update=(up)=>{
        if(up.name=="name"){
            data[0].name=(Dv.current)[0];
            setD1([ShowMode((Dv.current)[0])]);
            UpdateCloud();
        }else if(up.name=="email"){
            data[0].email=(Dv.current)[1];
            setD2([ShowMode('G-mail: '+(Dv.current)[1])]);
            UpdateCloud();
        }else if(up.name=="address"){
            data[0].address=(Dv.current)[3];
            setD4([ShowMode('Địa chỉ: '+(Dv.current)[3])]);
            UpdateCloud();
        }else if(up.name=="createDate"){
            data[0].createDate=(Dv.current)[4];
            setD5([ShowMode('Ngày tạo: '+(Dv.current)[4])]);
            UpdateCloud();
        }
    }
    const [btnsave,setbtnsave]=useState(null);
    

    const btnEdit=(onclick)=>{
        return <Edit src='imgs/Edit.jpg' onClick={onclick}></Edit>;
    }
    //show modal
    const [showChangePass,setshowChangePass]=useState(false);
    const [showChangeaddress,setshowChangeaddress]=useState(false);

    const [D1,setD1]=useState([ShowMode(data[0].name)]);
    const [D2,setD2]=useState([ShowMode('G-mail: '+data[0].email)]);
    const [D3,setD3]=useState([ShowMode('Vai trò: '+data[0].role)]);
    const [D4,setD4]=useState([ShowMode('Địa chỉ: '+data[0].address)]);
    const [D5,setD5]=useState([ShowMode('Ngày tạo: '+GetDate(data[0].createDate))]);
    const [D6,setD6]=useState([ShowMode('Mật khẩu: **********')]);

    const [E1,setE1]=useState(btnEdit(()=>setD1(EditMode(data[0].name,"name",{value: (Dv.current)[0],name:"name"}))));
    const [E2,setE2]=useState(btnEdit(()=>setD2(EditMode(data[0].email,"email",{value: (Dv.current)[1],name:"email"}))));
    const [E3,setE3]=useState(btnEdit(()=>setD3(EditMode(data[0].role,"role",{value: (Dv.current)[2],name:"role"}))));
    const [E4,setE4]=useState(btnEdit(()=>setshowChangeaddress(true)));
    const [E6,setE6]=useState(btnEdit(()=>setshowChangePass(true)));
    //const [E5,setE5]=useState(btnEdit(()=>setD5(EditMode(data[0].createDate,"createDate",{value: (Dv.current)[4],name:"createDate"}))));

    function D4Do(vv){
        setD4(vv);
    }

    const HandleChange=()=>(e)=>{
        if(e.target.name=="name"){
            (Dv.current)[0]=e.target.value;
            console.log((Dv.current)[0]);
            setD1(Change(e.target.value,"name",{value: (Dv.current)[0],name:"name"}));
        }else if(e.target.name=="email"){
            (Dv.current)[1]=e.target.value;
            console.log((Dv.current)[1]);
            setD2(Change(e.target.value,"email",{value: (Dv.current)[2],name:"email"}));
        }else if(e.target.name=="address"){
            (Dv.current)[3]=e.target.value;
            console.log((Dv.current)[3]);
            setD4(Change(e.target.value,"address",{value: (Dv.current)[3],name:"address"}));
        }else if(e.target.name=="createDate"){
            (Dv.current)[4]=e.target.value;
            console.log((Dv.current)[4]);
            setD4(Change(e.target.value,"createDate",{value: (Dv.current)[4],name:"createDate"}));
        }
    }
    const Change=(title,name,up)=>{
       return [<EditBar value={title} name={name} onChange={HandleChange()}/>,<SaveButton onClick={()=>Update(up)}>Lưu</SaveButton>];
   }
    const EditMode=(title,name,up)=>{
        (Dv.current)=([data[0].name,data[0].email,data[0].role,data[0].address,data[0].createDate]);
        return [<EditBar value={title} name={name} onChange={HandleChange()}/>,<SaveButton onClick={()=>Update(up)}>Lưu</SaveButton>];
    }
    
    return (
        <Frame data={data[0].name}>
            <ChangePassword show={showChangePass} setShow={setshowChangePass} emaill={data[0].email}/>
            <UpdateAddress show={showChangeaddress} setShow={setshowChangeaddress} idd={data[0]._id} previusAddress={data[0].address} setStatic={D4Do}></UpdateAddress>
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
                                    </Detail>
                                    <Detail>
                                        {D4[0]}
                                        {E4}
                                        {D4[1]}
                                    </Detail>
                                    <Detail>
                                        {D5[0]}
                                    </Detail>
                                    <Detail>
                                        {D6[0]}
                                        {E6}
                                        {D6[1]}
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
    const {Acc} =cookies(ctx);
    const res21 = await fetch("http://localhost:5035/users/"+Acc);
    var json21 = await res21.json();

    const res11 = await fetch("http://localhost:5035/users/"+Acc+"/bills");
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
    

    return { data: [json21,json11] };
  };