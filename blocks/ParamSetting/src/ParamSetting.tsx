import React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'dva';
import { Input, Select, Checkbox, Card, Tooltip, Slider, Radio, InputNumber,Switch } from 'antd';
import _ from 'lodash';
import { ConnectState } from '@/models/connect';
import { CalibrationModelState } from './models/calibration';

import styles from './ParamSetting.less';

const { Option } = Select;

export interface ParamSettingProps {
  dispatch: Dispatch<AnyAction>;
  calibration: CalibrationModelState;
  currentDataValue: { [key: string]: string | number };
  parameterTypes: Array<any>;
  updateParameters: (key:string, value: any) => void;
}

export interface ParamSettingState {
  types: Array<any>;
  currentDataValue: { [key: string]: string | number };
}

class ParamSetting extends React.Component<ParamSettingProps, ParamSettingState> {
  state = {
    types: [],
    currentDataValue: {}
  }

  componentDidMount() {}

  static getDerivedStateFromProps(nextProps: ParamSettingProps) {
    const { parameterTypes, currentDataValue } = nextProps;
    if (!_.isEmpty(parameterTypes)) {
      return {
        types: parameterTypes,
        currentDataValue: ParamSetting.getDataValue(parameterTypes, currentDataValue)
      }
    }

    return null
  }

  static getDataValue(types: Array<any> = [], data: any = {}) {
    types.forEach((t: any) => {
      const currentData = data[t.name]
      if (currentData && t.type === 'string' && typeof currentData !== 'string') {
        data[t.name] = JSON.stringify(currentData)
      }
    })

    return data
  }

  renderParams(types: Array<any>, currentDataValue: any) {
    const items = types.map((data, index: number) => {
      let dataInput = null;
      switch (data.type) {
        case 'string':
          dataInput = (
            <Input
              id={data.name}
              className={styles.input}
              value={currentDataValue[data.name]}
              ref={data.name}
              onChange={(e) => {this.changeValue(e, data.name)}}
              onBlur={() => {this.updateParameters(data.name)}}
            />
          );
          break;
        case 'multi_string':
          dataInput = (
            <textarea
              id={data.name}
              className={styles.input}
              value={currentDataValue[data.name]}
              onChange={(e) => {this.changeValue(e, data.name)}}
              onBlur={() => {this.updateParameters(data.name)}}
            />
          );
          break;
        case 'password':
          dataInput = (
            <input
              type="password"
              id={data.name}
              className={styles.input}
              value={currentDataValue[data.name]}
              onChange={(e) => {this.changeValue(e, data.name)}}
              onBlur={() => {this.updateParameters(data.name)}}
            />
          );
          break;
        case 'checkbox':
          dataInput = (
            <Checkbox
              id={data.name}
              checked={currentDataValue[data.name]}
              onChange={(e) => {this.changeCheckValue(e, data.name)}}
            />
          );
          break;
        case 'range':
          const marks = {
            [data.range_start]: data.range_start,
            [data.range_finish]: data.range_finish,
          };
          dataInput = (
            <Slider 
              marks={marks}
              value={currentDataValue[data.name]}
              tooltipVisible 
              step={data.range_step} 
              min={data.range_start} 
              max={data.range_finish}
              onChange={(e) => {this.changeSelectValue(e, data.name, data.type)}}
              style={{width: '50%'}}
            />
          );
          break;
        case 'radio':
          dataInput = (
            <Radio.Group onChange={(e) => {this.changeRadioValue(e, data.name)}} value={currentDataValue[data.name]}>
              {
                data.options.map((option: any) => (<Radio key={option.value} value={option.value}>{option.name.zh_CN}</Radio>))
              }
            </Radio.Group>
          );
          break;
        case 'float':
          dataInput = (
            <Input
              id={data.name}
              type="number"
              value={currentDataValue[data.name]}
              min={data.options ? data.options.min : -Infinity}
              max={data.options ? data.options.max : Infinity}
              onChange={(e) => {this.changeValue(e, data.name)}}
              onBlur={() => {this.updateParameters(data.name)}}
            />
          );
          break;
        case 'int':
          dataInput = (
            <InputNumber
              className={styles.input}
              id={data.name}
              value={currentDataValue[data.name]}
              onChange={(value) => {this.changeSelectValue(value, data.name, data.type)}}
              onBlur={() => {this.updateParameters(data.name)}}
            />
          );
          break;
        case 'bool':
          dataInput = (
            <Switch
              key={data.name}
              className={styles.switch}
              checked={currentDataValue[data.name]}
              onChange={(value:any) => {this.changeSelectValue(value, data.name, data.type)}}
            />
          );
          break;
        case 'select':
          dataInput = (
            <Select
              id={data.name}
              className={styles.select}
              value={currentDataValue[data.name]}
              onChange={(value:any) => {this.changeSelectValue(value, data.name, data.type)}}
            >
              {
                data.options.map((option: any) => (<Option key={option.value} label={option.name.zh_CN} value={option.value}>{option.name.zh_CN}</Option>))
              }
            </Select>
          );
          break;
      }
      return (
        <div key={index} className={styles.parameter}>
          <div className={styles.label}><Tooltip title={data.label.zh_CN}>{data.label.zh_CN}</Tooltip></div>
          {dataInput}
        </div>
      )
    })

    return items
  }

  changeValue(e: any, id: any) {
    const type : string = e.currentTarget.type;
    if (type === 'number') {
      let step = '0.'
      const length = e.currentTarget.value.split('.').length > 1 ? e.currentTarget.value.split('.')[1].length - 1 : 0
      for (let i = 0; i < length; i++) {
        step += '0'
      }
      step += '1';
      document.getElementById(id)?.setAttribute("step",step);
    }
    this.updateValue(id, e.currentTarget.value)
  }

  changeRadioValue(e: any, id: any) {
    this.updateValue(id, e.target.value)
    this.updateParameters(id)
  }

  changeCheckValue(e: any, id: any) {
    this.updateValue(id, e.target.checked)
    this.updateParameters(id)
  }

  changeSelectValue(value: any, id: any, type: string) {
    this.updateValue(id, value)
    if (['range','bool','select'].includes(type)) {
      this.updateParameters(id)
    }
  }

  updateValue(id: string, value: any) {
    const { currentDataValue } = this.state;
    currentDataValue[id] = value;
    this.setState((prevState: ParamSettingState) => ({
      currentDataValue: {
        ...prevState.currentDataValue,
        [`${id}`]: value,
      }
    }));
  }

  updateParameters(id: any) {
    const { currentDataValue } = this.state
    this.props.updateParameters(id,currentDataValue[id])
  }

  render() {
    const { types, currentDataValue } = this.state;
    return (
      <div className={styles.psetting}>
        <Card 
          // title="参数设置" 
          headStyle={{background:'#efeded',margin:'24px 24px 0px 24px',paddingLeft:'-24px',height:'30px'}} 
          className={styles.parameters}
        >
          {this.renderParams(types, currentDataValue)}
        </Card>
      </div>
    )
  }
}

export default connect(({ calibration }: ConnectState) => ({
  calibration
}))(ParamSetting);
