import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils.ts"; // Ensure this utility function is correctly imported

type ImagesSliderProps = {
    images: string[];
    children: React.ReactNode;
    overlay?: boolean;
    overlayClassName?: string;  // Make this optional
    className?: string;
    autoplay?: boolean;
};

export const ImagesSlider = ({
                                 images,
                                 children,
                                 overlay = true,
                                 overlayClassName = "",  // Provide a default empty string if none provided
                                 className = "",
                                 autoplay = true,
                             }: ImagesSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState<string[]>([]);

    useEffect(() => {
        const loadImages = () => {
            const loadPromises = images.map(image =>
                new Promise<string>((resolve, reject) => {
                    const img = new Image();
                    img.src = image;
                    img.onload = () => resolve(image);
                    img.onerror = reject;
                })
            );

            Promise.all(loadPromises)
                .then(loaded => setLoadedImages(loaded))
                .catch(error => console.error("Failed to load images", error));
        };

        loadImages();
    }, [images]);

    useEffect(() => {
        const handleAutoplay = () => handleNext();

        let interval: ReturnType<typeof setInterval> | null = null;
        if (autoplay && loadedImages.length > 0) {
            interval = setInterval(handleAutoplay, 5000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [autoplay, loadedImages.length ]);

    const handleNext = () => {
        setCurrentIndex(prev => (prev + 1) % images.length);
    };


    const fadeVariants = {
        initial: { opacity: 0 },
        enter: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className={cn("overflow-hidden h-full w-full relative flex items-center justify-center", className)}>
            {overlay && (
                <div className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)} />
            )}
            <AnimatePresence>
                {loadedImages.length > 0 && (
                    <motion.img
                        key={currentIndex}
                        src={loadedImages[currentIndex]}
                        variants={fadeVariants}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                )}
            </AnimatePresence>
            {children}
        </div>
    );
};

export default ImagesSlider;
