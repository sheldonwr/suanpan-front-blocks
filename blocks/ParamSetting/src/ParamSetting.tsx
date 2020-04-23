/* eslint-disable no-plusplus */
import React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'dva';
import { Input, Select, Checkbox, Card, Slider, Radio, InputNumber, Switch, Form } from 'antd';
import _ from 'lodash';
import { ConnectState } from '@/models/connect';
import { CalibrationModelState } from './models/calibration';

import styles from './ParamSetting.less';

const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;

export interface ParamSettingProps {
  dispatch: Dispatch<AnyAction>;
  calibration: CalibrationModelState;
  currentDataValue: { [key: string]: string | number };
  parameterTypes: Array<any>;
  updateParameters: (key: string, value: any) => void;
}

export interface ParamSettingState {
  types: Array<any>;
  currentDataValue: { [key: string]: string | number };
}

class ParamSetting extends React.Component<ParamSettingProps, ParamSettingState> {
  state = {
    types: [],
    currentDataValue: {},
  };

  componentDidMount() {}

  static getDerivedStateFromProps(nextProps: ParamSettingProps) {
    const { parameterTypes, currentDataValue } = nextProps;
    if (!_.isEmpty(parameterTypes)) {
      return {
        types: parameterTypes,
        currentDataValue: ParamSetting.getDataValue(parameterTypes, currentDataValue),
      };
    }

    return null;
  }

  static getDataValue(types: Array<any> = [], data: any = {}) {
    types.forEach((t: any) => {
      const dat = data;
      const currentData = data[t.name];
      if (currentData && t.type === 'string' && typeof currentData !== 'string') {
        dat[t.name] = JSON.stringify(currentData);
      }
    });

    return data;
  }

  changeValue(e: any, id: any) {
    const { type } = e.currentTarget;
    if (type === 'number') {
      let step = '0.';
      const length =
        e.currentTarget.value.split('.').length > 1
          ? e.currentTarget.value.split('.')[1].length - 1
          : 0;
      for (let i = 0; i < length; i++) {
        step += '0';
      }
      step += '1';
      const $step = document.getElementById(id);
      if ($step) {
        $step.setAttribute('step', step);
      }
    }
    this.updateValue(id, e.currentTarget.value);
  }

  changeRadioValue(e: any, id: any) {
    this.updateValue(id, e.target.value);
    this.updateParameters(id, false);
  }

  changeCheckValue(e: any, id: any) {
    this.updateValue(id, e.target.checked);
    this.updateParameters(id, false);
  }

  changeSelectValue(value: any, id: any, type: string) {
    this.updateValue(id, value);
    if (['range', 'bool', 'select'].includes(type)) {
      this.updateParameters(id, false);
    }
  }

  updateValue(id: string, value: any) {
    const { currentDataValue } = this.state;
    currentDataValue[id] = value;
    this.setState((prevState: ParamSettingState) => ({
      currentDataValue: {
        ...prevState.currentDataValue,
        [`${id}`]: value,
      },
    }));
  }

  updateParameters(id: any, illegalInput: boolean) {
    if (illegalInput) {
      return;
    }
    const { currentDataValue } = this.state;
    this.props.updateParameters(id, currentDataValue[id]);
  }

