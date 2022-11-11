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

  const q = query(collection(db, "requirements"), where("uid", "==", loggedInUser.uid));

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
    <Row align="middle" style={{justifyContent:'center', alignItems:'center'}} justify='center'>
      <Col span={20}>
        <Space direction="horizontal" size="large" wrap width={"100%"} style={{justifyContent:'center', alignItems:'center'}}>
          {requirementList.map((requirement) => (
            <Card
            hoverable
            style={{ width: 1000,minHeight: 400}}
            cover={
              <>
                <Row>
                  <Col span={12}>
                    <div className="image_overlay" style={{padding: '20px 0', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <Image src={requirement.photoURL} width={240} height={240} alt="requirement Image"/>
                  </div>
                  </Col>
                  <Col span={12}>
                    <div className="image_overlay" style={{display: 'flex' , flexFlow: 'column', alignItems:'center', justifyContent:'center',padding:'10px 0', width:'400px', height:'400px'}}>
                      <Image src={requirement.designerInfo.photoURL} width={400} height={400}/>
                    </div>
                  </Col>
                </Row>
              </>
            }
            actions={[
              <Button type="primary" shape="round" icon={<DiffOutlined />} size="large" danger={requirement.isPayment ? false : true}>
                Tình trạng: {requirement.isPayment ? "Đã thanh toán" : "Chưa thanh toán"}
              </Button>,
              <Button type="outlined" shape="round" icon={<DiffOutlined />} size="large" onClick={() => router.push("https://tikera-chat.vercel.app/")}>
                Bấm vào đây để di chuyển đến kênh chat
              </Button>
            ]}
          >
          <Row>
            <Col span={12}>
              <Descriptions title={`Requirement ID:  ${requirement.requirementId}`} layout="vertical" column={2} bordered style={{textAlign: 'left' ,fontSize:"30px"}}>
                <Descriptions.Item label="Category">{requirement.category}</Descriptions.Item>
                <Descriptions.Item label="Company Name">{requirement.companyName}</Descriptions.Item>
                <Descriptions.Item label="Description" >{requirement.description}</Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={12}>
              <Descriptions title={`Designer:  ${requirement.designerInfo.username}`} size="small" layout="vertical" column={2} bordered style={{textAlign: 'left' ,fontSize:"30px"}}>
                <Descriptions.Item label="Emil">{requirement.designerInfo.email}</Descriptions.Item>
                <Descriptions.Item label="Position">{requirement.designerInfo.position}</Descriptions.Item>
                <Descriptions.Item label="Role">{requirement.designerInfo.role}</Descriptions.Item>
                <Descriptions.Item label="Strength" span={2}>{requirement.designerInfo.strength}</Descriptions.Item>
                <Descriptions.Item label="Description" span={2}>{requirement.designerInfo.description}</Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
          </Card>
          ))}
        </Space>
      </Col>
    </Row>
          
  );
}
