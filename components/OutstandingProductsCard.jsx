import Image from 'next/image';
import { Avatar, Button, Card, Col, Space } from 'antd';
import Tikera_Logo from '../public/owner/tikera_logo.png';
import Typography from 'antd/lib/typography/Typography';
import LandingPage_DesignerSuggestion_0 from '../public/landing_page/DesignerSuggestion/DesignerSuggestion_0.png';
import LandingPage_DesignerSuggestion_1 from '../public/landing_page/DesignerSuggestion/DesignerSuggestion_1.png';
import LandingPage_DesignerSuggestion_2 from '../public/landing_page/DesignerSuggestion/DesignerSuggestion_2.png';
import LandingPage_DesignerSuggestion_3 from '../public/landing_page/DesignerSuggestion/DesignerSuggestion_3.png';
import LandingPage_DesignerSuggestion_4 from '../public/landing_page/DesignerSuggestion/DesignerSuggestion_4.png';
import LandingPage_DesignerSuggestion_5 from '../public/landing_page/DesignerSuggestion/DesignerSuggestion_5.png';
import Meta from 'antd/lib/card/Meta';
import { DollarOutlined, HeartOutlined } from '@ant-design/icons';

function InfoPageCard({cardNumber}) {
  
  const cardInfos = [{
    description: 'Bản tóm tắt trực quan và thu hút sẽ giúp cho bạn dễ dàng tìm được những sản phẩm phù hợp, các nhà thiết kế đưa ra những sản phẩm chất lượng và đúng ý của bạn'
  },{
    description: 'Đặt thuê những nhà thiết kế có khoảng giá phù hợp với nhu cầu, xem các sản phẩm mà họ từng làm để biết được khả năng cũng như phong cách thẩm mỹ'
  },{
    description: 'Chợ sản phẩm do các nhà thiết kế đăng lên sẽ giúp bạn tiết kiệm thời gian đặt thuê và chờ đợi sản phẩm. Từ bản tóm tắt, chúng tôi sẽ giúp bạn chắt lọc sản phẩm phù hợp.'
  }
  ];

  const ImageSelect = (cardNumber) => {
    switch (cardNumber) {
      case 0:
        return (
          <div className="login-overlay">
            <Image src={LandingPage_DesignerSuggestion_0} alt="background" width={300} style={{transform:'translate(-25px, -25px)'}} />
          </div>
        )
      case 1:
        return (
          <div className="login-overlay">
            <Image src={LandingPage_DesignerSuggestion_1} alt="background" width={300} style={{transform:'translate(-25px, -25px)'}} />
          </div>
        )
      case 2:
        return (
          <div className="login-overlay">
            <Image src={LandingPage_DesignerSuggestion_2} alt="background" width={300} style={{transform:'translate(-25px, -25px)'}} />
          </div>
        )
      case 3:
        return (
          <div className="login-overlay">
            <Image src={LandingPage_DesignerSuggestion_3} alt="background" width={300} style={{transform:'translate(-25px, -25px)'}} />
          </div>
        )
      case 4:
        return (
          <div className="login-overlay">
            <Image src={LandingPage_DesignerSuggestion_4} alt="background" width={300} style={{transform:'translate(-25px, -25px)'}} />
          </div>
        )
      case 5:
        return (
          <div className="login-overlay">
            <Image src={LandingPage_DesignerSuggestion_5} alt="background" width={300} style={{transform:'translate(-25px, -25px)'}} />
          </div>
        )
      default:
        return <Image src={Tikera_Logo} alt="logo" width={100} height={100}/>;
    }
  }
  return (
    <Col span={8}>
      <Typography style={{fontWeight:'bold', fontSize:'20px'}}>Lorem ipsum</Typography>
      <Card style={{borderRadius:'30px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', minHeight:'300px' ,width:'300px', padding: '0'}}
        actions={[
          <Button type="primary" icon={<HeartOutlined />}>
             {` ${Math.floor(Math.random() * 1000)}`}
          </Button>,
          <Button type="primary" icon={<DollarOutlined />}>
            {` ${Math.floor(Math.random() * 1000)}`}
          </Button>,
        ]}
      >
        {ImageSelect(cardNumber)}
        <Typography>This is a description</Typography>
      </Card>
    </Col>
  )
}

export default InfoPageCard