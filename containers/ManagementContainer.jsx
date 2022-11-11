import { Steps, Typography } from 'antd'
import {useState,useCallback} from 'react'

import ManageProduct from '../components/ManageProduct'

function ManagementContainer() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
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
          <ManageProduct data={data} onSuccess={handleNextStep}/>
    </div>
  )
}

export default ManagementContainer