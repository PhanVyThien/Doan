

export default function Home({data}) {
  return (
    <div>
      <a href="/LandingPage">hi</a>
      <a href="/Statictical">hi</a>
    </div>
  )
}
// Home.getInitialProps = async (ctx) => {
//   const res11 = await fetch("http://localhost:5035/courses/top3/latest/male");
//   const json11 = await res11.json();
//   const res12 = await fetch("http://localhost:5035/courses/top3/latest/female");
//   const json12 = await res12.json();
//   const res13 = await fetch("http://localhost:5035/courses/top3/latest/kid");
//   const json13 = await res13.json();

//   const res21 = await fetch("http://localhost:5035/courses/topSalerForMale");
//   const json21 = await res21.json();
//   const res22 = await fetch("http://localhost:5035/courses/topSalerForFemale");
//   const json22 = await res22.json();
//   const res23 = await fetch("http://localhost:5035/courses/topSalerForKid");
//   const json23 = await res23.json();
  

//   const {Acc} =cookies(ctx);
//   const res31 = await fetch("http://localhost:5035/users/"+Acc);
//   const json31 = await res31.json();

//   return { data: [[json11,json12,json13],[json21,json22,json23],json31.name] };
// };