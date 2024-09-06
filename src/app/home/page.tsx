'use client'
import React, { useState } from 'react'
import FeedCard from './feed';
import { FileUpload } from '@/components/ui/file-upload';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

const MainHomePage = () => {

  const [isUploadToggle, setIsUploadToggle] = useState(false);

  const handleUploadToggle = () => {
    console.log("Upload button clicked");
    setIsUploadToggle(prevState => !prevState);
  }
  return (
    <div className='flex-col'>
      <FeedCard />
{/*       
      <AddBoxOutlinedIcon
        onClick={() => handleUploadToggle()}
      /> */}
    </div>
  )
}

export default MainHomePage;