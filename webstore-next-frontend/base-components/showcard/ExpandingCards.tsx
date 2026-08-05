import * as React from "react";
import cardstyle from "../../service-module/global-util/card-style.module.css";
import { Typography } from "@mui/material";

interface CardItem {
  id: number;
  title?: string;
  description?: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref?: string;
}

export default function Expanding_cards() {

    const cardArray : CardItem[] = [
        {
            id: 1,
            imgSrc: "/images/onLanding/expand1.jpg",
            icon: "🛍️",
            title: "Calm Vibe Explore",
            description: "The last surviving wonder of the ancient world."
        },
        {
            id: 2,
            imgSrc: "/images/onLanding/expand2.jpg",
            icon: "🛒",
            title: "Neet Shopping",
            description: "A vast series of fortifications across China."
        },
        {
            id: 3,
            imgSrc: "/images/onLanding/expand3.jpg",
            icon: "🥼",
            title: "Multi Categories",
            description: "A vast series of fortifications across China."
        },
        {
            id: 4,
            imgSrc: "/images/onLanding/expand4.png",
            icon: "👗",
            title: "Try on Fit",
            description: "A vast series of fortifications across China."
        }
    ]

    const [activeIndex,setActiveIndex] = React.useState(1);

  return (
    <div className={cardstyle.xpcards}>
    {
        cardArray && cardArray.map(card => (
            <div key={card.id} className={`${cardstyle.xpcard} ${card.id === activeIndex ? cardstyle.xpactive : ""}`}
            onMouseEnter={() => setActiveIndex(card.id)} 
            style={{backgroundImage: `url(${card.imgSrc})`}}>
            <div className={cardstyle.xpoverlay}>
                <Typography fontSize={30}>{card.icon}</Typography>
                <Typography fontSize={40} fontWeight={800}>{card.title}</Typography>
                <Typography fontSize={20}>{card.description}</Typography>
            </div>
            </div>
        ))
    }

    

</div>
)}