import { DiffOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Col, Modal, Row, Select, Space, Typography } from 'antd'

import Tikera_Hero from '../../public/landing_page/hero.png';
import Tikera_Background from '../../public/landing_page/landingPageBackground.png';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import StepFormAccount from '../StepFormAccount';
import { doc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';

function Banner() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };

  
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };


// step
  
const [loggedInUser] = useAuthState(auth);
const [value] = useDocument(
  doc(db, `users`, `${loggedInUser?.uid}`),
  {
    snapshotListenOptions: { includeMetadataChanges: true },
  }
);
  const role = value?.data()?.role;


  return (
    <>
      <div className='image_ovelay'>
        <Image src={Tikera_Background} alt="hero" width={1600} style={{position: 'fixed', zIndex:'1'}}/>
      </div>
      <Row style={{width:'100%', height: '100vh',minHeight:'500px', backgroundColor: 'transparent', zIndex:'2'}} align="middle">
        <Col span={10} offset={3}>
          <Space direction='vertical' size='middle'>
            <Typography style={{color: '#002CB0', fontWeight: 'bold', fontSize:'40px'}}>Hãy cùng chúng tôi sáng tạo nên thương hiệu của bạn!</Typography>
            <Typography style={{fontSize:'15px'}}>
              Tikera sẽ giúp cho bạn lan tỏa thương hiệu của chính bản thân đến với mọi người bằng những sản phẩm mang phong cách của chính bản thân bạn. 
            </Typography>
            <Typography style={{fontSize:'15px', color: '#FFBD00', fontWeight:'500'}}>
              Còn chần chờ gì nữa?
            </Typography>
            <Row>
              <Col flex='100px'>
                <Button type="primary" shape="round" icon={<DiffOutlined />} size="large" onClick={showModal}>
                  Bắt đầu ngay!
                </Button>
              </Col>
            </Row>
          </Space>
        </Col>
        <Col span={8} offset={2}>
          <div cl assName='image_overlay' style={{marginLeft: '-10px'}}>
            <Image src={Tikera_Hero} alt="hero" width={400}/>
          </div>
        </Col>
      </Row>
      <Modal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        closable = {false}
        width={600}
        footer={value?.data()?.strength ? <Button type='primary' onClick={handleCancel}>Done</Button> : <Button type='primary' disabled>Done</Button>}
      >
        <StepFormAccount value={value?.data()} handleCancel={handleCancel}/>
      </Modal>
    </>
  )
}

export default Banner