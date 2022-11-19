import { Button, Col, Image, message, Modal, notification, Popconfirm, Row, Typography, Upload } from "antd"
import { InboxOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ImgCrop from "antd-img-crop";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDownloadURL, useUploadFile  } from 'react-firebase-hooks/storage';

import { auth, db, storage } from "../config/firebase";
import { useRouter } from "next/router";
import { getDownloadURL, ref } from "firebase/storage";
import { addDoc, arrayRemove, arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { useDocument } from 'react-firebase-hooks/firestore';
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
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
};

function ListProductImage() {
  const [loggedInUser] = useAuthState(auth);
  console.log("da dang nhap", loggedInUser);
	const router = useRouter();

  // ============================== Upload Image ==============================
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const [selectedFile, setSelectedFile] = useState();
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
  const upload = async () => {
    const randomURL = Math.floor(Math.random()*100000);
    const productImageRef = ref(storage,`products/${auth?.currentUser?.uid}/${randomURL}.jpg`);

    if (selectedFile) {
      const result = await uploadFile(productImageRef, selectedFile, {
        contentType: 'image/jpg',
      });

      var _downloadURL;
      

      try {
        await getDownloadURL(productImageRef).then((downloadURL) => {
          console.log('File available at', downloadURL);
          _downloadURL = downloadURL;
        });

        await updateDoc(doc(db, `users`, `${loggedInUser?.uid}`), {
          imageInfo: arrayUnion({
            name: randomURL,
            linkImg: _downloadURL,
          })
        });
      } catch(error) {
        notification.open({
          message: 'Error',
          description:`${error.message}`,
        });
      }

    }
  }
  // ============================== Get Image ==============================

  const [value] = useDocument(
    doc(db, `users`, `${loggedInUser?.uid}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const handleDelete = async (imageId) => {
    await updateDoc(doc(db, `users`, `${loggedInUser?.uid}`), {
      imageInfo: arrayRemove(imageId)
    });

    message.info('Xóa ảnh có ID: ' + imageId.name + ' thành công');
  }

  return (
    <div style={{zIndex:10, minHeight:'1000px', width:'1000px'}}>
      <Row gutter={[20,50]}>
        { value == undefined ? <h1>Chua co san pham</h1> : 
        value?.data()?.imageInfo?.map((item,index) => {
          const ImageProps ={
            offset: index%2 === 0 ? 0 : 2,
          }
          return (
            <Col span={8} {...ImageProps} style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
              <Image
                src={item.linkImg}
                alt={"image"}
              />
              <Popconfirm placement="topLeft" title={"Bạn có chắc muốn xóa không"} onConfirm={() => handleDelete(item)} okText="Yes" cancelText="No">
                <Button type="danger">Xóa ảnh</Button>
              </Popconfirm>
            </Col>
            )
          })
        }
        
      </Row>
      
      <div style={{marginTop:'20px', display: 'flex', flexFlow:'column', width:'400px'}}>
        <ImgCrop rotate>
        <Upload.Dragger
          // style={{width:'50%'}}
              {...props}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint" style={{zIndex:100}}>
              Thêm sản phẩm
              </p>
            </Upload.Dragger>
        </ImgCrop>
        <Button type='primary' onClick={() => {
          upload();
        }} style={{zIndex:100, marginTop:'10px'}}>Upload
        </Button>
      </div>
            
    </div>
  )
}

export default ListProductImage