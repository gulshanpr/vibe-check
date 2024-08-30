'use client'
import React, { useEffect, useRef, useState } from 'react';
import { initializeWeb3Auth, web3auth } from '@/utils/web3auth';
import { Client } from "@xmtp/xmtp-js";
import { ethers, Signer } from 'ethers';

const XMTPChat = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [signer, setSigner] = useState(null);
  const [isXmtpInitialized, setIsXmtpInitialized] = useState(false);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [peerAddress, setPeerAddress] = useState('');
  const [currentPeerAddress, setCurrentPeerAddress] = useState('');
  const [conversations, setConversations] = useState([]);
  const clientRef = useRef(null);
  const conversationRef = useRef(null);

  useEffect(() => {
    initializeWeb3Auth();
  }, []);

  useEffect(() => {
    if (isConnected && !isXmtpInitialized) {
      initXmtp();
    }
  }, [isConnected, isXmtpInitialized]);

  useEffect(() => {
    if (isXmtpInitialized) {
      listenForNewConversations();
    }
  }, [isXmtpInitialized]);

  const connectWallet = async () => {
    try {
      if (web3auth.connected) {
        const provider = new ethers.providers.Web3Provider(web3auth.provider);
        const signer = provider.getSigner();
        setSigner(signer);
        const address = await signer.getAddress();
        setAddress(address);
        setIsConnected(true);
      } else {
        console.log('Not connected');
      }
    } catch (error) {
      console.log('Error connecting wallet:', error);
    }
  };

  const initXmtp = async () => {
    if (!signer) {
      console.log('Signer is not available');
      return;
    }
    try {
      const xmtp = await Client.create(signer, { env: "dev" });
      clientRef.current = xmtp;
      setIsXmtpInitialized(true);
      loadConversations();
    } catch (error) {
      console.log('Error initializing XMTP client:', error);
    }
  };

  const loadConversations = async () => {
    try {
      const convos = await clientRef.current.conversations.list();
      setConversations(convos);
      for (const conversation of convos) {
        const msgs = await conversation.messages({
          startTime: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
          endTime: new Date(),
        });
        setMessages(prev => ({
          ...prev,
          [conversation.peerAddress]: msgs
        }));
      }
    } catch (error) {
      console.log('Error loading conversations:', error);
    }
  };

  const listenForNewConversations = async () => {
    try {
      const stream = await clientRef.current.conversations.stream();
      for await (const conversation of stream) {
        console.log(`New conversation started with ${conversation.peerAddress}`);
        setConversations(prev => [...prev, conversation]);
        listenForMessages(conversation);
      }
    } catch (error) {
      console.log('Error listening for new conversations:', error);
    }
  };

  const listenForMessages = async (conversation) => {
    try {
      for await (const message of await conversation.streamMessages()) {
        setMessages(prev => ({
          ...prev,
          [conversation.peerAddress]: [...(prev[conversation.peerAddress] || []), message]
        }));
      }
    } catch (error) {
      console.log('Error listening for messages:', error);
    }
  };

  const startNewConversation = async () => {
    if (!clientRef.current || !peerAddress) {
      console.log('XMTP client not initialized or peer address not set');
      return;
    }
    try {
      if (await clientRef.current.canMessage(peerAddress)) {
        const conversation = await clientRef.current.conversations.newConversation(peerAddress);
        conversationRef.current = conversation;
        setCurrentPeerAddress(peerAddress);
        setConversations(prev => [...prev, conversation]);
        listenForMessages(conversation);
      } else {
        console.log("Can't message because the user is not on the network.");
      }
    } catch (error) {
      console.log('Error starting new conversation:', error);
    }
  };

  const sendMessage = async () => {
    if (conversationRef.current && newMessage.trim() !== '') {
      try {
        await conversationRef.current.send(newMessage);
        setNewMessage('');
      } catch (error) {
        console.log('Error sending message:', error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {!isConnected ? (
        <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded">
          Connect Wallet
        </button>
      ) : !isXmtpInitialized ? (
        <div>Initializing XMTP...</div>
      ) : (
        <div className="w-full max-w-4xl flex">
          <div className="w-1/3 pr-4">
            <h2 className="text-xl font-bold mb-4">Conversations</h2>
            {conversations.map((conv, index) => (
              <div 
                key={index} 
                className={`p-2 mb-2 cursor-pointer ${conv.peerAddress === currentPeerAddress ? 'bg-blue-100' : 'bg-gray-100'}`}
                onClick={() => {
                  setCurrentPeerAddress(conv.peerAddress);
                  conversationRef.current = conv;
                }}
              >
                {conv.peerAddress}
              </div>
            ))}
            <div className="mt-4">
              <input
                type="text"
                value={peerAddress}
                onChange={(e) => setPeerAddress(e.target.value)}
                className="w-full border rounded px-4 py-2"
                placeholder="Enter new peer address"
              />
              <button onClick={startNewConversation} className="mt-2 bg-purple-500 text-white px-4 py-2 rounded w-full">
                Start New Chat
              </button>
            </div>
          </div>
          <div className="w-2/3">
            {currentPeerAddress && (
              <>
                <h2 className="text-xl font-bold mb-4">Chat with {currentPeerAddress}</h2>
                <div className="bg-gray-100 p-4 rounded-lg mb-4 h-96 overflow-y-auto">
                  {messages[currentPeerAddress]?.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.senderAddress === address ? 'text-right' : 'text-left'}`}>
                      <span className={`inline-block p-2 rounded ${msg.senderAddress === address ? 'bg-blue-200' : 'bg-gray-200'}`}>
                        {msg.content}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-grow border rounded-l px-4 py-2"
                    placeholder="Type a message..."
                  />
                  <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r">
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default XMTPChat;
