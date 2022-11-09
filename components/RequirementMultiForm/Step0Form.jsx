import * as React from "react";
import { Form, Button, Input, Select, notification, Card, Space, Typography } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import Meta from "antd/lib/card/Meta";

import LogoSvg from "../../public/svg/logo.svg";
import MenuSvg from "../../public/svg/menu.svg";
import CatelogueSvg from "../../public/svg/catelogue.svg";
import WebsiteSvg from "../../public/svg/website.svg";

import { serverTimestamp } from "firebase/firestore";
import Image from "next/image";

export default function Step0Form({ data, onSuccess }) {
  const [loggedInUser, loading, error] = useAuthState(auth);
  console.log("data form 0: ", data);
  const {randomNumber} = data;

  const handleSelectCategory = async (value) => {
    console.log("category select: ", value);
    try {
      await setDoc(
        doc(db, "requirements", `${randomNumber}`),
        {
          uid: loggedInUser?.uid,
          category: value,
        },
        {merge: true}
      )

      await updateDoc(doc(db, 'users', loggedInUser.uid), {
        requirement: arrayUnion({
          requirementId: randomNumber,
        })
      });
    } catch(error) {
      notification.open({
        message: 'Error',
        description:`${error.message}`,
      });
    }
    await onSuccess({
      ...data,
      category: value
    });
  };

  
  return (
    <Space direction="horizontal" size="large">
      <Card
        hoverable
        style={{ width: 240}}
        cover={
          <div className="image_overlay">
            <Image src={LogoSvg} style={{ width: 200, height:200}}/>
          </div>
        }
        onClick={() => handleSelectCategory('logo')}
      >
        <Typography.Text style={{fontWeight:'600', fontSize:'25px'}}>Logo</Typography.Text>
      </Card>
      <Card
        hoverable
        style={{ width: 240}}
        cover={
          <div className="image_overlay">
            <Image src={MenuSvg} style={{ width: 200, height:200}}/>
          </div>
        }
        onClick={() => handleSelectCategory('menu')}
      >
        <Typography.Text style={{fontWeight:'600', fontSize:'25px'}}>Menu</Typography.Text>
      </Card>
      <Card
        hoverable
        style={{ width: 240}}
        cover={
          <div className="image_overlay">
            <Image src={WebsiteSvg} style={{ width: 200, height:200}}/>
          </div>
        }
        onClick={() => handleSelectCategory('poster')}
      >
        <Typography.Text style={{fontWeight:'600', fontSize:'25px'}}>Poster</Typography.Text>
      </Card>
      <Card
        hoverable
        style={{ width: 240}}
        cover={
          <div className="image_overlay">
            <Image src={CatelogueSvg} style={{ width: 200, height:200}}/>
          </div>
        }
        onClick={() => handleSelectCategory('banner')}
      >
        <Typography.Text style={{fontWeight:'600', fontSize:'25px'}}>Banner</Typography.Text>
      </Card>
    </Space>
          
  );
}
