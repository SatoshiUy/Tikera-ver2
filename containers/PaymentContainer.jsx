import { Steps, Typography } from 'antd'
import {useState,useCallback} from 'react'

import Step0Form from '../components/ManagementMultiForm/Step0Form'
import Step1Form from '../components/ManagementMultiForm/Step1Form'
import Step2Form from '../components/ManagementMultiForm/Step2Form'

const steps = [
  {
    title: 'Chọn dự án đang thực hiện',
    content: 'First-content',
  },
  {
    title: 'Chọn Designer',
    content: 'Second-content',
  },
  {
    title: 'Thanh toán',
    content: 'Third-content',
  },
];

function PaymentContainer() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map(item => ({ key: item.title, title: item.title }));

  // form
  const [data, setData] = useState({});
  console.log(data)

  const handleNextStep = useCallback(
    (data) => {
      setData(data);
      setCurrent(current + 1);
    },
    [current]
  );

  const handlePrevStep = useCallback(
    (data) => {
      setData(data);
      setCurrent(current - 1);
    },
    [current]
  );

  const handleSubmit = useCallback((data) => {
    setData(data);
    console.log("Data", data);
  }, []);

  const handleChange = (value) => {
    console.log('onChange:', value);
    setCurrent(value);
  };
  return (
    <div style={{width:'100vw', top:'80px', margin:'100px 0'}}>
      <Steps type="navigation" current={current} items={items} onChange={handleChange}/>
      <div className="steps-content" style={{paddingTop: '100px'}}>
        {current === 0 && 
          <Step0Form data={data} onSuccess={handleNextStep}/>
        }
        {current === 1 && 
          <Step1Form data={data} onSuccess={handleNextStep} onBack={handlePrevStep}/>
        }
        {current === 2 && 
          <Step2Form data={data} onSuccess={handleNextStep} onBack={handlePrevStep}/>
        }
      </div>
    </div>
  )
}

export default PaymentContainer