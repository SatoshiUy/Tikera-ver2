import * as React from "react";
import { Form, Button, Input, Select, notification, Card, Space, Typography, Col, Row, Avatar, Carousel } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import Meta from "antd/lib/card/Meta";

import { serverTimestamp } from "firebase/firestore";
import Image from "next/image";
import LoadingPage from "../LoadingPage";

import Payment from "../../public/payment.jpg";


import {SettingOutlined, EditOutlined, DiffOutlined} from "@ant-design/icons";
import {useCollection, useCollectionData, useDocument, useDocumentOnce} from 'react-firebase-hooks/firestore';
import  { useRouter } from "next/router";

export default function Step2Form({ data, onSuccess }) {
  const [loggedInUser, loading, error] = useAuthState(auth);
  const [designerList, setDesignerList] = React.useState([]);
  const router = useRouter();
  if(loading) return <LoadingPage />
  console.log("data form 2: ", data);
  

  const handlePayment = async () => {
    try {
      console.log("asdasd",data.requirementId);
      await setDoc(
        doc(db, "requirements", `${data.requirementId}`),
        {
          ...data,
          isPayment: false,
          bookDesignerUID: data.uid
        },
        {merge: true}
      )

      // await addDoc(collection(db, 'conversations'), {
      //   users: [loggedInUser?.email, data.bookDesignerEmail],       
      //   requirement: {
      //     ...data,
      //     isPayment: value
      //   }
      // })
      await router.push('/management');

    } catch(error) {
      notification.open({
        message: 'Error',
        description:`${error.message}`,
      });
    }
  }


  return (
    
    <Row align="top" style={{justifyContent:'space-around', marginTop: '-70px'}}>
      <Col span={5}>
      <Space direction="vertical" size="small">
          <div className="image_overlay" style={{height:'400px'}}>
            <Image src={Payment} alt="img" width={270} height={400}/>
          </div>
          <div style={{fontSize:'14px', fontWeight:'400'}}>Gửi đơn với nội dung: </div>
          <div style={{fontSize:'20px', fontWeight:'800'}}>{`Tikera Payment - ${data.requirementId}`}</div>
          <Button type="primary" onClick={() => handlePayment(false)} style={{marginTop:'30px'}}>Xác nhận đã chuyển</Button>
      </Space>
      </Col>
    </Row>
          
  );
}