  renderParams(types: Array<any>, currentDataValue: any) {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    const getHelp = (isMin: boolean, min: number, isMax: boolean, max: number) => {
      if (isMin) {
        return `最小值为${min}`;
      }

      if (isMax) {
        return `最大值为${max}`;
      }

      return '';
    };

    const items = types.map(data => {
      let dataInput = null;
      const marks = {
        [data.range_start]: data.range_start,
        [data.range_finish]: data.range_finish,
      };

      const min = data.range_start ? data.range_start : -Infinity;
      const max = data.range_finish ? data.range_finish : Infinity;
      const condition1 = currentDataValue[data.name] < min;
      const condition2 = currentDataValue[data.name] > max;

      switch (data.type) {
        case 'string':
          dataInput = (
            <FormItem label={data.label.zh_CN} key={data.label.zh_CN}>
              <Input
                id={data.name}
                className={styles.input}
                value={currentDataValue[data.name]}
                ref={data.name}
                onChange={e => {
                  this.changeValue(e, data.name);
                }}
                onBlur={() => {
                  this.updateParameters(data.name, false);
                }}
              />
            </FormItem>
          );
          break;
        case 'multi_string':
          dataInput = (
            <FormItem label={data.label.zh_CN} key={data.label.zh_CN}>
              <TextArea
                id={data.name}
                className={styles.input}
                value={currentDataValue[data.name]}
                onChange={e => {
                  this.changeValue(e, data.name);
                }}
                onBlur={() => {
                  this.updateParameters(data.name, false);
                }}
              />
            </FormItem>
          );
          break;
        case 'password':
          dataInput = (
            <FormItem label={data.label.zh_CN} key={data.label.zh_CN}>
              <Input
                type="password"
                id={data.name}
                className={styles.input}
                value={currentDataValue[data.name]}
                onChange={e => {
                  this.changeValue(e, data.name);
                }}
                onBlur={() => {
                  this.updateParameters(data.name, false);
                }}
              />
            </FormItem>
          );
          break;
        case 'checkbox':
          dataInput = (
            <FormItem label={data.label.zh_CN} key={data.label.zh_CN}>
              <Checkbox
                id={data.name}
                checked={currentDataValue[data.name]}
                onChange={e => {
                  this.changeCheckValue(e, data.name);
                }}
              />
            </FormItem>
          );
          break;
        case 'range':
          dataInput = (
            <FormItem label={data.label.zh_CN} key={data.label.zh_CN}>
              <Slider
                marks={marks}
                value={currentDataValue[data.name]}
                tooltipVisible
                step={data.range_step}
                min={data.range_start}
                max={data.range_finish}
                onChange={e => {
                  this.changeSelectValue(e, data.name, data.type);
                }}
                style={{ width: '50%' }}
              />
            </FormItem>
          );
          break;
        case 'radio':
          dataInput = (
            <FormItem label={data.label.zh_CN} key={data.label.zh_CN}>
              <Radio.Group
                onChange={e => {
                  this.changeRadioValue(e, data.name);
                }}
                value={currentDataValue[data.name]}
              >
                {data.options.map((option: any) => (
                  <Radio key={option.value} value={option.value}>
                    {option.name.zh_CN}
                  </Radio>
                ))}
              </Radio.Group>
            </FormItem>
          );
          break;
        case 'float':
          dataInput = (
            <FormItem
              label={data.label.zh_CN}
              key={data.label.zh_CN}
              validateStatus={condition1 || condition2 ? 'error' : ''}
              help={getHelp(condition1, min, condition2, max)}
            >
              <Input
                id={data.name}
                type="number"
                value={currentDataValue[data.name]}
                min={data.options ? data.options.min : -Infinity}
                max={data.options ? data.options.max : Infinity}
                onChange={e => {
                  this.changeValue(e, data.name);
                }}
                onBlur={() => {
                  this.updateParameters(data.name, condition1 || condition2);
                }}
              />
            </FormItem>
          );
          break;
        case 'int':
          dataInput = (
            <FormItem label={data.label.zh_CN} key={`${data.label.zh_CN}`}>
              <InputNumber
                className={styles.input}
                id={data.name}
                value={currentDataValue[data.name]}
                parser={(value: any) => value.replace('.', '')}
                onChange={value => {
                  this.changeSelectValue(value, data.name, data.type);
                }}
                onBlur={() => {
                  this.updateParameters(data.name, false);
                }}
              />
            </FormItem>
          );
          break;
        case 'bool':
          dataInput = (
            <FormItem label={data.label.zh_CN} key={data.label.zh_CN}>
              <Switch
                key={data.name}
                className={styles.switch}
                checked={currentDataValue[data.name]}
                onChange={(value: any) => {
                  this.changeSelectValue(value, data.name, data.type);
                }}
              />
            </FormItem>
          );
          break;
        case 'select':
          dataInput = (
            <FormItem label={data.label.zh_CN} key={data.label.zh_CN}>
              <Select
                id={data.name}
                className={styles.select}
                value={currentDataValue[data.name]}
                onChange={(value: any) => {
                  this.changeSelectValue(value, data.name, data.type);
                }}
              >
                {data.options.map((option: any) => (
                  <Option key={option.value} label={option.name.zh_CN} value={option.value}>
                    {option.name.zh_CN}
                  </Option>
                ))}
              </Select>
            </FormItem>
          );
          break;
        default:
          break;
      }
      return (
        <div>
          <Form {...layout}>{dataInput}</Form>
        </div>
      );
    });

    return items;
  }

  render() {
    const { types, currentDataValue } = this.state;
    return (
      <div className={styles.psetting}>
        <Card
          // title="参数设置"
          headStyle={{
            background: '#efeded',
            margin: '24px 24px 0px 24px',
            paddingLeft: '-24px',
            height: '30px',
          }}
          className={styles.parameters}
        >
          {this.renderParams(types, currentDataValue)}
        </Card>
      </div>
    );
  }
}

export default connect(({ calibration }: ConnectState) => ({
  calibration,
}))(ParamSetting);
