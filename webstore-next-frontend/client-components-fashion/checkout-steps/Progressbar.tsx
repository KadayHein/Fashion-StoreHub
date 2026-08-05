import { CheckoutContext } from '@/app/fashion/clientstore/checkout/CheckoutContext';
import React, { useContext, useEffect, useState } from 'react'
import style from './../../service-module/global-util/progress-bar.module.css';
import { title } from 'node:process';


export default function Progressbar() {
    const {step, maxstep} = useContext(CheckoutContext);
    const [barwidth, setBarwidth] = useState<number>(0);

    const flows = 
    [
        {
            title: "Order Confirmation",
            step : 0
        },
        {
            title: "Authentication",
            step: 1
        },
        {
            title: "Shipping",
            step: 2
        },
        {
            title: "Review",
            step: 3
        },
        {
            title: "Payment",
            step: 4
        },
        {
            title: "Complete",
            step: 5
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
