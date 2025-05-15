import { useGSAP } from "@gsap/react";
import { useMotionValue } from "framer-motion";
import gsap from "gsap";
import { useState } from "react";
import useDimensions from "../Hooks/useDimensions";

const useScrollUtils = () => {
    const scrollSpeedDecreaseBy = 8;
    const dimensions = useDimensions();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [img1Hovered , setImg1Hovered] = useState(false);

    const handleMouseEnter1 = (e, ind) => {
        setImg1Hovered(true);
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        gsap.to(".mousePointer",{
            height : "4rem",
            width : "4rem",
            backgroundColor : "rgba(0, 0, 0, 0.75)"
        })
        gsap.to(".mousePointer_text", {
            opacity : 1
        })
        gsap.to(".img_par" + ind, {
            scale : 0.95,
            duration : 0.3
        })
        gsap.to(".moving_img" + ind, {
            scale : 1.15,
            duration : 0.3
        })

    }
    const handleMouseLeave1 = (e, ind) => {
        setImg1Hovered(false);
        gsap.to(".mousePointer",{
            height : "0.7rem",
            width : "0.7rem",
            backgroundColor : "black",
        })
        gsap.to(".mousePointer_text", {
            opacity : 0
        })
        gsap.to(".img_par" + ind, {
            scale : 1,
            duration : 0.3
        })
        gsap.to(".moving_img" + ind, {
            scale : 1,
            duration : 0.3
        })
    }

    const handleMouseMouseName = () => {
        gsap.set(".mousePointer", {
            zIndex: 0,
        });
        gsap.to(".mousePointer",{
            height : "6rem",
            width : "6rem",
            backgroundColor : "rgba(181, 175, 174,0.75)",
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

    useGSAP(() => {
        gsap.to(".stfm1", {
            scrollTrigger: {
                trigger: ".ScrollTriggerFoods_main",
                scrub : 1,
                start: "top 0%",
                end: `top -${100 * scrollSpeedDecreaseBy}%`,
                pin: true,
            },
            y: 4 * dimensions.height * -1,
        });
        
        // animation start --------------
        const animationMoment_y = -400
        gsap.to(".stfm2a", {
            y: animationMoment_y,
            scrollTrigger: {
                trigger: ".stfm1",
                scrub : 1,
                start: "top 0%",
                end: `top -${15 * scrollSpeedDecreaseBy}%`,
            }
        });

        gsap.to(".stfm2b", {
            y: animationMoment_y,
            scrollTrigger: {
                trigger: ".stfm1",
                scrub : 1,
                start: `top -${15 * scrollSpeedDecreaseBy}%`,
                end: `top -${30 * scrollSpeedDecreaseBy}%`,
            }
        });
        gsap.to(".stfm2c", {
            y: animationMoment_y,
            scrollTrigger: {
                trigger: ".stfm1",
                scrub : 1,
                start: `top -${30 * scrollSpeedDecreaseBy}%`,
                end: `top -${52 * scrollSpeedDecreaseBy}%`,
            }
        });
        gsap.to(".stfm2d", {
            y: animationMoment_y,
            scrollTrigger: {
                trigger: ".stfm1",
                scrub : 1,
                start: `top -${60 * scrollSpeedDecreaseBy}%`,
                end: `top -${90 * scrollSpeedDecreaseBy}%`,
            }
        });

        // image moving
        const image_move_y = -20;
        gsap.to(".moving_img0", {
            y : image_move_y,
            scrollTrigger: {
                trigger: ".stfm1",
                start: `top -${6 * scrollSpeedDecreaseBy}%`,
                end: `top -${16 * scrollSpeedDecreaseBy}%`,
                scrub: 4,
            },
        });
        gsap.to(".moving_img1", {
            y : image_move_y,
            scrollTrigger: {
                trigger: ".stfm1",
                start: `top -${16 * scrollSpeedDecreaseBy}%`,
                end:`top -${30 * scrollSpeedDecreaseBy}%`,
                scrub: 4,
            },
        });
        
        gsap.to(".moving_img2", {
            y : image_move_y,
            scrollTrigger: {
                trigger: ".stfm1",
                start: `top -${30 * scrollSpeedDecreaseBy}%`,
                end: `top -${52 * scrollSpeedDecreaseBy}%`,
                scrub: 4, 
            },
        });
        
        gsap.to(".moving_img3", {
            y : image_move_y,
            scrollTrigger: {
                trigger: ".stfm1",
                start: `top -${52 * scrollSpeedDecreaseBy}%`,
                end: `top -${90 * scrollSpeedDecreaseBy}%`,
                scrub: 4,
            },
        });
        
        // color change animation --
        
        // if(!stfm4.current) return ;
        const colorChangeTarget = ".main_root" ;
        gsap.to(colorChangeTarget, {
            backgroundColor: "rgb(254 226 226)",
            scrollTrigger: {
                trigger: ".stfm1",
                start: `top -${6 * scrollSpeedDecreaseBy}%`,
                end: `top -${16 * scrollSpeedDecreaseBy}%`,
                scrub : 1,
            },
        });
        
        gsap.to(colorChangeTarget, {
            backgroundColor: "rgb(220 252 231)",
            scrollTrigger: {
                trigger: ".stfm1",
                start: `top -${20 * scrollSpeedDecreaseBy}%`,
                end:`top -${30 * scrollSpeedDecreaseBy}%`,
                scrub : 1, 
            },
        });
        
        gsap.to(colorChangeTarget, {
            backgroundColor: "rgb(219 234 254)",
            scrollTrigger: {
                trigger: ".stfm1",
                start: `top -${35 * scrollSpeedDecreaseBy}%`,
                end: `top -${52 * scrollSpeedDecreaseBy}%`,
                scrub : 1,
            },
        });
        gsap.to(colorChangeTarget, {
            backgroundColor: "transparent",
            scrollTrigger: {
                trigger: ".stfm1",
                start: `top -${58 * scrollSpeedDecreaseBy}%`,
                end: `top -${90 * scrollSpeedDecreaseBy}%`,
                scrub : 1,
            },
        });

    });
  return (
    {handleMouseEnter1, handleMouseLeave1 , setImg1Hovered, img1Hovered , handleMouseLeaveName, handleMouseMouseName}
  )
}

export default useScrollUtils