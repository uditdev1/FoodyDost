import axios from "axios";
let rate = undefined;

const findRate = async () => {
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=inr");
    rate = response.data.solana.inr;
}
export const fetchSolConversionRate = async (amount) => {
    try {
        if(!rate) {
            await findRate();
        }
        const solToInrRate = rate ? rate : 20862.84;// response.data.solana.inr ;
        const amountInSOL = amount /  solToInrRate;
        return parseFloat(amountInSOL).toFixed(9);
    } catch (error) {
        console.error("Error fetching SOL conversion rate:", error);
    }
};