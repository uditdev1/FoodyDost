import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import { useEffect, useState } from "react";
import { fetchSolConversionRate } from "../../Services/cryptoService";
import { toast } from "react-toastify";


export function SendTokens({amount, handleApprove}) {
    const wallet = useWallet();
    const {connection} = useConnection();
    const sendTo = "GhkRMpiNFCZfM6kycBZ5vjo7MvU3y1keJBVRTk59CUZh";
    const [sol , setSol] = useState(0);
    useEffect(() => {
        const run = async () => {
            const res = await fetchSolConversionRate(amount);
            setSol(res);
            console.log(res); 
        }
        run();
    }, [sol]);
    async function sendTokens() {
        const transaction = new Transaction();
        const money =  parseInt(sol * LAMPORTS_PER_SOL);
        console.log(money);
        try {
            transaction.add(SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(sendTo),
                lamports: money,
            }));

            await wallet.sendTransaction(transaction, connection);
            alert("Sent " + sol + " SOL to " + sendTo);
            handleApprove();
            toast.success("payment success!");
        } catch (err) {
            console.log(err);
            toast.error(err.toString());
        }
    }

    return <div className="text-slate-200 text-md flex justify-start items-center p-2 flex-col gap-4">
        <div className="">
            Sending <span className="text-2xl"> {sol} </span> SOL
        </div>
        <button onClick={sendTokens} className="border-2 p-2 bg-slate-600 hover:bg-slate-800 duration-200 w-32 rounded-xl border-black">Send</button>
    </div>
}
