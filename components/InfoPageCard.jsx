import Image from 'next/image';
import { Card, Col } from 'antd';
import Tikera_Logo from '../public/owner/tikera_logo.png';
import Typography from 'antd/lib/typography/Typography';
import LandingPage_Card_1 from '../public/landing_page/clarity.png';
import LandingPage_Card_2 from '../public/landing_page/market.png';
import LandingPage_Card_3 from '../public/landing_page/pallette.png';

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
        return <Image src={LandingPage_Card_1} alt="logo" width={100} height={100}/>;
      case 1:
        return <Image src={LandingPage_Card_2} alt="logo" width={100} height={100}/>;
      case 2:
        return <Image src={LandingPage_Card_3} alt="logo" width={100} height={100}/>;
      default:
        return <Image src={Tikera_Logo} alt="logo" width={100} height={100}/>;
    }
  }
  return (
    <Col span={8}>
      <Card bordered={true} style={{borderRadius:'30px', border: '#868686 solid 4px', height:'350px'}}>
        {ImageSelect(cardNumber)}
        <Typography style={{fontSize: '16px', fontWeight: '500', marginTop: '10px'}}>
          {cardInfos[cardNumber].description}
        </Typography>
      </Card>
    </Col>
  )
}

export default InfoPageCard