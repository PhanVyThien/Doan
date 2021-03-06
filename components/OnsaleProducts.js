import OnsaleProduct from './OnsaleProduct'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
function k(tab){
    var a=styles.buttontrasperant;
    var b=styles.buttontrasperant;
    var c=styles.buttontrasperant;
    var e=0;
    if(tab==1){
        a=styles.buttonskyblue;
    }else if(tab==2){
        e=1;
        b=styles.buttonskyblue;
    }else if(tab==3){
        e=2;
        c=styles.buttonskyblue;
    }
    return [a,b,c,e];
}

export default function OnsaleProducts({data}){
    const [tab,settab] = useState(k(1));
    return (
        <div className={styles.center}>
            <h1>Bán chạy</h1>
            <div className={styles.centert}>
                <a className={tab[0]} tabIndex="1" onClick={()=>settab(k(1))}><h3>Quần áo Nam</h3></a>
                <a className={tab[1]} tabIndex="2" onClick={()=>settab(k(2))}><h3>Quần áo Nữ</h3></a>
                <a className={tab[2]} tabIndex="3" onClick={()=>settab(k(3))}><h3>Quần áo trai</h3></a>
            </div>
            <OnsaleProduct data={data[tab[3]]}/>
        </div>
    )
}


