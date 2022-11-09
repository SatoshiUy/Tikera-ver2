import { Button, Col,  Dropdown,  Row, Space } from 'antd';
import {Layout, Menu } from 'antd';

const { Header } = Layout;

import Tikera_Logo from '../public/owner/tikera_logo.png';
import Image from 'next/image';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

// const handleMenuClick = e => {
//   message.info('Click on menu item.');
//   console.log('click', e);
// };




function MainNavigation() {
  const [loggedInUser, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState(router.pathname);

  console.log('currentRoute: ', currentRoute);
  const items = [
    {
      label: 'Profile',
      key: '1',
      icon: <UserOutlined />,
      onClick: () => {
        router.push('/profile');
      }
    },
    {
      label: 'Logout',
      key: '2',
      icon: <LogoutOutlined />,
      onClick: () => {
        signOut(auth);
      }
    },
  ];

  const menuProps = {
    items,
  };

  return (
    <>
      <Header style={{position:'fixed',top:'0', right:'0', left:'0', backgroundColor: '#F8F8F8', zIndex:'200'}}>
      <Row style={{backgroundColor: '#F8F8F8',zIndex:'2'}}>
        <Col flex="100px" style={{backgroundColor: '#F8F8F8'}}>
          <Link href='/' className='image_overlay'>
            <Image src={Tikera_Logo} alt="logo" height={40}/>
          </Link>
        </Col>
        <Col flex="auto">
          <Menu mode="horizontal" defaultSelectedKeys={[currentRoute]}>
            <Menu.Item key="/" onClick={() => {
              router.push('/')
            }}>
              Trang Chủ
            </Menu.Item>
            <Menu.Item key="/requirement" onClick={() => {
              router.push('/requirement')
            }}>
              Tạo Yêu cầu
            </Menu.Item>
            <Menu.Item key="/management" onClick={() => {
              router.push('/management')
            }}>
              Quản lí sản phẩm
            </Menu.Item>
            {/* <Menu.SubMenu key="SubMenu" title="Dành cho nhà thiết kế">
              <Menu.ItemGroup title="Bạn là...">
                <Menu.Item key="two">
                  Nhà thiết kế
                </Menu.Item>
                <Menu.Item key="three">
                  Khách hàng
                </Menu.Item>
              </Menu.ItemGroup>
            </Menu.SubMenu> */}
          </Menu>
        </Col>
        <Col flex="100px">
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                {loggedInUser?.email}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Col>
      </Row>
    </Header>
    </>
  )
}

export default MainNavigation