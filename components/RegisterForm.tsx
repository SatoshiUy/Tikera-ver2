import { LockOutlined, LoginOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, notification, Radio, Row, Select, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { Dispatch, dispatch, RootState, state } from '../store';

import { phonePrefixs } from '../constants/phonePrefixs';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';
import {useRouter } from 'next/router';
import Link from 'next/link';
import { doc, setDoc } from 'firebase/firestore';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

interface LoginFormProps {
  token: typeof state.authStore.token,
  loginAuth: typeof dispatch.authStore.loginAuth,
}

export const LoginForm: React.FC<LoginFormProps> = ({
  token,
  loginAuth
}) => {
    const [formController] = useForm();
    const [isEmailLoginType, setIsEmailLoginType] = useState(true)
    const router = useRouter();

    // const [
    //   createUserWithEmailAndPassword,
    //   _user,
    //   loading,
    //   error,
    // ] = useCreateUserWithEmailAndPassword(auth);

    

    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select>
          {
            phonePrefixs.map(({code, name},index) => (
              <Select.Option key={index} value={code}>{`${code} ${name}`}</Select.Option>
            ))
          }
        </Select>
      </Form.Item>
    );

    const _onSubmit = async () => {
      formController.submit();

      // Get data from form
      const formResult = formController.getFieldsValue();

      const {typeLogin, prefix, phone, email, password, remember} = formResult;
      console.log(formResult)

      const user = typeLogin === "email" ? (
        {
          username: email,
          password: password
        }
      ) : (
        {
          username: prefix+phone,
          password: password
        }
      );
      createUserWithEmailAndPassword(auth, user.username, user.password)
      .then((userCredential) => {
        setDoc(doc(db, `users`, `${userCredential?.user?.uid}`), {
        imageInfo: [],
        requirement: []
        });
      })
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        notification.error({
          message: 'Error',
          description: error.message
        })
      });
      
    };

    return (
          <Row justify="center" align="middle">
            <Col sm={18} xs={22}>
            <Link href="/authenticate/login">  &lt;- Quay về trang đăng nhập</Link>
              <Typography.Title className='text-weight-black m-none'>Đăng ký tài khoản</Typography.Title>
              <h3>Cùng tham gia vào cộng đồng thiết kế và người dùng</h3>
              <Form
                className='mt-x-large'
                  form={formController}
                  layout="vertical"
                  autoComplete="off"
                  initialValues={{
                    typeLogin: 'email',
                    prefix: '+84',
                    remember: false
                  }}
                  size="large"
              >
                <Form.Item name="typeLogin">
                  <Radio.Group>
                    <Radio.Button value="email" onClick={() => setIsEmailLoginType(true)}>Email</Radio.Button>
                    <Radio.Button value="phoneNumber" onClick={() => setIsEmailLoginType(false)}>Số Điện Thoại</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              {/* =============================== */}
                  {isEmailLoginType ?(
                  <Form.Item
                    name="email"
                    rules={[{ 
                      required: true, 
                      type: "email", 
                      message: 'Hãy điền email của bạn!' }]}
                      hasFeedback
                  >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                  </Form.Item>
                  
                ) : (
                  <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Hãy điền số điện thoại của bạn!', pattern: new RegExp(/^[1-9]{9}|[0-9]{10}$/)}]}
                    hasFeedback
                  >
                    <Input addonBefore={prefixSelector} placeholder="Số điện thoại"/>
                  </Form.Item>
                )

                }

                {/* =============================== */}
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Hãy điền mật khẩu của bạn!' }]}
                    hasFeedback
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      type="password"
                      placeholder="Mật khảu"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Ghi nhớ tài khoản</Checkbox>
                    </Form.Item>
                    <a className="login-form-forgot" href="">
                      Quên mật khẩu?
                    </a>
                  </Form.Item>
                  <Form.Item>
                    <Button 
                      className='login-form-button'
                      type="primary" 
                      onClick={_onSubmit}
                      size="large"
                      icon={<LoginOutlined />}
                    >
                      Đăng ký tài khoản
                    </Button>
                  </Form.Item>
              </Form>
            </Col>
          </Row>
    );
};

const mapState = (state: RootState) => ({
  token: state.authStore.token,
});

const mapDispatch = (dispatch: Dispatch) => ({
  loginAuth: dispatch.authStore.loginAuth
});

export default connect(mapState, mapDispatch)(LoginForm);