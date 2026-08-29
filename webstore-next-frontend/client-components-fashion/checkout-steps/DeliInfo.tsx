import React, { useState } from 'react'
import formstyle from './../../service-module/global-util/form-input.module.css';
import { useCheckoutContext } from '@/app/[locale]/fashion/clientstore/checkout/layout';
import { CloseIcon, InfoIconSet } from '@/service/svgIconUtils';
import { Button, Stack } from '@mui/material';
import { ArrowBackRounded, CheckCircleRounded } from '@mui/icons-material';
import { useAppTranslation } from '@/service/customHooks/useAppTranslation';


interface DeliInfo {
    customerName: string,
    customerEmail: string,
    contactNumber: string,
    postalcode: string,
    prefecture: string,
    cityWard: string,
    townBlock: string,
    buildingRoom: string
}

export default function DeliInfo() {
    const { setDeliInfo, nextstep, backstep } = useCheckoutContext();

    const { checkout } = useAppTranslation()

    const [info, setInfo] = useState<DeliInfo>({
        customerName: "",
        customerEmail: "",
        contactNumber: "",
        postalcode: "",
        prefecture: "",
        cityWard: "",
        townBlock: "",
        buildingRoom: ""
    });

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onResetHandler = (attrName: string) => {
        setInfo((prev) => ({
            ...prev,
            [attrName]: "",
        }));
    };

    const infoboxes =
        [
            {
                title: checkout("infobox.customerName"),
                name: "customerName",
                value: info.customerName,
                icon: InfoIconSet.person
            },
            {
                title: checkout("infobox.customerEmail"),
                name: "customerEmail",
                value: info.customerEmail,
                icon: InfoIconSet.email
            },
            {
                title: checkout("infobox.contactNumber"),
                name: "contactNumber",
                value: info.contactNumber,
                icon: InfoIconSet.phone
            },
            {
                title: checkout("infobox.postalCode"),
                name: "postalCode",
                value: info.postalcode,
                icon: InfoIconSet.location
            },
            {
                title: checkout("infobox.prefecture"),
                name: "prefecture",
                value: info.prefecture,
                icon: InfoIconSet.map
            },
            {
                title: checkout("infobox.cityWard"),
                name: "cityWard",
                value: info.cityWard,
                icon: InfoIconSet.apartment
            },
            {
                title: checkout("infobox.townBlock"),
                name: "townBlock",
                value: info.townBlock,
                icon: InfoIconSet.house
            },
            {
                title: checkout("infobox.buildingRoom"),
                name: "buildingRoom",
                value: info.buildingRoom,
                icon: InfoIconSet.building
            }
        ]

    return (
        <div className='flex flex-wrap justify-around w-full py-5'>
            {
                infoboxes && infoboxes.map(box => (
                    <div key={box.title} className={`${formstyle.form} my-3`}>
                        <button>{box.icon}</button>
                        <input className={formstyle.input} name={box.name} placeholder={box.title}
                            value={box.value} onChange={onChangeHandler} required type="text"></input>
                        <button className={formstyle.reset} type="reset" onClick={() => onResetHandler(box.name)}>
                            <CloseIcon />
                        </button>
                    </div>
                ))
            }
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ width: "100%", mt: 3 }}>
                <Button fullWidth variant="outlined" size="large"
                    startIcon={<ArrowBackRounded />} onClick={backstep}>
                    {checkout("buttons.back")}
                </Button>

                <Button fullWidth variant="contained" size="large"
                    endIcon={<CheckCircleRounded />} onClick={nextstep}>
                    {checkout("buttons.confirm")}
                </Button>
            </Stack>
        </div>
    )
}
