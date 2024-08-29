'use client'
import React, { useEffect } from 'react'
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import publicKeyToAddress from 'ethereum-public-key-to-address';

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xaa36a7",
    rpcTarget: "https://rpc.ankr.com/eth_sepolia",
    displayName: "Ethereum Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
});

const web3auth = new Web3Auth({
    clientId: clientId ?? "",
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    privateKeyProvider,
});

const Chat = () => {


    useEffect(() => {
        const init = async () => {
            try {
                await web3auth.initModal();
            } catch (error) {
                console.error(error);
            } finally {
            }
        };

        init();
    }, []);


    const handlePubKey = async () => {
        try {
            const { idToken } = await web3auth.authenticateUser();
            const decode: { wallets: { public_key: string }[] } = jwtDecode(idToken);

            console.log(decode);

            const publicKey = decode.wallets[0].public_key;
            const pk = publicKeyToAddress(publicKey || '')

            console.log(pk);


        } catch (error) {
            console.error(error);
        }
    }

    const handleStatus = async () => {
        try {
            const status = await web3auth.connected;
            console.log(status);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <button onClick={handlePubKey}>get public key</button>
            <button onClick={handleStatus}>wallet status</button>
        </div>
    )
}

export default Chat