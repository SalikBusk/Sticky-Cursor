"use client";

import React, { forwardRef } from "react";
import Link from "../../../node_modules/next/link";
import Magnetic from "../Magnetic/Magnetic";
import { Icons } from "../ui/Icons";

const Card = forwardRef((props, ref) => {
  return (
    <div className="">
      <Magnetic>
        {/* the stickyCursor should stick to the classes and not move */}
        <div
          className="w-[380px] h-[50vh] rounded-xl p-2 overflow-hidden hover:border border-black"
          ref={ref}
        >
          <div className="w-full h-full rounded-md group overflow-hidden relative">
            {/* Card Image */}
            <div className="w-full h-[40vh] bg-pink-500 group-hover:h-full ease-in-out duration-300 rounded-md" />

            {/* Card content */}
            <div className="pt-2 flex flex-row items-center justify-between">
              <div>
                <p>{"[title]"}</p>
                <p>{"[Description]"}</p>
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
