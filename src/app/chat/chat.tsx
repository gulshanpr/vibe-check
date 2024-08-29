'use client'
import React, { use, useEffect } from 'react'
import { Wallet } from 'ethers'
import { Client } from '@xmtp/xmtp-js'

const OpenChat = () => {
  useEffect(() => {
    const init = async () => {
      try {
      } catch (error) {
        console.error(error);
      } finally {
      }
    }
  }, [])

  const handleTest = async () => {

    const signer = Wallet.createRandom();
    console.log("Wallet address: " + signer.address);

    const xmtp = await Client.create(signer, { env: "dev" });
    console.log("Client created", xmtp.address);

    const WALLET_TO = "0x20B572bE48527a770479744AeC6fE5644F97678B";
    const isOnProdNetwork = await xmtp.canMessage(signer.address);
    console.log("Can message: " + isOnProdNetwork);

    const conversation = await xmtp.conversations.newConversation(WALLET_TO);
    console.log("Conversation created", conversation);

    const message = await conversation.send("gm");
    console.log("Message sent", message);

    for await (const message of await xmtp.conversations.streamAllMessages()) {
      console.log(`New message from ${message.senderAddress}: ${message.content}`);
    }
  }
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <button onClick={handleTest}>click me for testing</button>
    </div>
  )
}

export default OpenChat;