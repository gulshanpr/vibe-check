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
import Components from './card';
import Testing from './test';


const page = () => {
  return (
    <div>
      <Components/>
      <Testing/>
    </div>
  )
}

export default page