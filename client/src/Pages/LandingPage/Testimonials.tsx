import { motion } from "framer-motion";
import React from "react";

function Testimonials() {
  return (
    <div className="pt-12">
      <div className="flex flex-col items-center px-28 max-sm:px-3 pb-16">
        <div className="border-2 w-fit p-1 text-sm rounded-xl font-semibold border-slate-300/80">
          Reviews
        </div>
        <div className="text-4xl lg:text-5xl p-2 text-center font-bold tracking-tighter bg-gradient-to-b from-[#D32F2F] to-[#e3acac] text-transparent bg-clip-text">
          What our users say
        </div>
      </div>
      <div className="overflow-hidden h-[15rem] mb-12 md:mb-28 lg:mb-36">
        <motion.div
          initial={{
            translateY : "40%"
          }}
          animate={{
            translateY: "-100%",
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          <div className="flex items-center justify-center overflow-x-hidden pb-4 gap-4 ">
            <div>
              <div className="shadow-xl w-[310px] rounded-2xl p-8">
                <div className="font-medium pb-4">
                  I absolutely love FoodyDost! The app has a huge variety of food items to choose from, and the UI is super easy to navigate                </div>
                <div className="flex items-center gap-3">
                  <img src="/avatar-1.png" alt="Avatar" className="h-12 w-12" />
                  <div>
                    <div className="font-semibold">Elina Stan</div>
                    <div>@elina_1</div>
                  </div>
                </div>
              </div>

              <div className="shadow-xl w-[310px] rounded-2xl p-8 my-6">
                <div className="font-medium pb-4">
                  I just tried FoodyDost for the first time and was impressed with how smooth everything was.
                </div>
                <div className="flex items-center gap-3">
                  <img src="/avatar-2.png" alt="Avatar" className="h-12 w-12" />
                  <div>
                    <div className="font-semibold">Smith</div>
                    <div>@smith</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="shadow-xl w-[310px] rounded-2xl p-8">
                <div className="font-medium pb-4">
                  As someone who orders food multiple times a week, FoodyDost has become my go-to app. 
                </div>
                <div className="flex items-center gap-3">
                  <img src="/avatar-4.png" alt="Avatar" className="h-12 w-12" />
                  <div>
                    <div className="font-semibold">Ranvijay Singh</div>
                    <div>@ranvijaysingh_</div>
                  </div>
                </div>
              </div>

              <div className="shadow-xl w-[310px] rounded-2xl p-8 my-6">
                <div className="font-medium pb-4">
                  The FoodyDost app has one of the best user interfaces I’ve seen! It’s super clean, modern, and intuitive.                 </div>
                <div className="flex items-center gap-3">
                  <img src="/avatar-5.png" alt="Avatar" className="h-12 w-12" />
                  <div>
                    <div className="font-semibold">Rakesh Kumar</div>
                    <div>@rakeshkr</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;