import { useMotionValue } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const EvervaultCard = ({ text, imageUrl, className }) => {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    const [randomString, setRandomString] = useState("");

    useEffect(() => {
        let str = generateRandomString(1500);
        setRandomString(str);
    }, []);

    const [lastUpdate, setLastUpdate] = useState(0);

    function onMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);

        const now = Date.now();
        if (now - lastUpdate > 50) { // Update string only every 50ms
            const str = generateRandomString(1500);
            setRandomString(str);
            setLastUpdate(now);
        }
    }

    return (
        <div
            className={cn(
                "p-0.5 bg-transparent w-full relative h-full",
                className
            )}
        >
            <div
                onMouseMove={onMouseMove}
                className="group/card w-full relative overflow-hidden bg-transparent flex flex-col justify-center items-center h-full"
            >
                {/* Background Image — Full Coverage */}
                {imageUrl && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={imageUrl}
                            alt={text}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover/card:bg-black/10 transition-colors duration-500" />
                    </div>
                )}

                <CardPattern
                    mouseX={mouseX}
                    mouseY={mouseY}
                    randomString={randomString}
                />

                {/* Removed hover text as per user request */}
            </div>
        </div>
    );
};

export function CardPattern({ mouseX, mouseY, randomString }) {
    let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
    let style = { maskImage, WebkitMaskImage: maskImage };

    return (
        <div className="pointer-events-none w-full h-full absolute inset-0 rounded-3xl z-0">
            {/* Removed the fading mask to ensure full-card hover effect */}
            <div className="absolute inset-0 rounded-3xl group-hover/card:opacity-50"></div>
            <motion.div
                className="absolute inset-0 rounded-3xl bg-[#00f2fe]/10 opacity-0 group-hover/card:opacity-100 backdrop-blur-[2px] transition duration-500"
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
