import { Steps, Typography } from 'antd'
import {useState,useCallback} from 'react'

import Step0Form from '../components/RequirementMultiForm/Step0Form'
import Step1Form from '../components/RequirementMultiForm/Step1Form'
import Step2Form from '../components/RequirementMultiForm/Step2Form'
import Step3Form from '../components/RequirementMultiForm/Step3Form'

const steps = [
  {
    title: 'Category',
    content: 'First-content',
  },
  {
    title: 'Tên Doanh Nghiệp',
    content: 'Second-content',
  },
  {
    title: 'Gửi Reference',
    content: 'Third-content',
  },
  {
    title: 'Mô tả về yêu cầu',
    content: 'Last-content',
  },
];

function RequirementContainer() {
  const [current, setCurrent] = useState(0);
  const randomNumber = Math.floor(Math.random()*100000);
  console.log("randomNumber: ", randomNumber);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map(item => ({ key: item.title, title: item.title }));

  // form
  const [data, setData] = useState({randomNumber});
  console.log(data)
  const [step, setStep] = useState(1);

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
    <div style={{width:'100vw', height:'calc(100vh)', top:'80px', position:'relative'}}>
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
        {current === 3 && 
          <Step3Form data={data} onSuccess={handleNextStep} onBack={handlePrevStep}/>
        }
      </div>
    </div>
  )
}

export default RequirementContainer