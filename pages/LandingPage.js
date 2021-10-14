import Newproducts from './Newproducts';
import OnsaleProducts from './OnsaleProducts';
import BackgroundStory from './BackgroundStory';
import Frame from './Frame';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Navbarmenu from './Navbarmenu/index';
import OnsSale_off from './OnSale_off';
import Registions from './Registions/index';
import Statictical from './Statictical';
import cookies from 'next-cookies'
import UserPage from './UserPage';
export default function LandingPage ({data}){
  {console.log(data[2])}
  return(
      <Frame data={(data[2])}>
        <BackgroundStory/>
        <Newproducts data={data[0]}/>
        <OnsaleProducts data={data[1]}/>
      </Frame>
)
}
LandingPage.getInitialProps = async (ctx) => {
  var k=1000;
  while(k>0){
      k--;
  }
  const res11 = await fetch("http://localhost:5035/courses/top3/latest/male");
  const json11 = await res11.json();
  const res12 = await fetch("http://localhost:5035/courses/top3/latest/female");
  const json12 = await res12.json();
  const res13 = await fetch("http://localhost:5035/courses/top3/latest/kid");
  const json13 = await res13.json();

  const res21 = await fetch("http://localhost:5035/courses/topSalerForMale");
  const json21 = await res21.json();
  const res22 = await fetch("http://localhost:5035/courses/topSalerForFemale");
  const json22 = await res22.json();
  const res23 = await fetch("http://localhost:5035/courses/topSalerForKid");
  const json23 = await res23.json();

  const {Acc} =cookies(ctx);
  const res31 = await fetch("http://localhost:5035/users/"+Acc);
  var json31 = await res31.json();
 
  return { data: [[json11,json12,json13],[json21,json22,json23],json31.name] };
};




