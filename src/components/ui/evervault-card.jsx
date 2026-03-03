import { useMotionValue } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const EvervaultCard = ({ text, className }) => {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    const [randomString, setRandomString] = useState("");

    useEffect(() => {
        let str = generateRandomString(1500);
        setRandomString(str);
    }, []);

    function onMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);

        const str = generateRandomString(1500);
        setRandomString(str);
    }

    return (
        <div
            className={cn(
                "p-0.5 bg-transparent flex items-center justify-center w-full relative",
                className
            )}
        >
            <div
                onMouseMove={onMouseMove}
                className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex flex-col justify-center items-center aspect-square"
            >
                <CardPattern
                    mouseX={mouseX}
                    mouseY={mouseY}
                    randomString={randomString}
                />

                {/* The main text that reveals on hover inside the encrypted pattern */}
                <div className="absolute inset-0 z-10 w-full flex items-center justify-center p-6 text-center">
                    <span className="text-white z-20 font-bold text-2xl tracking-widest uppercase transition-opacity duration-300 opacity-0 group-hover/card:opacity-100" style={{ textShadow: "0 0 10px rgba(0,0,0,0.8)" }}>HOVER</span>
                </div>
            </div>
        </div>
    );
};

export function CardPattern({ mouseX, mouseY, randomString }) {
    let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
    let style = { maskImage, WebkitMaskImage: maskImage };

    return (
        <div className="pointer-events-none w-full h-full absolute inset-0 rounded-3xl z-0">
            <div className="absolute inset-0 rounded-3xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
            <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/30 to-blue-700/30 opacity-0 group-hover/card:opacity-100 backdrop-blur-md transition duration-500"
                style={style}
            />
            <motion.div
                className="absolute inset-0 p-4 rounded-3xl opacity-0 mix-blend-overlay group-hover/card:opacity-100"
                style={style}
            >
                <p className="absolute inset-x-0 inset-y-0 p-4 text-[0.65rem] h-full break-words whitespace-pre-wrap text-white font-mono transition duration-500 overflow-hidden leading-tight">
                    {randomString}
                </p>
            </motion.div>
        </div>
    );
}

const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const generateRandomString = (length) => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

export const Icon = ({ className, ...rest }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={className}
            {...rest}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
};
