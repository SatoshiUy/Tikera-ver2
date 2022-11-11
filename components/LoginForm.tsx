import { LockOutlined, LoginOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, notification, Radio, Row, Select, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { Dispatch, dispatch, RootState, state } from '../store';

import { phonePrefixs } from '../constants/phonePrefixs';
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface LoginFormProps {
  token: typeof state.authStore.token,
  loginAuth: typeof dispatch.authStore.loginAuth,
}

export const RegisterForm: React.FC<LoginFormProps> = ({
  token,
  loginAuth
}) => {
    const [formController] = useForm();
    const [isEmailLoginType, setIsEmailLoginType] = useState(true)

    const router = useRouter();

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
    
    const [
      signInWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useSignInWithEmailAndPassword(auth);

    if (user) {
      router.push('/');
    }
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
        try {
          signInWithEmailAndPassword(user.username, user.password);
        } catch(error: any) {
          notification.error({
            message: 'Error',
            description: "Lỗi xảy ra"
          })
        };

    };

    return (
          <Row justify="center" align="middle">
            <Col sm={18} xs={22}>
              <Typography.Title style={{fontSize: '30px'}} className='m-none'>Xin chào bạn đã đến với Tikera!</Typography.Title>
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
                  <Link href="/authenticate/register">Đăng kí tài khoản</Link>
                  <Form.Item>
                    <Button 
                      className='login-form-button'
                      type="primary" 
                      onClick={_onSubmit}
                      size="large"
                      icon={<LoginOutlined />}
                    >
                      Đăng nhập
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

export default connect(mapState, mapDispatch)(RegisterForm);