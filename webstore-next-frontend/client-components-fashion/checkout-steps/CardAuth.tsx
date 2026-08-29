import React, { useState } from 'react'
import radiostyle from './../../service-module/global-util/radio-input.module.css';
import Image from 'next/image';
import { Button, Stack } from '@mui/material';
import { ArrowBackRounded, CheckCircleRounded } from '@mui/icons-material';
import { enqueueSnackbar } from 'notistack';
import { useAppTranslation } from '@/service/customHooks/useAppTranslation';
import { PaymentIconSet } from '@/service/svgIconUtils';
import { useCheckoutContext } from '@/app/[locale]/fashion/clientstore/checkout/layout';

export default function CardAuth() {

  const { selectedPayment, setSelectedPayment, nextstep, backstep } = useCheckoutContext();

  const { checkout } = useAppTranslation();

  const [selectedTransferType, setSelectedTransferType] = useState<number>(1);

  const transferType =
    [
      {
        title: checkout("payment.mobileWallet"),
        value: 1
      },
      {
        title: checkout("payment.bankTransfer"),
        value: 2
      },
      {
        title: checkout("payment.cardPayment"),
        value: 3
      },
      {
        title: checkout("payment.cashOnDelivery"),
        value: 4
      }
    ]

  const mobilePays =
    [
      {
        title: "Paypal",
        value: 1,
        icon: PaymentIconSet.paypal
      },
      {
        title: "Apple Pay",
        value: 2,
        icon: PaymentIconSet.applepay
      },
      {
        title: "Amazon Pay",
        value: 3,
        icon: PaymentIconSet.amazonpay
      },
      {
        title: "Google Pay",
        value: 4,
        icon: PaymentIconSet.googlepay
      },
      {
        title: "PayPay",
        value: 5,
        icon: PaymentIconSet.paypay
      },
      {
        title: "Rakuten Pay",
        value: 6,
        icon: PaymentIconSet.rakutenpay
      }
    ]

  const bankTransfer = [
    {
      title: "Yuucho Bank",
      value: 7,
      icon: PaymentIconSet.yuuchobank
    },
    {
      title: "Seven Bank",
      value: 8,
      icon: PaymentIconSet.sevenbank
    }
  ]

  const cardPayment = [
    {
      title: "Visa Card",
      value: 9,
      icon: PaymentIconSet.visa
    },
    {
      title: "Mastercard",
      value: 10,
      icon: PaymentIconSet.mastercard
    },
  ]

  const confirmPayment = () => {
    if (selectedPayment) nextstep()
    else enqueueSnackbar(checkout("payment.selectAtLeastOne"), { variant: "warning" });
  }

  return (
    <div className="flex flex-wrap justify-center w-full">
      <div className={radiostyle.rippleRadio}>
        {

          transferType && transferType.map(transtype => (
            <label key={transtype.value} className={radiostyle.radio}>
              <input name="transfertype" type="radio" checked={transtype.value === selectedTransferType}
                onChange={() => setSelectedTransferType(transtype.value)} />
              <span className={radiostyle.name}>{transtype.title}</span>
            </label>
          ))
        }
      </div>

      <div className={radiostyle.radioFlexbox}>
        {
          selectedTransferType == 1 && mobilePays.map(card => (
            <label key={card.value} className={`${radiostyle.radioButton} ${radiostyle.showOn}`}>
              {card.icon}
              <small className={radiostyle.showOnHover}>{card.title}</small>
              <input type="radio" name="mobilepay" value={card.value}
                checked={selectedPayment?.value === card.value}
                onChange={() => setSelectedPayment({ name: card.title, value: card.value, icon: card.icon })}></input>
              <span className={radiostyle.radioMark}></span>
            </label>
          ))
        }
        {
          selectedTransferType == 2 && bankTransfer.map(card => (
            <label key={card.value} className={`${radiostyle.radioButton} ${radiostyle.showOn}`}>
              {card.icon}
              <input type="radio" name="banktransfer" value={card.value}
                checked={selectedPayment?.value === card.value}
                onChange={() => setSelectedPayment({ name: card.title, value: card.value, icon: card.icon })}></input>
              <span className={radiostyle.radioMark}></span>
            </label>
          ))
        }
        {
          selectedTransferType == 3 && cardPayment.map(card => (
            <label key={card.value} className={`${radiostyle.radioButton} ${radiostyle.showOn}`}>
              {card.icon}
              <small className={radiostyle.showOnHover}>{card.title}</small>
              <input type="radio" name="cardpayment" value={card.value}
                checked={selectedPayment?.value === card.value}
                onChange={() => setSelectedPayment({ name: card.title, value: card.value, icon: card.icon })}></input>
              <span className={radiostyle.radioMark}></span>
            </label>
          ))
        }
      </div>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ width: "100%", mt: 3 }}>
        <Button fullWidth variant="outlined" size="large"
          startIcon={<ArrowBackRounded />} onClick={backstep}>
          {checkout("buttons.back")}
        </Button>

        <Button fullWidth variant="contained" size="large"
          endIcon={<CheckCircleRounded />} onClick={confirmPayment}>
          {checkout("buttons.confirm")}
        </Button>
      </Stack>
    </div>
  )
}
