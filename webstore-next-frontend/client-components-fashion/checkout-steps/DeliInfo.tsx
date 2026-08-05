import React, { useEffect, useState } from 'react'
import formstyle from './../../service-module/global-util/form-input.module.css';

import { useCheckoutContext } from '@/app/fashion/clientstore/checkout/CheckoutContext';

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
    const { setHeader, setDeliInfo } = useCheckoutContext();
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

    useEffect(() => {
        setDeliInfo([]);
        setHeader("Delivery Information");
    }, [])

    // useEffect(() => {
    // },[info])

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
                title: "Customer Name",
                name: "customerName",
                value: info.customerName,
                icon: <svg fill="none" height="14" viewBox="0 0 15 14" width="15" xmlns="http://www.w3.org/2000/svg"><g fill="#d7e0ff" stroke="#4147d5" strokeWidth="1.5"><path d="m7.5 7c1.72589 0 3.125-1.39911 3.125-3.125s-1.39911-3.125-3.125-3.125-3.125 1.39911-3.125 3.125 1.39911 3.125 3.125 3.125z" strokeLinecap="round" strokeLinejoin="round" /><path d="m13.0482 10.5938c1.3399.8948.4995 2.6563-1.1117 2.6563h-8.87296c-1.61122 0-2.451567-1.7615-1.11168-2.6563 1.58765-1.06035 3.49571-1.67852 5.54815-1.67852s3.96049.61817 5.54819 1.67852z" /></g></svg>
            },
            {
                title: "Customer Email",
                name: "customerEmail",
                value: info.customerEmail,
                icon: <svg fill="none" height="15" viewBox="0 0 14 15" width="14" xmlns="http://www.w3.org/2000/svg"><path d="m7 10.2939c-1.51685 0-2.99287-.1212-4.41353-.283-.82074-.09353-1.50655-.69319-1.639828-1.50842-.134436-.8223-.196642-1.6731-.196642-2.84863s.062204-2.02628.196638-2.84854c.133282-.81522.819092-1.41489 1.639832-1.50837 1.42066-.1618 2.89668-.28303 4.41353-.28303 1.51686 0 2.99287.12123 4.4135.28303.8208.09348 1.5066.69315 1.6399 1.50837.1344.82226.1966 1.67301.1966 2.84854s-.0622 2.02633-.1966 2.84863c-.1333.81523-.8191 1.41489-1.6399 1.50842-1.42063.1618-2.89664.283-4.4135.283z" fill="#d7e0ff" /><g stroke="#4147d5" strokeLinejoin="round" strokeWidth="1.5"><path d="m13.1813 7.47579c.0465-.53355.0687-1.11983.0687-1.82195 0-1.17553-.0622-2.02628-.1966-2.84854-.1333-.81522-.8191-1.41489-1.6399-1.50836-1.42063-.16181-2.89664-.28304-4.4135-.28304-1.51685 0-2.99287.12123-4.41353.28304-.82074.09347-1.50655.69314-1.639832 1.50836-.134434.82226-.196638 1.67301-.196638 2.84854 0 1.17554.062206 2.02634.196642 2.84864.133278.81522.819098 1.41489 1.639838 1.50832.91379.1041 1.85048.1914 2.80621.2404" strokeLinecap="round" /><path d="m1.11719 1.90234 4.64479 3.66336c.72609.57267 1.75011.57288 2.47644.0005l4.64438-3.65995" /><path d="m10.75 8.5v5" strokeLinecap="round" /><path d="m8.25 11h5" strokeLinecap="round" /></g></svg>
            },
            {
                title: "Contact Number",
                name: "contactNumber",
                value: info.contactNumber,
                icon: <svg fill="none" height="15" viewBox="0 0 14 14" width="15" xmlns="http://www.w3.org/2000/svg"><g stroke="#4147d5" strokeWidth="1.5"><path d="m4.1428 4.16344c-.69857-.60867-1.7216-.49955-2.27189.24588-.08239.11161-.18164.24211-.31024.40298-.816003 1.02073-.816 2.49871.00451 3.51582.60571.75085 1.24079 1.50849 1.95073 2.21848.70994.7099 1.46758 1.345 2.21843 1.9507 1.01711.8205 2.4951.8205 3.51583.0045.18082-.1446.32279-.2515.44254-.339.72249-.5278.84499-1.5163.25988-2.19319-.26637-.30814-.54872-.60694-.82714-.90007-.38456-.40488-1.0447-.44993-1.46599-.08342-.07395.06433-.16796.14932-.29799.27122-1.16757-.6938-1.8752-1.41006-2.55634-2.55635.1241-.13237.21007-.22754.27497-.30226.36578-.42107.32104-1.07923-.08645-1.46008-.27882-.2606-.56153-.52313-.85085-.77521z" fill="#d7e0ff" strokeLinejoin="round" /><g strokeLinecap="round"><path d="m10.0909 6.20876c-.11128-.55621-.40791-1.07897-.88009-1.46749-.49126-.40422-1.08851-.59398-1.67826-.58033" /><path d="m13.1769 5.69884c-.2511-1.25526-.9205-2.43502-1.9861-3.31182-1.1087-.91224-2.4566-1.3405-3.78752-1.30967" /></g></g></svg>
            },
            {
                title: "Postal Code",
                name: "postalCode",
                value: info.postalcode,
                icon: <svg fill="none" height="15" viewBox="0 0 14 15" width="15" xmlns="http://www.w3.org/2000/svg"><g stroke="#4147d5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="m7.57761 13.7444c1.27531-1.1052 4.21939-4.0055 4.21939-7.22916 0-2.64933-2.14766-4.79704-4.79699-4.79704s-4.79704 2.14771-4.79704 4.79704c0 3.22366 2.94412 6.12396 4.21943 7.22916.33516.2904.82006.2904 1.15521 0z" fill="#d7e0ff" /><path d="m7.00001 8.19834c1.08512 0 1.96478-.87966 1.96478-1.96478s-.87966-1.96478-1.96478-1.96478-1.96478.87966-1.96478 1.96478.87966 1.96478 1.96478 1.96478z" fill="#fff" /></g></svg>
            },
            {
                title: "Prefecture",
                name: "prefecture",
                value: info.prefecture,
                icon: (
                    <svg fill="none" width="15" height="15" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2 2.5L5 1.5L9 3L12 2V11.5L9 12.5L5 11L2 12V2.5Z"
                            fill="#d7e0ff"
                            stroke="#4147d5"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M5 1.5V11"
                            stroke="#4147d5"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M9 3V12.5"
                            stroke="#4147d5"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                )
            },
            {
                title: "City / Ward",
                name: "cityWard",
                value: info.cityWard,
                icon: (
                    <svg fill="none" width="15" height="15" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                        <rect
                            x="2"
                            y="2"
                            width="10"
                            height="10"
                            rx="1"
                            fill="#d7e0ff"
                            stroke="#4147d5"
                            strokeWidth="1.5"
                        />
                        <path
                            d="M5 5H6M8 5H9M5 8H6M8 8H9M7 12V9"
                            stroke="#4147d5"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                )
            },
            {
                title: "Town / Block",
                name: "townBlock",
                value: info.townBlock,
                icon: (
                    <svg fill="none" width="15" height="15" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.5 10L7 2L11.5 10"
                            fill="#d7e0ff"
                            stroke="#4147d5"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                        />
                        <rect
                            x="4.5"
                            y="7"
                            width="5"
                            height="4"
                            fill="white"
                            stroke="#4147d5"
                            strokeWidth="1.5"
                        />
                        <path
                            d="M6.5 11V8.8H7.5V11"
                            stroke="#4147d5"
                            strokeWidth="1.2"
                        />
                    </svg>
                )
            },
            {
                title: "Building / Room",
                name: "buildingRoom",
                value: info.buildingRoom,
                icon: (
                    <svg fill="none" width="15" height="15" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                        <rect
                            x="3"
                            y="1.5"
                            width="8"
                            height="11"
                            rx="1"
                            fill="#d7e0ff"
                            stroke="#4147d5"
                            strokeWidth="1.5"
                        />
                        <path
                            d="M5 4H6M8 4H9M5 6H6M8 6H9M5 8H6M8 8H9"
                            stroke="#4147d5"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M7 12V10"
                            stroke="#4147d5"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                )
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                ))
            }
        </div>
    )
}
