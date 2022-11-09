import {notification} from 'antd';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';
import { useEffect,useState } from 'react';

import { useRouter } from 'next/router';
import MainNavigation from '../components/MainNavigation';
import MainFooter from '../components/MainFooter';
import LandingPageContainer from '../containers/LandingPageContainer';
import LoadingPage from '../components/LoadingPage';
import { addDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { Breadcrumb, Layout, Menu } from 'antd';
import { useDocument } from 'react-firebase-hooks/firestore';
const { Header, Content, Footer } = Layout;

const Home = () => {
	const [loggedInUser, loading, error] = useAuthState(auth);
  const [role, setRole] = useState(null);
  console.log("da dang nhap", loggedInUser);
	const router = useRouter();

  useEffect(() => {
    const setUserInFirebase = async () => {
      try {
        const docRef = await doc(db, "users", `${loggedInUser?.uid}`);
        getDoc(docRef)
        .then((docSnap) => {
          console.log("user data",docSnap.data())
          setRole(docSnap?.data()?.role)
        })
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
        {role && <MainNavigation />}
				
				<LandingPageContainer />
				<MainFooter />
			</Layout>
	);
};

export default Home;
