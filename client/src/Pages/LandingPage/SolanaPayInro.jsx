import { useGSAP } from '@gsap/react'
import React from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

gsap.registerPlugin(ScrollTrigger);

const SolanaPayInro = () => {

    useGSAP(() => {
        const gtl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".solanaLogo1_par",
                start: "top -40%",
                end : "top -100%",
                scrub: 2,
            }
        });
        gtl2.from(".solanaLogo1", {
            scale : 4.8,
            x : 140
        })
    
        // gsap.from(".abcimg", {
        //     y : -220,
        //     scrollTrigger: {
        //         trigger: ".solanaLogo1_par",
        //         start: "top -30%",
        //         end : "top -130%",
        //         scrub: 1,
        //     }
        // })   
    })

    const endpoint = import.meta.env.VITE_SOLANA_RPC_URL || "https://api.devnet.solana.com";

    return (
        <div className="relative solanaLogo1_par flex h-screen w-screen">
            <div className="flex absolute -left-8 md:-left-10 justify-center items-center  h-screen w-screen">
                <div data-scroll-container className='h-screen max-sm:hidden absolute -left-8 md:-left-10 top-0  w-screen'>
                    <div data-scroll data-scroll-speed={0.2} className="w-3  abcimg h-3 absolute -top-10 left-20 -ml-1.5 mt-52 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full  opacity-100"></div>
                    <div data-scroll data-scroll-speed={0.2} className="w-8 abcimg h-8 absolute bottom-36 left-40 -ml-1.5 mt-52 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full y-0 opacity-100"></div>
                    <div data-scroll data-scroll-speed={-0.2} className="w-8 abcimg h-8 absolute -top-28 right-10 -ml-1.5 mt-52 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full  opacity-100"></div>
                    <div data-scroll data-scroll-speed={0.2} className="w-6 abcimg h-6 absolute top-44 left-[40%] -ml-1.5 mt-52 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full y-0 opacity-100"></div>
                    <div data-scroll data-scroll-speed={-0.2} className="w-8  abcimg h-8 absolute top-72 right-56 -ml-1.5 mt-52 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full y-0 opacity-100"></div>
                    <div data-scroll data-scroll-speed={0.2} className="w-12 abcimg h-12 absolute top-40 right-96 -ml-1.5 mt-52 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full y-0 opacity-100"></div>
                    <div data-scroll data-scroll-speed={-0.2} className="w-12 abcimg h-12 absolute -top-10 left-1/2 -ml-1.5 mt-52 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full y-0 opacity-100"></div>
                    <div data-scroll data-scroll-speed={0.2} className="w-10 abcimg h-10 absolute top-20 left-72 -ml-1.5 mt-52 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full  opacity-100"></div>
                    <div data-scroll data-scroll-speed={0.2} className="w-10 abcimg h-10 absolute bottom-[-2rem] left-72 -ml-1.5 mt-52 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full opacity-100"></div>
                </div>
                <div className='relative backdrop-blur-sm w-screen flex justify-center items-center '>
                    <img className='w-[40rem] sm:h-[20rem] max-sm:w-[16rem] solanaLogo1' src="/solanaLogo1.svg" alt="" />
                </div>
                
            </div>
            <div className='text-xl backdrop-blur-sm absolute max-sm:-left-6 -left-8 bottom-32 text-black flex justify-center items-center w-screen'>
                Pay food bills using Solana's fast and secure blockchain technology.
                <br />
                Experience the future of payments today.
            </div>
            <div className="absolute bottom-10 w-screen flex justify-center items-center">
                <ConnectionProvider endpoint={endpoint}>
                    <WalletProvider wallets={[]} autoConnect>
                        <WalletModalProvider>
                            <div className='flex flex-wrap'>
                                <div className='p-4 mr-12 sm:mr-20'>
                                    <WalletMultiButton />
                                </div>
                            </div>
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </div>
        </div>
    )
}

export default SolanaPayInro