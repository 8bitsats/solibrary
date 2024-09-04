import { bundlrStorage, Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { Connection } from "@solana/web3.js";

export function useMetaplex() {
    const wallet = useWallet();
    const heliusRpc = "https://mainnet.helius-rpc.com/?api-key=6b52d42b-5d24-4841-a093-02b0d2cc9fc0";
    const connection = useMemo(() => new Connection(heliusRpc), []);

    const metaplex = useMemo(() => {
        return Metaplex.make(connection)
            .use(walletAdapterIdentity(wallet))
            .use(bundlrStorage({
                address: "https://node1.bundlr.network",
                providerUrl: heliusRpc,
                timeout: 60000,
            }));
    }, [connection, wallet]);

    return metaplex;
}