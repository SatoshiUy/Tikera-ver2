import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Descriptions, notification, Space, Typography, Upload } from 'antd';
import Image from 'next/image';
import React from 'react'
import { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import Tikera from '../public/landing_page/DesignerSuggestion/DesignerSuggestion_2.png';

import {ref, getDownloadURL} from "firebase/storage";
import {useAuthState} from'react-firebase-hooks/auth';
import { useDownloadURL, useUploadFile  } from 'react-firebase-hooks/storage';
import {auth, db, storage} from '../config/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc, setDoc } from 'firebase/firestore';
function ProfileCard() {
  const [loggedInUser] = useAuthState(auth);
  console.log(auth)

  // Create a storage reference from our storage service
  const profileImageRef = ref(storage,`profileImage/${loggedInUser?.uid}.jpg`);
  const [downloadUrl] = useDownloadURL(profileImageRef);

  const [value] = useDocument(
    doc(db, `users`, `${loggedInUser?.uid}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  console.log(value?.data(), "thong tin")

  const props = {
    name: 'file',
    
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    accept: ".jpg,.png,.jpeg",
    beforeUpload: (file, fileList) => {
        setSelectedFile(file);
        return false;
    }

  };


  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const [selectedFile, setSelectedFile] = useState();

  const upload = async () => {
    if (selectedFile) {
      const result = await uploadFile(profileImageRef, selectedFile, {
        contentType: 'image/jpg',
      });
    }
    var _downloadURL;
    try {
      await getDownloadURL(profileImageRef).then((downloadURL) => {
        console.log('File available at', downloadURL);
        _downloadURL = downloadURL;
      });

      await setDoc(doc(db, `users`, `${loggedInUser?.uid}`),
        {
          photoURL: _downloadURL,
        },
        {merge: true});
    } catch(error) {
      notification.open({
        message: 'Error',
        description:`${error.message}`,
      });
    }

  }

  const designer = value?.data();

  return (
    <>
      <Space direction='vertical' style={{width:'100%'}}>
        <div className='image_ovelay' style={{borderRadius:'0px', overflow:'hidden', width:'400px'}}>
          {value && value.data().photoURL ? <Image src={value.data().photoURL} width={400} height={400} /> : <Image src={Tikera} width={400} height={400} />}
        </div>
        <div style={{position:'absolute', zIndex:10, color:'white', left:'50%', transform:'translateX(-50%)', textShadow: '2px 4px 3px rgba(0,0,0,0.3)',minWidth:'300px', display:'flex',alignItems:'center', flexFlow:'column', top:'20px'}}>
          <div style={{fontSize:'30px', fontWeight:'700'}}>{value?.data()?.username || loggedInUser?.email}</div>
          <div style={{fontSize:'16px', fontWeight:'500'}}>{(value?.data()?.position) ? value?.data()?.position : "Designer"}</div>
        </div>
        <ImgCrop rotate>
          <Upload
            {...props}
          >
            <Button icon={<UploadOutlined />} style={{zIndex:100, position: 'relative', left:'50%', transform: 'translateX(5%)'}}>Thay đổi ảnh đại diện</Button>
          </Upload>
        </ImgCrop>
        <Button type='primary' onClick={() => {
          upload();
        }} style={{zIndex:100, position: 'relative', left:'50%', transform: 'translateX(-50%)'}} align="center">Upload</Button>
        <div style={{zIndex:40, padding: '20px'}}>
          <Typography.Title align="middle">Giới thiệu</Typography.Title>

            <Descriptions size="small" layout="vertical" column={2} bordered style={{textAlign: 'left' ,fontSize:"30px"}}>
            <Descriptions.Item label="Email" span={2}>{designer?.email}</Descriptions.Item>
              <Descriptions.Item label="Position">{designer?.position}</Descriptions.Item>
              <Descriptions.Item label="Role">{designer?.role}</Descriptions.Item>
              <Descriptions.Item label="Strength" span={2}>{designer?.strength}</Descriptions.Item>
              <Descriptions.Item label="Description" span={2}>{designer?.description}</Descriptions.Item>
            </Descriptions>

      </div>
      </Space>
    </>
  )
}

export default ProfileCard