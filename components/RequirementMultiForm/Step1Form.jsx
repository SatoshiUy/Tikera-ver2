import * as React from "react";
import { Form, Button, Input, Select, notification, Space, Row, Col, Typography } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import TextArea from "antd/lib/input/TextArea";

import CompanySvg from "../../public/svg/company_name.svg";
import Image from "next/image";

export default function Step1Form({ data, onSuccess, onBack }) {
  const [loggedInUser, loading, error] = useAuthState(auth);
  console.log("data form 1: ", data);

  const {randomNumber} = data;
  
  const onFinish = async (values) => {
    console.log(data)
    console.log('Success:', values);
    try {
      await setDoc(doc(db, "requirements",  `${randomNumber}`),
        {
          ...data,
          ...values
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
      ...values
    });
  };

  
  return (
    <Row style={{marginTop: '-80px'}}>
      <Col span={6} offset={9}>
      <Form
        onFinish={onFinish}
        initialValues={data}
        autoComplete="off"
        layout="vertical"
      >
        <div className="image_overlay">
          <Image src={CompanySvg} style={{ width: 150, height:150}}/>
        </div>
        <Space direction="vertical" size="large">
          <Typography.Text style={{fontWeight:'800', fontSize:'30px'}}>Tên Doanh Nghiệp</Typography.Text>
          <Typography.Text style={{fontWeight:'500', fontSize:'15px'}}>Đó là thứ không thể thiếu trong doanh nghiệp. Không những giúp khách hàng ghi nhớ đến hoạt động công ty mà còn tránh trùng lặp với tên của doanh nghiệp khác</Typography.Text>
        <Form.Item
          name="companyName"
          rules={[{ required: true, message: 'Hãy điền tên để mọi người có thể biết bạn' }]}
        >
          <Input />
        </Form.Item>
        </Space>
        <Space direction="horizontal" size="large">
          <Form.Item>
            {onBack && (
            <Button onClick={() => onBack(data)} style={{ marginRight: 8 }}>
              Quay lại
            </Button>
          
          )}
          </Form.Item>
        <Form.Item
        >
          <Button type="primary" htmlType="submit">
            Next Step
          </Button>
        </Form.Item>
          </Space>
      </Form>
      </Col>
    </Row>
  );
}
