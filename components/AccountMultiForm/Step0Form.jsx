import * as React from "react";
import { Form, Button, Input, Select, notification, Card, Space } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import Meta from "antd/lib/card/Meta";

import SvgDesigner from '../svg/SvgDesigner'
import SvgCustomer from '../svg/SvgCustomer'

export default function Step1Form({ data, onSuccess }) {
  const [loggedInUser, loading, error] = useAuthState(auth);
  console.log("data form 0: ", data);

  const handleSelectRole = async (value) => {
    let isDisplay = false;
    if(value === "designer") {
      isDisplay = true;
    }
    try {
      await setDoc(
        doc(db, 'users', loggedInUser.uid),
        {
          role: value
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
      isDisplay,
      role: value
    });
  };

  
  return (
    <Space direction="horizontal" size="large">
      <Card
        hoverable
        style={{ width: 240}}
        cover={
          <SvgDesigner />
        }
        onClick={() => handleSelectRole('designer')}
      >
        <Meta title="Designer"/>
      </Card>
      <Card
        hoverable
        style={{ width: 240}}
        cover={
          <SvgCustomer />
        }
        onClick={() => handleSelectRole('customer')}
      >
        <Meta title="Customer" align="right"/>
      </Card>
    </Space>
          
  );
}
