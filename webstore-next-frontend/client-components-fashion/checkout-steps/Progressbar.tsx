import React, { useEffect, useState } from 'react'
import style from './../../service-module/global-util/progress-bar.module.css';
import { useCheckoutContext } from '@/app/[locale]/fashion/clientstore/checkout/CheckoutContext';
import { useAppTranslation } from '@/service/customHooks/useAppTranslation';


export default function Progressbar() {
    const {step, maxstep} = useCheckoutContext()
    const { checkout } = useAppTranslation()
    const [barwidth, setBarwidth] = useState<number>(0);

    const flows = 
    [
        {
            title: checkout("steps.orderConfirmation"),
            step : 0
        },
        {
            title: checkout("steps.shipping"),
            step: 1
        },
        {
            title: checkout("steps.authentication"),
            step: 2
        },
        {
            title: checkout("steps.payment"),
            step: 3
        },
        {
            title: checkout("steps.complete"),
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
