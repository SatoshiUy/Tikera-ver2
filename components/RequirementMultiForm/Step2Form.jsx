import * as React from "react";
import { Form, Button, Input, Select, notification, Space, Row, Col, Typography, Upload, message } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import TextArea from "antd/lib/input/TextArea";

import {InboxOutlined, UploadOutlined} from '@ant-design/icons'
import Reference from "../../public/svg/reference.svg";
import Image from "next/image";
import ImgCrop from "antd-img-crop";
import { getDownloadURL, ref } from "firebase/storage";
import { useDownloadURL, useUploadFile } from "react-firebase-hooks/storage";
import { useState } from "react";
import Router from "next/router";

export default function Step2Form({ data, onSuccess, onBack }) {
  const [loggedInUser, loading, error] = useAuthState(auth);

  console.log("data form 2: ", data);

  const {randomNumber} = data;

  // Create a storage reference from our storage service
  const requirementImageRef = ref(storage,`requirement/${loggedInUser?.uid}/${randomNumber}.jpg`);
  const [downloadUrl] = useDownloadURL(requirementImageRef);
  
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

  

  const [uploadFile, uploading, snapshot] = useUploadFile();
  const [selectedFile, setSelectedFile] = useState();

  const upload = async () => {
    if (selectedFile) {
      const result = await uploadFile(requirementImageRef, selectedFile, {
        contentType: 'image/jpg',
      });
    }
    var _downloadURL;
    try {
      await getDownloadURL(requirementImageRef).then((downloadURL) => {
        console.log('File available at', downloadURL);
        _downloadURL = downloadURL;
      });

      await setDoc(doc(db, "requirements", `${randomNumber}`),
        {
          photoURL: _downloadURL,
        },
        {merge: true});
        message.success('Upload thành công');

    } catch(error) {
      notification.open({
        message: 'Error',
        description:`${error.message}`,
      });
    }

    await onSuccess({
      ...data,
      photoURL: _downloadURL
    });
  }

  
  return (
    <Row style={{marginTop: '-100px', width:'100%'}} align="middle" justify="center">
      <Col span={12}>
        <Space direction="vertical" size="middle">
          <Typography.Text style={{fontWeight:'800', fontSize:'30px'}}>Gửi Reference</Typography.Text>
      
          <div className='image_ovelay' style={{borderRadius:'0px', overflow:'hidden', width:'400px', position:'relative'}}>
          {data?.photoURL ? <Image src={data?.photoURL} width={200} height={200} style={{zIndex:'1', maxWidth: '400px'}}/> : (<></>)}
          </div>
          <ImgCrop rotate>
            <Upload.Dragger
              {...props}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Hãy cho chúng mình thấy bạn muốn phong cách như thế nào
              </p>
            </Upload.Dragger>
          </ImgCrop>
      
      
        <Space direction="horizontal">
          {onBack && (
          <Button onClick={() => onBack(data)} style={{ marginRight: 8 }}>
            Quay lại
          </Button>
          )}
          <Button type='primary' onClick={() => {
          upload();
        }} style={{zIndex:100, backgroundColor:'#5ed95e'}}>
          Upload
        </Button>
          </Space>
        </Space>
      </Col>
    </Row>
  );
}
