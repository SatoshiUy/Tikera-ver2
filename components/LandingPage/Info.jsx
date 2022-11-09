import { SearchOutlined } from '@ant-design/icons'
import { Button, Col, Row, Select, Space, Typography } from 'antd'

import Tikera_Hero from '../../public/landing_page/hero.png';
import Tikera_Background from '../../public/landing_page/landingPageBackground.png';
import Image from 'next/image';

import InfoPageCard from '../InfoPageCard';

function Info() {
  return (
    <>
      <Row style={{width:'100%', height: '100vh',minHeight:'500px', backgroundColor: 'transparent', zIndex:'2'}} align="middle">
        <Space direction='vertical' size='large'>
          <Col span={24} align='center'>
            <Space direction='vertical' size='middle'>
              <Typography style={{color: '#002CB0', fontWeight: 'bold', fontSize:'40px'}}>
                Sự tiện lợi đến từ TIKERA!
                <Typography style={{width: '100px', borderTop: '#002CB0 solid 5px', transform: 'translateX(-200%)'}} align='left' />
              </Typography>
            </Space>
          </Col>
          <Col span={18} offset={3} align='center'>
            <Row gutter={180}>
              <InfoPageCard cardNumber={0}/>
              <InfoPageCard cardNumber={1}/>
              <InfoPageCard cardNumber={2}/>
            </Row>
          </Col>
          <Col span={20} offset={2} align='center'>
            <Button type='primary'>
              Bắt đầu ngay!
            </Button>
          </Col>
        </Space>
      </Row>
    </>
  )
}

export default Info