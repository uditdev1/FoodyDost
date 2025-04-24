import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useNavigate } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import useDimensions from '../Hooks/useDimensions';
import useScrollUtils from "./useScrollUtils";
import LandingVideoAnimation from '../LandingVideoAnimation.jsx/LandingVideoAnimation';
import { getAll } from '../../Services/services';
import { getUser } from '../../Services/userService.js';

gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerFoods = ({stfm4}) => {
   
    const dimensions = useDimensions();
    const ScrollUtils = dimensions.width > 600 ? useScrollUtils() : null;
    const [foodData , setFoodData] = useState();

    const scrollTriggerFoodsRef = useRef();
    useEffect(() => {
        const fetchData = async () => {
            const userId = getUser() ? getUser().id : null ;
            const {data} = await getAll(userId); 
            setFoodData(data.slice(0,5))
        }
        fetchData();
        const locomotiveScroll = new LocomotiveScroll({
            el : scrollTriggerFoodsRef.current
        });
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
    } , []);
    
    const navigate = useNavigate();
    
    return (
        <div ref={scrollTriggerFoodsRef} className='stfm4'>
            { 
                dimensions.width > 600 
                &&
                <div className='ScrollTriggerFoods_main h-screen grid grid-cols-2 overflow-hidden'>
                <div className='col-span-1 max-sm:absolute max-sm:invisible stfm1 h-full w-full flex justify-center items-end flex-col'>
                    <div
                        className='flex h-screen justify-center relative items-end pr-10 w-[80%] flex-col'
                    >
                        <div 
                            onMouseMove={ScrollUtils.handleMouseMouseName} 
                            onMouseLeave={ScrollUtils.handleMouseLeaveName}
                            className="flex items-start z-[9999] relative flex-col w-full"
                        >
                            <div className='text-lg text-gray-900 w-full'>
                                {foodData && foodData[0].name}
                            </div>
                            <div className="font-poppins font-medium text-4xl leading-normal text-[#1A1A1A]">
                                Fresh, tangy <br />Great food
                            </div>
                        </div>
                    </div>
                    <div className='flex h-screen justify-center items-end pr-10 w-[80%] flex-col'>
                        <div 
                            onMouseMove={ScrollUtils.handleMouseMouseName} 
                            onMouseLeave={ScrollUtils.handleMouseLeaveName}
                            className="flex items-start flex-col w-full"
                        >
                            <div className='text-lg text-gray-900 w-full'>
                                {foodData && foodData[1].name}
                            </div>
                            <div className="font-poppins font-medium text-4xl leading-normal text-[#1A1A1A]">
                                Classic food <br /> With classic vibe
                            </div>
                        </div>
                    </div>
                    <div className='flex h-screen justify-center items-end pr-10 w-[80%] flex-col'>
                        <div 
                            onMouseMove={ScrollUtils.handleMouseMouseName} 
                            onMouseLeave={ScrollUtils.handleMouseLeaveName}
                            className="flex items-start flex-col w-full"
                        >
                            <div className='text-lg text-gray-900 w-full'>
                                {foodData && foodData[2].name}
                            </div>
                            <div className="font-poppins font-medium text-4xl leading-normal text-[#1A1A1A]">
                                Delicious food <br /> with great time
                            </div>
                        </div>
                    </div>
                    <div className='flex h-screen justify-center items-end pr-10 w-[80%] flex-col'>
                        <div 
                            onMouseMove={ScrollUtils.handleMouseMouseName} 
                            onMouseLeave={ScrollUtils.handleMouseLeaveName}
                            className="flex items-start flex-col w-full"
                        >
                            <div className='text-lg text-gray-900 w-full'>
                                {foodData && foodData[3].name}
                            </div>
                            <div className="font-poppins font-medium text-4xl leading-normal text-[#1A1A1A]">
                                From Every Kitchen,<br /> To You
                            </div>
                        </div>
                    </div>
                    <div className='flex h-screen justify-center items-end pr-10 w-[80%] flex-col'>
                        <div 
                            onMouseMove={ScrollUtils.handleMouseMouseName} 
                            onMouseLeave={ScrollUtils.handleMouseLeaveName}
                            className="flex items-start flex-col w-full"
                        >
                            <div className='text-lg text-gray-900 w-full'>
                                {foodData && foodData[4].name}
                            </div>
                            <div className="font-poppins font-medium text-4xl leading-normal text-[#1A1A1A]">
                                Every Bite, <br /> A Flavor Explosion
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-1 max-sm:col-span-2 stfm2 '>
                    <div className='h-screen flex justify-start items-center w-full '>
                        <div className='h-fit w-fit rounded-xl relative flex overflow-hidden cursor-none'>
                            <div 
                                onMouseMove={(e) => ScrollUtils.handleMouseEnter1(e, 0)} 
                                onMouseLeave={(e) => ScrollUtils.handleMouseLeave1(e , 0)} 
                                onClick={() => navigate("/food/" + (foodData && foodData[0].id))} 
                                className="cursor-none bg-cover img_par0 duration-100 z-[9] rounded-xl relative bg-red-300 w-[22rem] h-[25rem] flex justify-center items-center"
                                >
                                <img className='moving_img0 shadow-xl rounded-xl shadow-gray-600 object-cover w-[16rem] h-[20rem]' src={foodData && foodData[0].imageUrl} alt="" />
                            </div>
                            <div 
                                onMouseMove={(e) => ScrollUtils.handleMouseEnter1(e,1)} 
                                onMouseLeave={(e) => ScrollUtils.handleMouseLeave1(e,1)} 
                                onClick={() => navigate("/food/" + (foodData && foodData[1].id))} 
                                className=" img_par1 z-[99] rounded-2xl w-[22rem] h-[25rem] flex justify-center items-center top-[150%] absolute stfm2a backdrop-blur-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            >
                                <img className='moving_img1 shadow-xl rounded-xl shadow-gray-600 object-cover w-[16rem] h-[20rem]' src={foodData && foodData[1].imageUrl} alt="" />
                            </div>
                            <div 
                                onMouseMove={(e) => ScrollUtils.handleMouseEnter1(e,2)} 
                                onMouseLeave={(e) => ScrollUtils.handleMouseLeave1(e,2)} 
                                onClick={() => navigate("/food/" + (foodData && foodData[2].id))} 
                                className=" img_par2 z-[999] rounded-2xl w-[22rem] h-[25rem] flex justify-center items-center top-[150%] absolute stfm2b bg-green-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            >
                                <img className='moving_img2 shadow-xl rounded-xl shadow-gray-600 object-cover w-[16rem] h-[20rem]' src={foodData && foodData[2].imageUrl} alt="" />
                            </div>
                            <div 
                                onMouseMove={(e) => ScrollUtils.handleMouseEnter1(e,3)} 
                                onMouseLeave={(e) => ScrollUtils.handleMouseLeave1(e,3)} 
                                onClick={() => navigate("/food/" + (foodData && foodData[3].id))} 
                                className=" img_par3 z-[9999] rounded-xl w-[22rem] h-[25rem] flex justify-center items-center top-[150%] absolute stfm2c bg-blue-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            >
                                <img className='moving_img3 shadow-xl rounded-xl shadow-gray-600 object-cover w-[16rem] h-[20rem]' src={foodData && foodData[3].imageUrl} alt="" />
                            </div>
                            <div 
                                onMouseMove={(e) => ScrollUtils.handleMouseEnter1(e,4)} 
                                onMouseLeave={(e) => ScrollUtils.handleMouseLeave1(e,4)} 
                                onClick={() => navigate("/food/" + (foodData && foodData[4].id))} 
                                className="img_par4 z-[99999] rounded-xl w-[22rem] h-[25rem] flex justify-center items-center top-[150%] absolute stfm2d bg-gray-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            >
                                <img className='moving_img4 shadow-xl rounded-xl shadow-gray-600 object-cover w-[16rem] h-[20rem]' src={foodData && foodData[4].imageUrl} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            }
        </div>
    )
}

export default ScrollTriggerFoods