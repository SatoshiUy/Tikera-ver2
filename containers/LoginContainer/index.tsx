import { Col, Row } from 'antd'
import Image from 'next/image';
import LoginForm from '../../components/LoginForm'
import Background from '../../public/owner/login_background.jpg';

function LoginContainer() {
  return (
    <div className='login-container'>
      <Row
        className='login-wrapper'
        align="middle"
        justify="center"
      >
        <Col span={24} lg={12} >
          <LoginForm />
        </Col>
        <Col span={0} lg={12} style={{height: '100%'}}>
          <div className="login-overlay">
            <Image src={Background} alt="background" height={550}/>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default LoginContainer