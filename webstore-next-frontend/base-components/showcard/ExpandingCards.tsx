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
            imgSrc: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200",
            icon: "🔺",
            title: "Pyramids of Giza",
            description: "The last surviving wonder of the ancient world."
        },
        {
            id: 2,
            imgSrc: "https://images.unsplash.com/flagged/photo-1552553030-837c9c2b0fac?w=900&auto=format&fit=crop&q=60",
            icon: "⛰️",
            title: "Great Wall",
            description: "A vast series of fortifications across China."
        },
        {
            id: 3,
            imgSrc: "https://images.unsplash.com/photo-1585329017236-46abbe0f301f?w=900&auto=format&fit=crop&q=60",
            icon: "🏰",
            title: "Great Wall",
            description: "A vast series of fortifications across China."
        },
        {
            id: 4,
            imgSrc: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200",
            icon: "🗼",
            title: "Great Wall",
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