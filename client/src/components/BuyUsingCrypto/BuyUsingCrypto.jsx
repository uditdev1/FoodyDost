import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import { SendTokens } from './SendTokens';
import { ShowSolBalance } from './ShowSolBalance';

function Xyz({amount, handleApprove, handleCloseCryptoMenu}) {
    const endpoint = import.meta.env.VITE_SOLANA_RPC_URL || "https://api.devnet.solana.com";
    return (
        <div className='flex flex-col m-2 rounded-xl z-[99999] bg-slate-900 w-fit justify-center items-center'>
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <div className='flex flex-wrap'>
                        <div className='p-4'>
                            <WalletMultiButton />
                        </div>
                        <div className='p-4'>
                            <WalletDisconnectButton />
                        </div>
                    </div>
                    <ShowSolBalance />
                    <SendTokens handleApprove={handleApprove} amount={amount}/>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
        </div>
    );
}

function BuyUsingCrypto ({amount, handleApprove, handleCloseCryptoMenu}) {
    
    return (
        <div className='fixed h-screen w-screen backdrop-blur-sm top-0 left-0 z-[999] flex flex-col justify-center items-center'>
            <div onClick={handleCloseCryptoMenu} className='fixed cursor-pointer top-0 right-10 text-4xl font-bold text-slate-800'>
                X
            </div>
            <Xyz handleApprove={handleApprove} amount={amount}/>
        </div>
    )
}

export default BuyUsingCrypto
