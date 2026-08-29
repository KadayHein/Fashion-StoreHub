import React from 'react'
import style from './../../service-module/global-util/button-input.module.css';
import { ArrowBackRounded, ArrowForwardRounded } from '@mui/icons-material';
import { useCheckoutContext } from '@/app/fashion/clientstore/checkout/layout';

export default function StepoverButton() {

  const { nextstep, backstep } = useCheckoutContext();
    
  return (
    <>
    <button className={`${style.stepbtn} ${style.disabled}`} onClick={backstep ?? undefined}>
        <span className={`${style.text} ${style.left}`}>Back</span>
        <span className={`${style.icon} ${style.left}`}>
            <ArrowBackRounded width={30}/>
        </span>
    </button>
    <button className={`${style.stepbtn} ${style.success}`} onClick={nextstep ?? undefined}>
        <span className={`${style.text} ${style.right}`}>Next</span>
        <span className={`${style.icon} ${style.right}`}>
            <ArrowForwardRounded width={30}/>
        </span>
    </button>
    </>
  )
}
