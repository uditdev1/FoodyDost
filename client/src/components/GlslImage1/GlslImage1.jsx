import React, { useEffect, useRef } from 'react'
import MotionImages from './MotionImages.js';

const GlslImage1 = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let motionImages;
        if (containerRef.current) {
            motionImages = new MotionImages({ dom: containerRef.current });
        }
        return () => {
            if (motionImages) {
                motionImages.renderer.dispose();
            }
            if (containerRef.current && motionImages?.renderer?.domElement) {
                containerRef.current.removeChild(motionImages.renderer.domElement);
            }
        };
    }, []);

    return (
        <div className='relative'>
            <div ref={containerRef} className='relative flex justify-center items-center col-span-1 h-[20rem]'>
            </div>
            <div className='images opacity-0 absolute w-[45rem] h-[35rem] max-sm:h-[30rem] max-sm:w-[40rem] '>
                <img className='absolute opacity-0 h-full w-full object-cover' src="/chessv.png" alt="" />
                <img className='absolute opacity-0 h-full w-full object-cover' src="/foods/food-5.jpg" alt="" />
                <img className='absolute opacity-0 h-full w-full object-cover' src="/foods/food-7.jpg" alt="" />
                <img className='absolute opacity-0 h-full w-full object-cover' src="/foods/food-8.jpg" alt="" />
                <img className='absolute opacity-0 h-full w-full object-cover' src="/foods/food-9.jpg" alt="" />
            </div>
        </div>
    )
}

export default GlslImage1