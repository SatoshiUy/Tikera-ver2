import { SearchOutlined } from '@ant-design/icons'
import { Button, Col, Rate, Row, Select, Space, Typography } from 'antd'

import Tikera_Hero from '../../public/landing_page/hero.png';
import Tikera_Background from '../../public/landing_page/landingPageBackground.png';
import Image from 'next/image';

import DesignerSuggestionsCard from '../DesignerSuggestionsCard';

function DesignerSuggestions() {
  return (
    <>
      <Row style={{width:'100%', padding: '40px 0',minHeight: '100vh',minHeight:'500px', backgroundColor: 'transparent', zIndex:'2'}} align="middle">
        <Space direction='vertical' size='large' style={{width: '100%'}}>
          <Col span={24} align='center'>
            <Space direction='vertical' size='large'>
              <Typography style={{color: '#002CB0', fontWeight: 'bold', fontSize:'40px'}}>
                NHỮNG NHÀ THIẾT KẾ NỔI BẬT !
              </Typography>
              <Typography style={{width: '100px', borderTop: '#002CB0 solid 5px', transform: 'translateX(-260%)'}} align='left' />
            </Space>
          </Col>
          <Col span={18} offset={3} align='center'>
            <Row gutter={100}>
              <DesignerSuggestionsCard cardNumber={0}/>
              <DesignerSuggestionsCard cardNumber={1}/>
              <DesignerSuggestionsCard cardNumber={2}/>
            </Row>
          </Col>
          <Col span={18} offset={3} align='center'>
            <Row gutter={100}>
              <DesignerSuggestionsCard cardNumber={3}/>
              <DesignerSuggestionsCard cardNumber={4}/>
              <DesignerSuggestionsCard cardNumber={5}/>
            </Row>
          </Col>
          <Col span={20} offset={2} align='center'>
            <Rate allowHalf defaultValue={4.5} />
            <Typography style={{fontWeight: '400', fontSize:'16px'}}>
              Đây là những nhà thiết kế với lượt rating trung bình 4.5 /5 Sao từ hơn 32,895 người dùng
            </Typography>
          </Col>
        </Space>
      </Row>
    </>
  )
}

export default DesignerSuggestions