import * as React from "react";
import { Form, Button, Input, Select, notification, Card, Space, Typography, Col, Row, Descriptions } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";


import Image from "next/image";
import LoadingPage from "./LoadingPage";

import {useCollection, useCollectionData, useDocument, useDocumentOnce} from 'react-firebase-hooks/firestore';
import { DiffOutlined, SettingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
export default function Step0Form({ data, onSuccess }) {
  const [loggedInUser, loading, error] = useAuthState(auth);
  const [requirementList, setRequirementList] = React.useState([]);

  if(loading) return <LoadingPage />
  const router = useRouter()

  const q = query(collection(db, "requirements"), where("bookDesignerUID", "==", loggedInUser.uid));

  React.useEffect(
    () => {
      getDocs(q).then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          if(doc.data().bookDesignerUID){
            list.push(doc.data());
          }
        });
        setRequirementList(
          list
        );
      });
    }, []
  )

  return (
    <Row align="middle" style={{justifyContent:'center'}}>
      <Col span={22}>
      <Space direction="horizontal" size="large" wrap width={"100%"}>
        {requirementList.map((requirement) => (
          
          (
            <Card
              hoverable
              style={{ width: 400,minHeight: 400}}
              cover={
                <div className="image_overlay" style={{padding: '20px 0'}}>
                  <Image src={requirement.photoURL} width={240} height={240} alt="requirement Image"/>
                </div>
              }
              actions={[
                <Space direction="vertical">
                  <Button type="primary" shape="round" icon={<DiffOutlined />} size="large" danger={requirement.isPayment ? false : true}>
                  Tình trạng: {requirement.isPayment ? "Đã thanh toán" : "Chưa thanh toán"}
                  </Button>
                  <Button type="outlined" shape="round" icon={<DiffOutlined />} size="large" onClick={() => router.push("https://tikera-chat.vercel.app/")}>
                    Bấm vào đây để di chuyển đến kênh chat
                  </Button>
                </Space>
              ]}
            >
            <Descriptions title={`Requirement ID:  ${requirement.requirementId}`} layout="vertical" column={2} bordered style={{textAlign: 'left' ,fontSize:"30px"}}>
              <Descriptions.Item label="Category">{requirement.category}</Descriptions.Item>
              <Descriptions.Item label="Company Name">{requirement.companyName}</Descriptions.Item>
              <Descriptions.Item label="Description" >{requirement.description}</Descriptions.Item>
            </Descriptions>
          </Card>
          )
        ))}
      </Space>
    </Col>

    </Row>
          
  );
}
