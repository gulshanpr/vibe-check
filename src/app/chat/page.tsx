'use client'
import React, { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import OpenChat from './chat';
import { initializeWeb3Auth, web3auth } from '@/utils/web3auth';
const publicKeyToAddress = require('ethereum-public-key-to-address');


const Chat = () => {


    useEffect(() => {
        const init = async () => {
            try {
                await initializeWeb3Auth();
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
            <OpenChat/>
        </div>
    )
}

export default Chat