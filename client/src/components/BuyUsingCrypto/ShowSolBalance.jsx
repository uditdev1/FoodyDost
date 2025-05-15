import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function ShowSolBalance() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [sol, setSol ] = useState(0);
    useEffect(() => {
        async function getBalance() { 
            if (wallet.publicKey) {
                const balance = await connection.getBalance(wallet.publicKey);
                setSol(balance / LAMPORTS_PER_SOL);
            }
        }
        
        getBalance();
    } , [wallet]);
    return (
        <div className="text-slate-200 text-2xl">
            <span className="text-xl">Curr SOL : </span> {sol}
        </div>
    )
}