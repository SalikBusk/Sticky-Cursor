# Sticky-Cursor

Sticky Cursor effect med [Next.js](https://nextjs.org/), [Framer-motion](https://www.framer.com/motion/) og Trigonometri. 

[https://github.com/SalikBusk/Sticky-Cursor/assets/124777565/5c6a1dec-a8b3-4f68-87c1-fc6cbb6a1fe7](https://github.com/SalikBusk/Sticky-Cursor/assets/124777565/bd90c13e-1afa-43fb-8c44-6fa0ade8d3b4)

## Initialisering af Projektet

Start med projektet ved at oprette en Next.js-applikation. Vi kan gøre det ved at køre 

`Create-next-app@latest clien` 

`cd client`

`npm i framer-motion`



## Page.tsx (src/app/page.tsx)

```
'use client';

import Card from "@/components/Card/Card";
import StickyCursor from "@/components/StickyCursor/StickyCursor";
import { useRef } from "react";

export default function Home() {

  const cardRef = useRef(null);

  return (
    <div className="w-full h-screen flex flex-col gap-10 justify-center items-center">

      <Card ref={cardRef} />

      <StickyCursor stickyElement={cardRef} hoveredClassName="hidden"/>

    </div>
  );
}
```

## Magnetic.tsx (src/components/Magnetic/Magnetic.tsx)

```
"use client"

import { useRef, useState } from 'react';  
import { motion } from 'framer-motion';     

export default function Magnetic({ children }) { 
    const ref = useRef(null);  
    const [position, setPosition] = useState({ x: 0, y: 0 }); 

    const handleMouse = (e) => { 
        const { clientX, clientY } = e;  
        const { height, width, left, top } = ref.current.getBoundingClientRect(); 
        const middleX = clientX - (left + width / 2);  
        const middleY = clientY - (top + height / 2);  
        setPosition({ x: middleX / 15, y: middleY / 15 }); 
    };

    const reset = () => {  
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;  
    return (
        <div
            style={{ position: "relative" }}  
            ref={ref}  
            onMouseMove={handleMouse} 
            onMouseLeave={reset}  
        >
            <motion.div
                style={{ left: 0, top: 0 }}  
                animate={{ x, y }}  
                transition={{ type: "spring", stiffness: 50, damping: 10, mass: 0.2 }}  
            >
                {children}  
            </motion.div>
        </div>
    );
}
```

## Card.tsx (src/components/Card/Card.tsx)

```
"use client";

import React, { forwardRef } from "react";
import Link from "../../../node_modules/next/link";
import Magnetic from "../Magnetic/Magnetic";
import { Icons } from "../ui/Icons";

const Card = forwardRef((props, ref) => {
  return (
    <div className="">
      <Magnetic>
        
        <div
          className="w-[380px] h-[68vh] rounded-xl p-3 overflow-hidden hover:border border-black"
          ref={ref}
        >
          <div className="w-full h-full rounded-md group overflow-hidden relative">
            
            <div className="w-full h-[58vh] bg-pink-500 group-hover:h-full ease-in-out duration-300 rounded-md" />

            <div className="pt-2 flex flex-row items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{"[title]"}</p>
              </div>
              <Link
                href={`/categori`}
                className="group-hover:absolute right-0 bottom-0 p-2 group-hover:p-4 group-hover:bg-pink-200 group-hover:right-3 group-hover:bottom-3 ease-in-out duration-300 rounded-md"
              >
                <Icons.ArrowRight className={`w-10 h-10`} />
              </Link>
            </div>
          </div>
        </div>
      </Magnetic>
    </div>
  );
});

export default Card;
```

## StickyCursor ()

```
'use client'; 

import { useEffect, useState } from 'react'; 
import { motion, useMotionValue, useSpring } from 'framer-motion'; 

export default function StickyCursor({ stickyElement, hoveredClassName }) {

  const [isHovered, setIsHovered] = useState(false); 
    const cursorSize = isHovered ? hoveredClassName ? 50 : 15 : 15; 
    
  const mouse = {
    x: useMotionValue(0), 
    y: useMotionValue(0) 
  }


  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 }
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions), 
    y: useSpring(mouse.y, smoothOptions) 
  }

const manageMouseMove = e => {
    const { clientX, clientY } = e; 
    if (isHovered && stickyElement.current) {
        const { left, top, height, width } = stickyElement.current.getBoundingClientRect(); 
       
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        
        mouse.x.set(centerX - cursorSize / 2);
        mouse.y.set(centerY - cursorSize / 2);
    } else {
       
        mouse.x.set(clientX - cursorSize / 2);
        mouse.y.set(clientY - cursorSize / 2);
    }
}


  
  const manageMouseOver = () => {
    setIsHovered(true); 
  }

  
  const manageMouseLeave = () => {
    setIsHovered(false);
  }

  
  useEffect(() => {
    if (stickyElement.current) {
      stickyElement.current.addEventListener("mouseenter", manageMouseOver); 
      stickyElement.current.addEventListener("mouseleave", manageMouseLeave);

    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      if (stickyElement.current) {
        stickyElement.current.removeEventListener("mouseenter", manageMouseOver); 
        stickyElement.current.removeEventListener("mouseleave", manageMouseLeave); 
      }
      window.removeEventListener("mousemove", manageMouseMove); 
    }
  }, [stickyElement, isHovered]); 

  return (
    <div className=''>
      <motion.div
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y, 
        }}
              animate={{
                  width: isHovered? `${hoveredClassName}`: `${isHovered}`, 
                  height: isHovered? `${hoveredClassName}`: `${isHovered}` 
        }}
        className={`fixed border border-black pointer-events-none ${isHovered ? `${hoveredClassName}` : "w-5 h-5 rounded-full"}`}
      />
    </div>
  )
}
```

