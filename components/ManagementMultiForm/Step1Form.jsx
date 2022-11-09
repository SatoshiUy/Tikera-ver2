import * as React from "react";
import { Form, Button, Input, Select, notification, Card, Space, Typography, Col, Row, Avatar, Carousel } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import Meta from "antd/lib/card/Meta";

import { serverTimestamp } from "firebase/firestore";
import Image from "next/image";
import LoadingPage from "../LoadingPage";

import EmptySvg from "../../public/svg/empty.svg";


import {SettingOutlined, EditOutlined, DiffOutlined} from "@ant-design/icons";
import {useCollection, useCollectionData, useDocument, useDocumentOnce} from 'react-firebase-hooks/firestore';
export default function Step0Form({ data, onSuccess }) {
  const [loggedInUser, loading, error] = useAuthState(auth);
  const [designerList, setDesignerList] = React.useState([]);

  if(loading) return <LoadingPage />
  console.log("data form 1: ", data);

  // const [values] = useDocument(
  //   doc(db, `users`, `${loggedInUser?.uid}`),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );

  const q = query(collection(db, "users"), where("strength", "==", data.searchCategory));
  React.useEffect(
    () => {
      getDocs(q).then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setDesignerList(
          list
        );
      });
    }, []
  )

  

  const handleBook = async (value) => {
    try {
      await setDoc(
        doc(db, 'requirements', `${data.randomNumber}`),
        {
          ...data,
          bookDesignerId: value
        },
        {merge: true}
      )
    } catch(error) {
      notification.open({
        message: 'Error',
        description:`${error.message}`,
      });
    }

    await onSuccess({
      ...data,
      bookDesignerEmail: value
    });
  }

  return (
    
    <Row align="top" gutter={[20,20]} style={{justifyContent:'space-around'}}>
      {designerList.map((designer) => (
        <Col>
          <Card
          hoverable
          style={{ width: 400,minHeight: 400}}
          cover={
            designer?.imageInfo ? (
              <Carousel autoplay>
              {
                designer?.imageInfo?.map((image) => (
                  <div>
                    <h3 className="contentStyle">
                      <div className="image_overlay">
                        <Image src={image.linkImg} width={400} height={400} alt="requirement Image"/>
                      </div>
                    </h3>
                  </div>
                ))
              }
              </Carousel>
            ) : (
              <div className="image_overlay" style={{display: 'flex' , flexFlow: 'column', alignItems:'center', justifyContent:'center',padding:'10px 0', width:'400px', height:'400px'}}>
                <Image src={EmptySvg} width={100} height={100} alt="empty Image"/>
                <Typography.Text style={{fontSize: 20}}>No Image</Typography.Text>
              </div>
            )
          }
          actions={[
            <Button type="primary" shape="round" icon={<DiffOutlined />} size="large" onClick={() => handleBook(designer.email)}>
              Book Designer
            </Button>
          ]}
        >
          
          <Meta
            avatar={<Avatar src={designer.photoURL} size="large" />}
            title={designer.username}
            description={designer.email}
            style={{padding:'20px'}}
          />
          <Typography style={{fontWeight:'400', fontSize:'14px'}} align="left">Position: {designer.position}</Typography>
          <Typography style={{fontWeight:'400', fontSize:'14px'}} align="left">Role: {designer.role}</Typography>
          <Typography style={{fontWeight:'400', fontSize:'14px'}} align="left">Strength: {designer.strength}</Typography>
          <Typography style={{fontWeight:'400', fontSize:'14px'}} align="left">Description: {designer.description}</Typography>
        </Card>
      </Col>
      ))}
    </Row>
          
  );
}
