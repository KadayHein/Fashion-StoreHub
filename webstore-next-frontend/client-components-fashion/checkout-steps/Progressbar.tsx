import { CheckoutContext } from '@/app/fashion/clientstore/checkout/layout';
import React, { useContext, useEffect, useState } from 'react'
import style from './../../service-module/global-util/progress-bar.module.css';


export default function Progressbar() {
    const {step, maxstep} = useContext(CheckoutContext);
    const [barwidth, setBarwidth] = useState<number>(0);

    const flows = 
    [
        {
            title: "Authentication",
            step: 0
        },
        {
            title: "Shipping",
            step: 1
        },
        {
            title: "Review",
            step: 2
        },
        {
            title: "Payment",
            step: 3
        },
        {
            title: "Complete",
            step: 4
        }
    ];

    useEffect(() => {
        setBarwidth((step / maxstep) * 100);
    },[step]);

  return (
    <section className={style.checkoutContainer}>
        <div className={style.mainWrapper}>
            <div className={style.statusBar}>
                <span className={style.pBar} style={{ width: `${barwidth}%` }}></span>
                {
                    flows && flows.map(flow => (
                        <div key={flow.step} className={`${style.node} n${flow.step} nConfirm${flow.step} ${flow.step <= step ? style.done : ""}`} >
                            <div className={`${style.main} m${flow.step} nConfirm${flow.step} ${flow.step <= step ? style.done : ""}`}></div>
                            <span className={` ${style.text} t${flow.step} nConfirm${flow.step} ${flow.step <= step ? style.done : ""}`}>{flow.title}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    </section>
  )
}
