"use client";
import {motion} from "framer-motion";
import {ImagesSlider} from "./hero-section.tsx";
import heroData from "@/constants/hero-section-data.ts";
import {NavLink} from "react-router-dom";

export function HeroSection() {
    return (
        <ImagesSlider className="h-[40rem]" images={heroData}>
            <motion.div
                initial={{
                    opacity: 0,
                    y: -80,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.6,
                    ease: "easeInOut",

                }}
                className="z-50 flex flex-col justify-center items-center "
            >
                <motion.p
                    className="font-bold text-4xl md:text-7xl lg:text-8xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 bg-[#F5EFE6] py-4">
                    London Navigator <br/>
                </motion.p>
                <NavLink to='/map'>
                <button
                    className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
                    <span>Go to Map →</span>
                    <div
                        className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent"/>
                </button>
                </NavLink>
            </motion.div>
        </ImagesSlider>
    );
}

export default HeroSection;