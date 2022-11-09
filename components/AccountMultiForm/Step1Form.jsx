import * as React from "react";
import { Form, Button, Input, Select, notification, Space } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import TextArea from "antd/lib/input/TextArea";

export default function Step1Form({ data, onSuccess, onBack }) {
  const [loggedInUser, loading, error] = useAuthState(auth);
  console.log("data form 1: ", data);

  const onFinish = async (values) => {
    console.log(data)
    console.log('Success:', values);
    try {
      await setDoc(
        doc(db, 'users', loggedInUser.uid),
        {
          email: loggedInUser.email,
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
    <Form
      onFinish={onFinish}
      initialValues={data}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        label="Tên người dùng"
        name="username"
        rules={[{ required: true, message: 'Hãy điền tên để mọi người có thể biết bạn' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Nghề nghiệp"
        name="position"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mô tả về bạn"
        name="description"
      >
        <TextArea rows={4} />
      </Form.Item>
      {data.isDisplay && (
        <Form.Item 
          label="Điểm mạnh của bạn"
          name="strength"
          rules={[{ required: true, message: 'Hãy chọn điểm mạnh của bạn' }]}
        >
          <Select>
            <Select.Option value="logo">Logo</Select.Option>
            <Select.Option value="poster">Poster</Select.Option>
            <Select.Option value="banner">Banner</Select.Option>
            <Select.Option value="menu">Menu</Select.Option>
          </Select>
        </Form.Item>
      )}
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
  );
}
