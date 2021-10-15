import Footer from './Footer'
import Mainmenu from './Mainmenu'
export default function Frame ({children,data}){
  return(
    <div>
      <Mainmenu Acc={data}/>
        {children}
      <Footer/>
    </div>
)
}



