import {notification} from 'antd';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

import { useRouter } from 'next/router';
import MainNavigation from '../../components/MainNavigation';
import MainFooter from '../../components/MainFooter';
import ProfileContainer from '../../containers/ProfileContainer';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

function Profile() {
  return (
    <Layout className="layout">
      <MainNavigation />
      <ProfileContainer />
      <MainFooter />
    </Layout>
  )
}

export default Profile