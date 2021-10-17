import Newproducts from '../components/Newproducts';
import OnsaleProducts from '../components/OnsaleProducts';
import BackgroundStory from '../components/BackgroundStory';
import Frame from '../components/Frame';
import cookies from 'next-cookies'
import styled from 'styled-components';

const Body=styled.div`
    width: 90%;
    margin-left: 5%;
`;
export default function LandingPage ({data}){
  // {console.log(data[3])}
  return(
      <Frame data={(data[2])} isManage={(data[3])}>
        <BackgroundStory/>
        <Body>
          <Newproducts data={data[0]}/>
          <OnsaleProducts data={data[1]}/>
        </Body>
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

  var k=false;
  if(json31.role=='Manager'){
    k=true;
  }
  
  return { data: [[json11,json12,json13],[json21,json22,json23],json31.name,k] };
};




