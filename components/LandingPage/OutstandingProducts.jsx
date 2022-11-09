import { SearchOutlined } from '@ant-design/icons'
import { Button, Col, Rate, Row, Select, Space, Typography } from 'antd'

import Tikera_Hero from '../../public/landing_page/hero.png';
import Tikera_Background from '../../public/landing_page/landingPageBackground.png';
import Image from 'next/image';

import OutstandingProductsCard from '../OutstandingProductsCard';

function OutstandingProducts() {
  return (
    <>
      <Row style={{width:'100%', padding: '40px 0',minHeight: '100vh',minHeight:'500px', backgroundColor: 'transparent', zIndex:'2'}} align="middle">
        <Space direction='vertical' size='large' style={{width: '100%'}}>
          <Col span={24} align='center'>
            <Space direction='vertical' size='large'>
              <Typography style={{color: '#002CB0', fontWeight: 'bold', fontSize:'40px'}}>
                NHỮNG SẢN PHẨM NỔI BẬT !
              </Typography>
              <Typography style={{width: '100px', borderTop: '#002CB0 solid 5px', transform: 'translateX(-240%)'}} align='left' />
            </Space>
          </Col>
          <Col span={18} offset={3} align='center'>
            <Row gutter={100}>
              <OutstandingProductsCard cardNumber={0}/>
              <OutstandingProductsCard cardNumber={1}/>
              <OutstandingProductsCard cardNumber={2}/>
            </Row>
          </Col>
          <Col span={18} offset={3} align='center'>
            <Row gutter={100}>
              <OutstandingProductsCard cardNumber={3}/>
              <OutstandingProductsCard cardNumber={4}/>
              <OutstandingProductsCard cardNumber={5}/>
            </Row>
          </Col>
        </Space>
      </Row>
    </>
  )
}

export default OutstandingProducts