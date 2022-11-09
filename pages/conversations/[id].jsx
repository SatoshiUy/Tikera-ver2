import { Card, Col, Descriptions, Row, Space } from 'antd';
import { doc, getDoc, getDocs } from 'firebase/firestore';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import CoversationScreen from '../../components/ConversationScreen';
import Sidebar from '../../components/Sidebar';
import { auth, db } from '../../config/firebase';

import { generateQueryGetMessages, tranformMessage } from "../../utils/getMessagesInConversationId"
import { getRecipientEmail } from "../../utils/getRecipientEmail"

function Conversations({conversation, messages}) {
  const [loggedInUser, _loading, _error] = useAuthState(auth)
  const router = useRouter();
  const {id} = router.query;

  const [paymentValue] = useDocument(
    doc(db, `requirements`, `${id}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );


  return (
    <>
      <Col>
        <Row>
          {'Conversation:: ' + id}
        </Row>
        <Row>
          {'Conversation:: ' + JSON.stringify(paymentValue?.data())}
        </Row>
      </Col>
      <Row>
      <Col span={8}>
        <Space direction="horizontal" size="large" wrap width={"100%"}>
            <Card
              hoverable
              style={{ width: 400,minHeight: 400}}
              cover={
                <div className="image_overlay" style={{padding: '20px 0'}}>
                  <Image src={paymentValue?.data()?.photoURL} width={240} height={240} alt="requirement Image"/>
                </div>
              }
            >
            <Descriptions title="Requirment Info" layout="vertical" column={2} bordered style={{textAlign: 'left'}}>
              <Descriptions.Item label="Category">{paymentValue?.data()?.category}</Descriptions.Item>
              <Descriptions.Item label="Company Name">{paymentValue?.data()?.companyName}</Descriptions.Item>
              <Descriptions.Item label="Description" >{paymentValue?.data()?.description}</Descriptions.Item>
            </Descriptions>
            </Card>
          </Space>
        </Col>
        <Col span={16}>
          Chat Box
        </Col>
      </Row>
    </>
  )
}

export default Conversations