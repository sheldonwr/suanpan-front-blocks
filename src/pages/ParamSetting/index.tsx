import React from 'react';
import ParamSetting from '../../../blocks/ParamSetting';
import { currentDataValue, parameterTypes } from './mock';

const ParameterSetting: React.FC = () => (
  <div style={{ width: '100vw', height: '100vh', textAlign: 'center' }}>
    <div style={{ marginTop: 100, marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
      <ParamSetting currentDataValue={currentDataValue} parameterTypes={parameterTypes} />
    </div>
  </div>
)

export default ParameterSetting;