import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useDimensions from '../Hooks/useDimensions';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const LandingVideoAnimation = () => {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [startAnimation , setStartAnimation] = useState(false);

    function loadImage(ind, images) {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const img = images[ind];
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        if (img && ctx) {
            const scaleX = canvas.width / img.width;
            const scaleY = canvas.height / img.height;
            const scale = Math.max(scaleX , scaleY);

            const newWidth = img.width * scale;
            const newHeight = img.height * scale;
            const offsetX = (canvas.width - newWidth) / 2;
            const offsetY = (canvas.height - newHeight) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        }
    }
    const frames = {
        currInd: 0,
        maxInd: 412 // 325
    };

    useEffect(() => {
        
        const loadedImages = [];
        function preLoader() {
            for (let i = 1; i <= frames.maxInd; i++) {
                const imgUrl = `/frames3/frame_${String(i).padStart(4, '0')}.jpeg`;  // Updated URL
                const img = new Image();
                img.src = imgUrl;
                img.onload = () => {
                    loadedImages.push(img);
                    if (loadedImages.length === frames.maxInd) {
                        loadImage(frames.currInd, loadedImages);
                        setStartAnimation(true);
                    }
                };
                img.onerror = () => {
                    console.log("error", imgUrl);
                }
                setImages(prev => [...prev , img]);
            }
        }
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        preLoader();
    }, []);

    useGSAP(() => {
        if(!startAnimation) return ;
        const gtl = gsap.timeline({
            scrollTrigger: {
                trigger: ".parent_canv",
                start: "top top",
                scrub: 2,
                pin : true,
            }
        });

        gtl.to(frames, {
            currInd: frames.maxInd,
            onUpdate: () => {
                loadImage(Math.floor(frames.currInd), images);
            },
            onComplete : () => {
                loadImage(frames.maxInd - 4, images);
            }
        });
    }, [startAnimation]);

    const dimensions = useDimensions();
    
    return (
        <div className='parent_canv h-screen relative w-screen'>
            <canvas id='video_frame' ref={canvasRef} className={`absolute z-[999] h-screen -left-8 md:-left-10`}></canvas>
            {/* <img src="/frames3/frame_0415.jpeg" className={`absolute z[9] h-screen bottom-4 w-screen -left-10`}  alt="" /> */}
        </div>
    );
};

export default LandingVideoAnimation;
