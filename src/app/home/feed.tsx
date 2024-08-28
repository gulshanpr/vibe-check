'use client'
import React from 'react'
import TinderCard from 'react-tinder-card'
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faFire } from '@fortawesome/free-solid-svg-icons'


const FeedCard = () => {
    const ipfsHashes = [
        "bafkreidgvzaybua26xwudyztqusbifzol5vmsjcybfv7xc3jksvyoewgnq",
        "bafybeihbep3mmcevogtrhk3ionk4cx4lfdzrax5l6ifgj4l4wfdiph2baa",
        "bafybeiackjb3p756alfnd2545itaua36yn7qc4i2wnfuddtqorlxnlqkgm",
        "bafybeih24jxktqxb5dybh6mdeawv2cig6lx6skrz2ggbeleemgm6ompswi",
        "bafybeigwzwscmua7wxgat6zwgc25xxnhqwfk7rjixnelsxx52dvf4ljz2a",
    ];

    const handleSwipe = (direction: string, index: number) => {
        console.log(`You swiped ${direction} on card ${index + 1}`);
    };

    return (
        <div className="mt-28 flex justify-center">
            <div className="w-[550px] relative">
                {ipfsHashes.map((hash, index) => (
                    <TinderCard
                        key={index}
                        onSwipe={(direction) => handleSwipe(direction, index)}
                    >
                        <Card className="w-full absolute">
                            <CardHeader>
                            </CardHeader>
                            <CardContent>
                                <img
                                    src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${hash}`}
                                    alt={`Image from IPFS hash ${hash}`}
                                />
                                <div className=''>
                                    <FontAwesomeIcon icon={faSun} className='h-8' />
                                    <FontAwesomeIcon icon={faFire} className='h-8' />
                                </div>
                            </CardContent>
                        </Card>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default FeedCard;
