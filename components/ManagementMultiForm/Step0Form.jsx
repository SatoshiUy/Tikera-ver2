import * as React from "react";
import { Form, Button, Input, Select, notification, Card, Space, Typography, Col, Row, Descriptions } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import Meta from "antd/lib/card/Meta";

import LogoSvg from "../../public/svg/logo.svg";
import MenuSvg from "../../public/svg/menu.svg";
import CatelogueSvg from "../../public/svg/catelogue.svg";
import WebsiteSvg from "../../public/svg/website.svg";

import { serverTimestamp } from "firebase/firestore";
import Image from "next/image";
import LoadingPage from "../LoadingPage";

import {useCollection, useCollectionData, useDocument, useDocumentOnce} from 'react-firebase-hooks/firestore';
import { DiffOutlined, SettingOutlined } from "@ant-design/icons";
export default function Step0Form({ data, onSuccess }) {
  const [loggedInUser, loading, error] = useAuthState(auth);
  const [requirementList, setRequirementList] = React.useState([]);

  if(loading) return <LoadingPage />
  console.log("data form 0: ", data);

  // const [values] = useDocument(
  //   doc(db, `users`, `${loggedInUser?.uid}`),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );

  const q = query(collection(db, "requirements"), where("uid", "==", loggedInUser.uid));
  React.useEffect(
    () => {
      getDocs(q).then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setRequirementList(
          list
        );
      });
    }, []
  )

  

  const handleSearchCategory = async (category,requirementId) => {
    await onSuccess({
      ...data,
      uid: loggedInUser.uid,
      searchCategory: category,
      requirementId: requirementId
    });
  }


  return (
    
    <Row align="middle" style={{justifyContent:'center'}}>
      <Col span={22}>
      <Space direction="horizontal" size="large" wrap width={"100%"}>
        {requirementList.map((requirement) => (
          requirement?.bookDesignerUID
          ? (<></>)
        :(
          <Card
          hoverable
          style={{ width: 400,minHeight: 400}}
          cover={
            <div className="image_overlay" style={{padding: '20px 0'}}>
              <Image src={requirement.photoURL} width={240} height={240} alt="requirement Image"/>
            </div>
          }
          actions={[
            <Button type="primary" shape="round" icon={<DiffOutlined />} size="large" onClick={() => handleSearchCategory(requirement.category,requirement.requirementId)}>
              Chọn yêu cầu
            </Button>
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
        {/* {requirementList.map((requirement, index) => (
          (index<3) ? (
              <Card
            hoverable
            style={{ width: 240}}
            cover={
              <div className="image_overlay">
                <Image src={requirement.photoURL} width={200} height={200} alt="requirement Image"/>
              </div>
            }
            onClick={() => handleSelectCategory('logo')}
          >
            <Typography style={{fontWeight:'400', fontSize:'14px'}} align="left">Category: {requirement.category}</Typography>
            <Typography style={{fontWeight:'400', fontSize:'14px'}} align="left">Company Name: {requirement.companyName}</Typography>
            <Typography style={{fontWeight:'400', fontSize:'14px'}} align="left">Description: {requirement.description}</Typography>
            <Typography style={{fontWeight:'400', fontSize:'14px'}} align="left">Book: ...</Typography>
          </Card>
            )
          : null
          
        ))} */}
        
      </Space>
    </Col>

    </Row>
          
  );
}
