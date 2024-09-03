import React from 'react'
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import Image from 'next/image';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import { yellow } from '@mui/material/colors';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const Components = () => {
    return (
        <div className='flex space-x-4'>
            <div>
                <NeonGradientCard className="max-w-sm items-center justify-center text-center">
                    <div className='flex justify-center'>
                        <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                            <Image src="/images/image.png" alt="dogo" width={100} height={100} />
                        </span>
                    </div>
                    <div className='flex justify-center'>
                        <AnimatedSubscribeButton
                            buttonColor="#000000"
                            buttonTextColor="#ffffff"
                            subscribeStatus={false}
                            initialText={
                                <span className="group inline-flex items-center">
                                    buy
                                </span>
                            }
                            changeText={
                                <span className="group inline-flex items-center">
                                    brought
                                </span>
                            }
                            pendingText={
                                <span className="group inline-flex items-center">
                                    buying...
                                </span>
                            }
                        />
                    </div>

                </NeonGradientCard>
            </div>
            <div>

            </div>
            <div>
                <NeonGradientCard className="max-w-sm items-center justify-center text-center">
                    <div className="text-2xl font-semibold leading-none tracking-tight ">
                        <p>Buy Aura Point</p>
                    </div>
                    <LightModeOutlinedIcon sx={{ fontSize: 90, color: yellow[500] }} />

                    {/* <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                Buy Aura Point
              </span> */}
                    <div className='flex justify-center'>
                        <AnimatedSubscribeButton
                            buttonColor="#000000"
                            buttonTextColor="#ffffff"
                            subscribeStatus={false}
                            initialText={
                                <span className="group inline-flex items-center">
                                    buy
                                </span>
                            }
                            changeText={
                                <span className="group inline-flex items-center">
                                    brought
                                </span>
                            }
                            pendingText={
                                <span className="group inline-flex items-center">
                                    buying...
                                </span>
                            }
                        />
                    </div>
                </NeonGradientCard>
            </div>
            <div>
                <NeonGradientCard className="max-w-sm items-center justify-center text-center">
                    <div className="text-2xl font-semibold leading-none tracking-tight ">
                        <p>Swap/trade Aura Point</p>
                    </div>
                    <WhatshotOutlinedIcon sx={{ fontSize: 90, color: yellow[500] }} />

                    {/* <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                Swap/trade Aura Point
    
              </span> */}
                    <div className='flex justify-center'>
                        <AnimatedSubscribeButton
                            buttonColor="#000000"
                            buttonTextColor="#ffffff"
                            subscribeStatus={false}
                            initialText={
                                <span className="group inline-flex items-center">
                                    buy
                                </span>
                            }
                            changeText={
                                <span className="group inline-flex items-center">
                                    brought
                                </span>
                            }
                            pendingText={
                                <span className="group inline-flex items-center">
                                    buying...
                                </span>
                            }
                        />
                    </div>

                </NeonGradientCard>
            </div>
            <div>
                <NeonGradientCard className="max-w-sm items-center justify-center text-center">
                    {/* <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                Buy Custom Vibe-tags
              </span> */}
                    <div className='flex justify-center'>
                        <AnimatedSubscribeButton
                            buttonColor="#000000"
                            buttonTextColor="#ffffff"
                            subscribeStatus={false}
                            initialText={
                                <span className="group inline-flex items-center">
                                    buy
                                </span>
                            }
                            changeText={
                                <span className="group inline-flex items-center">
                                    brought
                                </span>
                            }
                            pendingText={
                                <span className="group inline-flex items-center">
                                    buying...
                                </span>
                            }
                        />
                    </div>
                </NeonGradientCard>
            </div>

            <div>
                <NeonGradientCard className="max-w-sm items-center justify-center text-center">
                    <div className="text-2xl font-semibold leading-none tracking-tight ">
                        <p>do something</p>
                    </div>

                    <WhatshotOutlinedIcon sx={{ fontSize: 90, color: yellow[500] }} />

                    {/* <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                Swap/trade Aura Point
    
              </span> */}
                    <div className='flex justify-center'>
                        <AnimatedSubscribeButton
                            buttonColor="#000000"
                            buttonTextColor="#ffffff"
                            subscribeStatus={false}
                            initialText={
                                <span className="group inline-flex items-center">
                                    buy
                                </span>
                            }
                            changeText={
                                <span className="group inline-flex items-center">
                                    brought
                                </span>
                            }
                            pendingText={
                                <span className="group inline-flex items-center">
                                    buying...
                                </span>
                            }
                        />
                    </div>

                </NeonGradientCard>
            </div>
        </div>
    )
}

export default Components;