'use client'
import React from 'react'
import DragDropUpload from './upload'
import FeedCard from './feed';
import { FileUpload } from '@/components/ui/file-upload';

const MainHomePage = () => {
  return (
    <div>
      {/* <DragDropUpload/> */}
      <FeedCard/>
      <FileUpload/>
    </div>
  )
}

export default MainHomePage;