import Footer from './Footer'
import Mainmenu from './Mainmenu'
export default function Frame ({children,data,isManage}){
  return(
    <div>
      <Mainmenu Acc={data} isManage={isManage}/>
        {children}
      <Footer/>
    </div>
)
}



