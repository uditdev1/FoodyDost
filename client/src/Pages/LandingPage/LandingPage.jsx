import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Testimonials from './Testimonials';
import MotionCard  from './MotionCard';
import ScrollTriggerFoods from '../../components/ScrollTriggerFoods/ScrollTriggerFoods';
import LocomotiveScroll from "locomotive-scroll";
import { useMotionValue } from 'framer-motion';
import { motion } from "motion/react";
import gsap from 'gsap';
import GlslImage1 from '../../components/GlslImage1/GlslImage1';
import LandingVideoAnimation from '../../components/LandingVideoAnimation.jsx/LandingVideoAnimation';
import SolanaPayInro from './SolanaPayInro';
import { useGSAP } from '@gsap/react';

function LandingPage() {
    const [fontSize, setFontSize] = useState('0.5rem');
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 500) {
          setFontSize('4rem'); 
        } else {
          setFontSize("2.5rem");
        }
      };
      window.addEventListener('resize', handleResize);
      handleResize(); 

      return () => window.removeEventListener('resize', handleResize);
    }, []);
    const navigate = useNavigate();
    const stfm4 = useRef();

    useEffect(() => {
      const locomotiveScroll = new LocomotiveScroll();
      return () => {
        locomotiveScroll.destroy();
      }
    },[]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const mousePointerRef = useRef();

    const handleMouseMotion = (e, ind) => {
      const bounds = mousePointerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - bounds.left);
      mouseY.set(e.clientY - bounds.top);
      gsap.to(".mousePointer", {
        opacity : 1,
        x : mouseX.current,
        y : mouseY.current,
        ease: "power2.out",
        duration: 0.2,
      })
    }
    const handleMouseLeave = (e, ind) => {
      gsap.to(".mousePointer", {
        opacity : 0
      })
    }
    const handleMouseMotionInChessV_title = () => {
      gsap.to(".mousePointer",{
        height : "4rem",
        width : "4rem",
        backgroundColor : "rgba(0, 0, 0, 0.75)"
      })
      gsap.to(".mousePointer_text", {
        opacity : 1
      })
    }

    const handleMouseMotionInChessV_titleLeave = () => {
      gsap.to(".mousePointer",{
        height : "0.7rem",
        width : "0.7rem",
        backgroundColor : "black",
      })
      gsap.to(".mousePointer_text", {
          opacity : 0
      })
    }

    useGSAP(() => {
      gsap.from(".solanaLogoLandingPage", {
        x : 250,
        duration : 1.5,
        delay : 1,
      })
    })

    const page4Ref = useRef(null);
    const handleScrollToPage3 = () => {
      if (page4Ref.current) {
        page4Ref.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    const handleMouseMouseName = () => {
      gsap.set(".mousePointer", {
          zIndex: 0,
      });
      gsap.to(".mousePointer",{
          height : "6rem",
          width : "6rem",
          backgroundColor : "#14F195",
      })
    }

    const handleMouseLeaveName = () => {
        gsap.to(".mousePointer",{
            height : "0.7rem",
            width : "0.7rem",
            backgroundColor : "black",
            zIndex : "999999"
        })
    }


    return (
          <section
            ref={stfm4}
            onMouseMove={handleMouseMotion}
            onMouseLeave={handleMouseLeave}
            className="p-8 pb-16 md:p-10 main_root font-medium overflow-x-clip md:items-center gap-3 overflow-hidden relative"
            >
              <div className={`absolute z-[9999999] max-sm:hidden rounded-full h-[0.7rem] w-[0.7rem] bg-black text-white mousePointer pointer-events-none transform -translate-x-1/2 -translate-y-1/2`}>
                <div className='mousePointer_text text-sm font-bold opacity-0 h-full w-full relative flex justify-center items-center'>
                  Click
                </div>
              </div>
              {/* <div className='h-screen w-screen absolute max-sm:scale-[0.9] pointer-events-none overflow-hidden'>
                <div className='relative h-full w-full'>
                {
                  data[0].map((canvasdets, index) => <ChillAnimation key={index} details={canvasdets} />)
                }
                </div>
              </div> */}
            <div ref={mousePointerRef} className=" ">
              <div className="max-md:w-[90%] ">
                <div className="text-4xl z-[99] md:text-7xl pb-4 font-black bg-gradient-to-b from-[#D32F2F] to-[#e3acac] text-transparent bg-clip-text tracking-tighter">
                    <span className='text-2xl hover:underline md:text-4xl'>Play on </span> 
                    <Link
                      onMouseMove={handleMouseMotionInChessV_title}
                      onMouseLeave={handleMouseMotionInChessV_titleLeave}
                      className=' hover:underline ChessV_title overflow-hidden' 
                      to='https://chesswe.netlify.app'
                    > 
                      ChessWe
                    </Link>
                    <span className='text-2xl md:text-4xl'> to Compete, <br />Order on </span>
                    <span onClick={( ) => navigate("/home")} className='cursor-pointer'> 
                    <span
                        className='cursor-pointer' 
                        onClick={() => navigate("/home")}
                    > 
                        FoodyDost 
                    </span>
                    </span>
                    <span className='text-2xl md:text-4xl'> to Grab the Treat </span>
                </div>
                <div className="text-xl lg:text-2xl tracking-tighter opacity-85">
                    Craving something delicious? FoodyBro lets you explore, order, and enjoy your favorite meals with ease!
                </div>
      
                <div className="flex items-center justify-between gap-3 mt-6 text-lg">
                  <motion.div 
                    initial={{}}
                    animate={{ scale : [1, 1.18, 1]}}
                    transition={{duration : 2, ease : "easeInOut", repeat : Infinity}}
                    onClick={() => navigate("/home")} className="cursor-pointer duration-300 hover:underline"
                  >
                    ORDER <span className='text-[#D32F2F] font-bold'>NOW</span>
                  </motion.div>
                  <div onMouseMove={handleMouseMouseName} onMouseLeave={handleMouseLeaveName} onClick={handleScrollToPage3} className='text-xl cursor-pointer solanaLogoLandingPage relative text-black font-bold'>
                    <img className='w-[10rem]' src="/solanaLogo1.svg" alt="" /> 
                    <div className='absolute left-[3.2rem] top-[60%]'>
                      PAY
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <GlslImage1/>
              </div>
              <div className=''>
                <ScrollTriggerFoods stfm4={stfm4}/>
              </div>
              <div className='relative h-fit'>
                <LandingVideoAnimation/>
              </div>
              <div className='relative h-screen' ref={page4Ref}>
                <SolanaPayInro/>
              </div>
              <div className="">
                <Testimonials/>
              </div>
              <div>
              <MotionCard >
                <div className="flex flex-col items-center justify-center relative">
                  <div className="text-4xl md:text-5xl pb-3 px-2 lg:text-6xl font-bold tracking-tighter text-[#e8d4d3]">
                    Sign up today
                  </div>

                  <div className="text-center text-lg mb-8 md:text-xl">
                    Want to see more deployments like this? Click Learn More to explore more deployments.
                  </div>
 
                  <div className="flex items-center w-full justify-center gap-4 mt-4 text-lg">
                    <Link to={"https://udit.is-a.dev"}>
                      <div className="cursor-pointer hover:underline">
                        Learn more
                        {/* <FaArrowRight className="h-3 w-3 inline ml-2" /> */}
                      </div>
                    </Link>
                  </div>
                </div>
              </MotionCard>
              </div>
            </div>
          </section>
    )
}

export default LandingPage
