import { async } from '@firebase/util';
import { Button, Card, Checkbox, Col, Form, Input, notification, Row } from 'antd';
import { addDoc, collection, doc, getDoc, query, setDoc } from 'firebase/firestore';
import Router, { useRouter } from 'next/router';
import React from 'react';
import MainFooter from '../components/MainFooter';
import MainNavigation from '../components/MainNavigation';
import { db } from '../config/firebase';


const AdminPage = () => {
  const [requirement, setRequirementList] = React.useState();
  const router = useRouter();

  const onFinish = async (values) => {
    const {token, requirementId} = values;

    console.log(token, requirementId);

    if(token == "3b934920-408c-4580-aea9-6e3ca2a2fa6e"){

      const docRef = doc(db, "requirements", `${requirementId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        notification.success({
          message: `Đơn ${requirementId}`,
          description:
            `Đã tìm thấy ${requirementId}`,
        });

        setRequirementList(docSnap.data());
      } else {
        notification.error({
          message: `Đơn ${requirementId}`,
          description:
            `Đơn ko tồn lại`,
        });
      }
      
      
    
    
    }
    else{
      notification.error({
        message: `Đơn ${requirementId}`,
        description:
          `Mã xác thực không đúng`,
      });
    }
  }
  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  const handlePayment = async (myEmail, yourEmail,requirementId) => {
    console.log(myEmail, yourEmail);

    try{
      await addDoc(collection(db, 'conversations'), {
        users: [myEmail, yourEmail],      
      })
      await setDoc(
        doc(db, "requirements", `${requirementId}`),
        {
          isPayment: true,
        },
        {merge: true}
      )
      await router.push('/')
    }
    catch(error) {
      notification.open({
        message: 'Error',
        description:`${error.message}`,
      });
    }
  }

  return (
    <>
      <MainNavigation/>
      <Row justify="center" style={{height:'100vh', alignItems:'center'}}>
      <Col span={10} offset={0}>
          <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Token"
            name="token"
            rules={[
              {
                required: true,
                message: 'Please input your token!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Requirement Id"
            name="requirementId"
            rules={[
              {
                required: true,
                message: 'Please input your requirementId!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
      </Row>
      <Row>
        { requirement ? (
          <Button type='primary' size='large' style={{margin:'50px'}} onClick={() => handlePayment(requirement?.email,requirement?.designerInfo?.email,requirement.requirementId)}>Duyệt đơn hàng {requirement.requirementId}</Button>
        ) : null
        }
      </Row>
    <MainFooter />
    </>
  );
};
export default AdminPage;