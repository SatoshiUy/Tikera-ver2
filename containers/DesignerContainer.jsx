import { Steps, Typography } from 'antd'
import {useState,useCallback} from 'react'

import DesignerProduct from '../components/DesignerProduct'

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

  return (
    <div style={{width:'100vw', top:'80px', margin:'100px 0'}}>
      <DesignerProduct data={data} onSuccess={() => {}}/>
    </div>
  )
}

export default ManagementContainer