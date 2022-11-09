import {useState, useEffect} from "react";
import { Form, Button, Input, Select, Upload, notification, message, Space } from "antd";
import ImgCrop from "antd-img-crop";
import { UploadOutlined } from "@ant-design/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../../config/firebase";

import Image from 'next/image';
import Tikera from '../../public/landing_page/DesignerSuggestion/DesignerSuggestion_2.png';
import { getDownloadURL, ref } from "firebase/storage";
import { useDownloadURL, useUploadFile } from "react-firebase-hooks/storage";
import { doc, setDoc } from "firebase/firestore";
import Router, { useRouter } from "next/router";

export default function Step1Form({ data, onSuccess, onBack, handleCancel}) {
  const [loggedInUser] = useAuthState(auth);
  const [imageUrl, setImageUrl] = useState();

  console.log("data form 2: ", data);

  // Create a storage reference from our storage service
  const profileImageRef = ref(storage,`profileImage/${loggedInUser?.uid}.jpg`);
  const [downloadUrl] = useDownloadURL(profileImageRef);
  
  const router = useRouter();
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
        message.success('Cập nhật thông tin thành công');

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


  const onFinish = (values) => {
    console.log('Success:', values);
    onSuccess(values);
  };

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
      <div className='image_ovelay' style={{borderRadius:'0px', overflow:'hidden', width:'400px', left: '75px', position:'relative'}}>
      {data?.photoURL ? <Image src={data?.photoURL} width={400} height={400} style={{zIndex:'1', maxWidth: '400px'}}/> : <h1>Xem trước bằng cách thêm ảnh</h1> }
      </div>
      <ImgCrop rotate>
        <Upload
          {...props}
        >
          <Button icon={<UploadOutlined />} style={{zIndex:100}}>Thay đổi ảnh đại diện</Button>
        </Upload>
      </ImgCrop>
      
      <Button type='primary' onClick={() => {
        upload();
      }} style={{zIndex:100}}>
        Upload
      </Button>
      </Space>

    </>
  );
}
