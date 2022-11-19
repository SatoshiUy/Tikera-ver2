import React from 'react'
import Profile_Background from '../public/profile/profile_background.png';
import Profile_Background_Wall from '../public/profile/profile_background_wall.png';
import Image from 'next/image';
import { Affix, Button, Col, Space, Typography } from 'antd';
import ListProductImage from '../components/ListProductImage';
import ProfileCard from '../components/ProfileCard';

function ProfileContainer() {
  return (
    <div style={{position: 'relative', overflow:'hidden', padding:'40px 0'}}>
      <div className='image_ovelay' style={{height: '100%', position:'fixed', top:'0', left:'0', bottom:'0', zIndex:'0'}}>
        <Image src={Profile_Background_Wall} alt="hero" width={1600} style={{zIndex:'1', position:'absolute', maxWidth: '100vw'}}/>
      </div>
      <div className='image_ovelay' style={{zIndex:"2", position:'relative'}}>
        <Image src={Profile_Background} alt="hero" width={1600} style={{zIndex:'2'}}/>
      </div>
      <div style={{position:'absolute', backgroundColor:'white', width: '400px', minHeight:'110vh', top: '200px', left: '100px', zIndex:'10',boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
      <ProfileCard />
      </div>
      <Col span={14} offset={9} style={{zIndex:5, marginTop:'30px'}}>
        <Space direction='vertical' size='large' style={{width:'100%'}}>
        <Typography.Text style={{fontWeight:'bold', fontSize: '30px'}}>Sản phẩm</Typography.Text>
        <ListProductImage />
        </Space>
      </Col>
    </div>
  )
}

export default ProfileContainer