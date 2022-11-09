import { Button, message, Steps, Typography } from 'antd';
import { doc } from 'firebase/firestore';
import {useState, useCallback} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { auth, db } from '../config/firebase';

import Step0Form from './AccountMultiForm/Step0Form'
import Step1Form from './AccountMultiForm/Step1Form'
import Step2Form from './AccountMultiForm/Step2Form'
const steps = [
  {
    title: 'Vai trò của bạn',
    content: 'First-content',
  },
  {
    title: 'Thông tin tài khoản',
    content: 'Second-content',
  },
  {
    title: 'Ảnh đại diện',
    content: 'Last-content',
  },
];

function StepFormAccount({value, handleCancel}) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map(item => ({ key: item.title, title: item.title }));

  // form
  const [data, setData] = useState(value);
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
    if(current === 2) {
      setCurrent(value)
    }
  };

  return (
    <>
      <Steps type="navigation" current={current} items={items} onChange={handleChange}/>
      <div className="steps-content">
        {current === 0 && 
          <>
            <Typography style={{fontSize: '30px', fontWeight: '800'}}>Bạn là: </Typography>
            <Step0Form data={data} onSuccess={handleNextStep}/>
          </>
        }
        {current === 1 && 
          <Step1Form data={data} onSuccess={handleNextStep} onBack={handlePrevStep}/>
        }
        {current === 2 && (
          <Step2Form
            data={data}
            onSuccess={handleSubmit}
            onBack={handlePrevStep}
            handleCancel={handleCancel}
          />
        )}
      </div>
    </>
  )
}

export default StepFormAccount