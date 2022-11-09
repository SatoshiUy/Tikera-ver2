import * as React from "react";
import { Form, Button, Input, Select, notification, Space, Row, Col, Typography } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import TextArea from "antd/lib/input/TextArea";

import DescriptionSvg from "../../public/svg/description.svg";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Step3Form({ data, onSuccess, onBack }) {
  const [loggedInUser, loading, error] = useAuthState(auth);
  console.log("data form 1: ", data);

  const router = useRouter();
  const {randomNumber} = data;
  
  const onFinish = async (values) => {
    console.log(data)
    console.log('Success:', values);
    try {
      await setDoc(doc(db, "requirements",  `${randomNumber}`),
        {
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
    await router.push('/management')
  }
  
  return (
    <Row style={{marginTop: '-80px'}}>
      <Col span={10} offset={7}>
      <Form
        onFinish={onFinish}
        initialValues={data}
        autoComplete="off"
        layout="vertical"
      >
        <div className="image_overlay">
          <Image src={DescriptionSvg} style={{ width: 150, height:150}}/>
        </div>
        <Space direction="vertical" size="large">
          <Typography.Text style={{fontWeight:'800', fontSize:'30px'}}>Mô tả về yêu cầu</Typography.Text>
          <Typography.Text style={{fontWeight:'500', fontSize:'15px'}}>Hãy chia sẻ mô tả yêu cầu để chúng mình có thể hiểu rõ hơn về yêu cầu bạn đưa ra và làm việc 1 cách chính xác</Typography.Text>
        <Form.Item
          name="description"
          rules={[{ required: true, message: 'Hãy chia sẻ mô tả yêu cầu để chúng mình có thể hiểu rõ hơn về bạn' }]}
        >
          <TextArea rows={4}/>
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
          <Button type="primary" htmlType="submit" style={{backgroundColor:"#5ed95e"}}>
            Done
          </Button>
        </Form.Item>
          </Space>
      </Form>
      </Col>
    </Row>
  );
}
