'use client'
import React from 'react'
import FeedCard from './feed';
import { FileUpload } from '@/components/ui/file-upload';

const MainHomePage = () => {
  return (
    <div>
      <FeedCard />
      {/* <FileUpload /> */}
    </div>
  )
}

export default MainHomePage;