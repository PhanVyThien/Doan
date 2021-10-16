import styles from '../styles/Home.module.css'

// function setimgs(tab){
//     var re="imgs/img"+tab+".jpg";
//     return re;
// }
// function setnames(tab){
//     var re="Name "+tab;
//     return re;
// }
// function setPrice(tab){
//     var re=<span>${tab*10}</span>
//     return re;
// }
function thefuckingunmutilanable(name){
    var re=[];
    var i=0;
    var j=0;
    for(;name.length>i;i++){
        if(i-j<17){
            continue;
        }
        if(name[i]!=' '){
            i++;
            continue;
        }
        if(name.length<=i) break;
        re.push(name.substring(j,i));
        j=i;
    }
    re.push(name.substring(j,i));
    if(re.length>2){
        re[1]+='...';
    }
    return (
        <div>{([re[0],re[1]]).map((item)=>(
            <h5>{item}</h5>
        ))}
        </div>
    );
}
function mainn(data){
    
}

export default function Newproduct ({data}) {
    return <div className={styles.producsdisplay}>
                <ul>{data.map((item)=>(
                    <li>
                        <a className={styles.product}>
                            <img className={styles.pro} src={"http://localhost:5035/upload/images/"+item.Image}/>
                            <h4 className={styles.produtName}>{thefuckingunmutilanable(item.Name)}</h4>
                            <h4>
                                ${item.Price}
                            </h4>
                            <div className={styles.cartbar}><button>Mua</button></div>
                        </a>
                    </li>
                  ))}
                    <li>
                        <a className={styles.more}>
                            <img className={styles.pro} src="imgs/moreproducts.jpg"/>
                            <button className={styles.morebutton}>
                                Xem thêm
                            </button>
                        </a>
                    </li>
                </ul>
            </div>
};