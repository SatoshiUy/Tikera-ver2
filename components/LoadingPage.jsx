import Image from 'next/image'
import React from 'react'
import LoadingGif from '../public/owner/loading.gif';
function LoadingPage() {
  return (
    <div style={{backgroundColor: 'black', position:'relative', height: '100vh'}} className="image_overlay">
      <Image src={LoadingGif} alt="loading" style={{
        width: '100%',
        position:'absolute',
        height: 'auto',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'}}/>
    </div>
  )
}

export default LoadingPage