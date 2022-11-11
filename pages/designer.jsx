import {notification} from 'antd';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';
import { useEffect } from 'react';

import { useRouter } from 'next/router';
import MainNavigation from '../components/MainNavigation';
import MainFooter from '../components/MainFooter';
import { addDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import LoadingPage from '../components/LoadingPage';

import { Breadcrumb, Layout, Menu } from 'antd';
import DesignerContainer from '../containers/DesignerContainer';
const { Header, Content, Footer } = Layout;

const Home = () => {
	const [loggedInUser, loading, error] = useAuthState(auth);
  console.log("da dang nhap", loggedInUser);
	const router = useRouter();

  useEffect(() => {
    const setUserInFirebase = async () => {
      try {
        await setDoc(
          doc(db, 'users', loggedInUser.uid),
          {
            email: loggedInUser.email,
            lastSeen: serverTimestamp(),
          },
          {merge: true}
        )
      } catch(error) {
        notification.open({
          message: 'Error',
          description:`${error.message}`,
        });
      }
    }
    if (loggedInUser){
      setUserInFirebase();
    }
  }
  , [loggedInUser])

  if (loading) return <LoadingPage />
  
  if (!loggedInUser){
    router.push('/authenticate/login');
	}

	return (			
			<Layout className="layout">
				<MainNavigation />
				<DesignerContainer />
				<MainFooter />
			</Layout>
	);
};

export default Home;
