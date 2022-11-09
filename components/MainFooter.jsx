import { Button, Col,  Dropdown,  Row, Space, Typography } from 'antd';
import {Layout, Menu } from 'antd';

const { Footer } = Layout;
import Tikera_Logo from '../public/owner/tikera_footer.png';
import Image from 'next/image';
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';

function MainFooter() {
  return (
    <div style={{width: '100%', display: 'flex', justifyContent:'center', backgroundColor: '#000D7E', fontWeight: '500', zIndex:'2'}}>
      <Footer style={{width: '70%',backgroundColor: '#000D7E'}}>
        <Space direction='vertical' style={{width: '100%'}} size='large'>
          <Row justify='space-between' align='bottom'>
            <Col span={10}>
              <Space direction='vertical' style={{fontSize: '16px'}}>
                <div className='image_overlay' style={{marginLeft: '-10px'}}>
                  <Image src={Tikera_Logo} alt="logo" height={40}/>
                </div>
                <Space>
                  <FacebookOutlined style={{fontSize:'25px', color: 'white'}}/>
                  <InstagramOutlined style={{fontSize:'25px', color: 'white'}}/>
                </Space>
                <Typography.Text style={{color: 'white'}}>Điện thoại: +84 (085) 5494978</Typography.Text>
                <Typography.Text style={{color: 'white'}}>Email: tikera.platform@gmail.com</Typography.Text>
              </Space>
            </Col>
            <Col span={14} >
              <Space direction='vertical' style={{width: '100%', fontSize: '16px'}} size='middle'>
                <div style={{borderBottom: 'white solid 2px'}}/>
                <Typography style={{color: 'white'}} align='right'>Về Tikera</Typography>
                <Typography style={{color: 'white'}} align='right'>Trợ giúp</Typography>
                <Typography style={{color: 'white'}} align='right'>Blog</Typography>
                </Space>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div style={{borderBottom: 'white solid 2px',marginBottom: '15px'}}/>
              <Space size="large">
                <Typography.Text style={{color: 'white'}}>Thỏa Thuận</Typography.Text>
                <Typography.Text style={{color: 'white'}}>|</Typography.Text>
                <Typography.Text style={{color: 'white'}}>Điều khoản sử dụng</Typography.Text>
                <Typography.Text style={{color: 'white'}}>|</Typography.Text>
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Typography.Text style={{color: 'white'}}>Quy Chế Hoạt Động Sàn Giao Dịch Thương Mại Điện Tử Tikera</Typography.Text>
              <div style={{borderBottom: 'white solid 2px', marginTop: '15px'}}/>
            </Col>
          </Row>
          <Row>
            <Col span={24} align='center'>
              <Typography style={{color: 'white'}}>Copyright 	&copy; 2021 Tikera Co., Ltd. All Right Reserved</Typography>
            </Col>
          </Row>
        </Space>
      </Footer>
    </div>
  )
}

export default MainFooter