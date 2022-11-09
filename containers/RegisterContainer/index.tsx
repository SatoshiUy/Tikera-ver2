import { Col, Row } from 'antd'
import Image from 'next/image';
import RegisterForm from '../../components/RegisterForm';

import Background from '../../public/owner/login_background.jpg';
function RegisterContainer() {
  return (
    <div className='login-container'>
      <Row
        className='login-wrapper'
        align="middle"
        justify="center"
      >
        <Col span={0} lg={12} style={{height: '100%'}}>
          <div className="login-overlay">
            <Image src={Background} alt="background" height={550}/>
          </div>
        </Col>
        <Col span={24} lg={12} >
          <RegisterForm />
        </Col>
      </Row>
    </div>
  )
}
export default RegisterContainer