import '../styles/App.scss';
// import '../styles/globals.css';

import { Provider } from 'react-redux';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store } from '../store';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';
import { useEffect } from 'react';

import { useRouter } from 'next/router';
import LoginContainer from '../containers/LoginContainer';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { notification } from 'antd';


function MyApp({ Component, pageProps }) {
	const persistor = getPersistor();

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Component {...pageProps} />
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
