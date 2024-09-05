'use client'
import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';



const FeedCard = () => {
    const ipfsHashes = [
        "bafkreidgvzaybua26xwudyztqusbifzol5vmsjcybfv7xc3jksvyoewgnq",
        "bafybeihbep3mmcevogtrhk3ionk4cx4lfdzrax5l6ifgj4l4wfdiph2baa",
        "bafybeiackjb3p756alfnd2545itaua36yn7qc4i2wnfuddtqorlxnlqkgm",
        "bafybeih24jxktqxb5dybh6mdeawv2cig6lx6skrz2ggbeleemgm6ompswi",
        "bafybeigwzwscmua7wxgat6zwgc25xxnhqwfk7rjixnelsxx52dvf4ljz2a",
        "bafybeibu5dqeev4es72rchsrxi4fzblmyfsduywmlzyfvhgaqpi3orti5e",
    ];

    const [auraOpened, setAuraOpened] = useState(false);
    const [vibeOpened, setVibeOpened] = useState(false);

    const handleSwipe = (direction: string, index: number) => {
        console.log(`You swiped ${direction} on card ${index + 1}`);
    };

    function handleLightModeClick(index: number) {
        console.log("LightMode icon clicked for item", index);
        setAuraOpened(prevState => !prevState);
    }

    function handleWhatshotClick(index: number) {
        console.log("Whatshot icon clicked for item", index);
        setVibeOpened(prevState => !prevState);
    }

    return (
        <div className="mt-28 flex justify-center relative">
            <div className="w-[550px] relative">
                {ipfsHashes.map((hash, index) => (
                    <TinderCard
                        key={index}
                        onSwipe={(direction) => handleSwipe(direction, index)}
                    >
                        <Card className="w-full absolute pr-[60px]">
                            <CardHeader></CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <img
                                    src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${hash}`}
                                    alt={`Image from IPFS hash ${hash}`}
                                />
                                <div className="ml-[20px] mt-[100px] flex flex-col space-y-2">
                                    <div className='mb-[50px]'>
                                        <LightModeOutlinedIcon sx={{ fontSize: 50 }}
                                            onClick={() => handleLightModeClick(index)}
                                        />
                                    </div>
                                    <div>
                                        <WhatshotOutlinedIcon sx={{ fontSize: 50 }}
                                            onClick={() => handleWhatshotClick(index)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TinderCard>
                ))}
            </div>

            <div className="ml-[20px] right-[-250px] top-0 space-y-[20px]">
                {auraOpened && (
                    <Card className="w-[200px]">
                        <CardHeader>
                            <p>Aura</p>
                        </CardHeader>
                        <CardContent>
                            <p>Aura point</p>
                        </CardContent>
                    </Card>
                )}
                {vibeOpened && (
                    <Card className="w-[200px]">
                        <CardHeader>
                            <p>Vibe</p>
                        </CardHeader>
                        <CardContent>
                            <p>Vibe tag</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}


export default FeedCard;
