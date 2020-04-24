import React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'dva';
import { Button, Input, Select } from 'antd';
import _ from 'lodash';
import classnames from 'classnames';
import { ConnectState } from '@/models/connect';
import { CameraModelState } from './models/camerasetting';

import styles from './CameraSetting.less';

const { Option } = Select;

export interface CameraSettingProps {
  dispatch: Dispatch<AnyAction>;
  imageVisible: boolean;
  onChangeImageVisible: (imageVisible: boolean) => void;
  camera: CameraModelState;
}

export interface CameraSettingState {
  types: Array<any>;
  inputDisabled: boolean;
  currentDataValue: { [key: string]: string | number };
}

class CameraSetting extends React.Component<CameraSettingProps, CameraSettingState> {
  state = {
    types: [],
    inputDisabled: !this.props.imageVisible,
    currentDataValue: {},
  };

  componentDidMount() {
    this.props.dispatch({ type: 'camerasetting/getParameters' });
    this.props.dispatch({ type: 'camerasetting/getArguments' });
  }

  static getDerivedStateFromProps(nextProps: CameraSettingProps) {
    const { camera } = nextProps;
    const { parameters = { title: '', parameters: [] }, currentParameters = {} } = camera;

    if (!_.isEmpty(parameters.parameters) && !_.isEmpty(currentParameters)) {
      const arr = parameters.parameters;
      const newArr = [];
      const len = arr.length;
      for (let i = 0, j = 0; i < len; i += 4, j += 1) {
        newArr[j] = arr.splice(0, 4);
      }
      return {
        paramsType: parameters,
        types: newArr,
        currentData: currentParameters,
        currentDataValue: CameraSetting.getDataValue(newArr, currentParameters),
      };
    }

    return null;
  }

  static getDataValue(types: Array<any> = [], data: any = {}) {
    types.forEach((pt: any) => {
      pt.forEach((t: any) => {
        const currentData = data[t.name];
        if (t.type === 'string' && typeof currentData !== 'string') {
          // eslint-disable-next-line no-param-reassign
          data[t.name] = JSON.stringify(currentData);
        }
      });
    });

    return data;
  }

  openImage = () => {
    this.setState({ inputDisabled: false }, () => {
      this.props.onChangeImageVisible(true);
    });
  };

  closeImage = () => {
    this.setState({ inputDisabled: true }, () => {
      this.props.onChangeImageVisible(false);
    });
  };

  handleInputChange = (e: any, key: string) => {
    const value = _.get(e, 'target.value', '');
    this.setState((prevState: CameraSettingState) => ({
      currentDataValue: {
        ...prevState.currentDataValue,
        [`${key}`]: value,
      },
    }));
  };

  handleSelectChange = (key: string, value: any) => {
    this.setState((prevState: CameraSettingState) => ({
      currentDataValue: {
        ...prevState.currentDataValue,
        [`${key}`]: value,
      },
    }));
  };

  submit = () => {
    this.props.dispatch({ type: 'camerasetting/updateArguments', data: this.state.currentDataValue });
  };

  render() {
    const { inputDisabled, types, currentDataValue } = this.state;
    return (
      <div className={styles.csetting}>
        <div className={styles.display}>
          <Button
            type="primary"
            className={classnames({ selected: !inputDisabled })}
            onClick={this.openImage}
          >
            打开数据流
          </Button>
          <Button className={classnames({ selected: inputDisabled })} onClick={this.closeImage}>
            关闭数据流
          </Button>
        </div>
        <div className={styles.parameters}>
          <div className={styles.tabName}>
            <span>
              设置 (点击 &lt; <a href="#distortion">标定</a> &gt; 进入相机标定设置页面)
            </span>
          </div>
          <div>
            {types.map((type, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`${index}`} className={styles.content}>
                {Object.keys(type).map(key => {
                  const data: any = type[key];
                  let dataInput = null;
                  switch (data.type) {
                    case 'string':
                      dataInput = (
                        <Input
                          id={data.name}
                          className={styles.input}
                          value={currentDataValue[data.name]}
                          disabled={inputDisabled || data.readOnly}
                          onChange={(e: any) => {
                            this.handleInputChange(e, data.name);
                          }}
                        />
                      );
                      break;
                    case 'float':
                      dataInput = (
                        <Input
                          id={data.name}
                          className={styles.input}
                          value={currentDataValue[data.name]}
                          disabled={inputDisabled || data.readOnly}
                          min={data.options ? data.options.min : -Infinity}
                          max={data.options ? data.options.max : Infinity}
                          defaultValue="0"
                          onChange={(e: any) => {
                            this.handleInputChange(e, data.name);
                          }}
                        />
                      );
                      break;
                    case 'select':
                      dataInput = (
                        <Select
                          id={data.name}
                          className={styles.select}
                          value={currentDataValue[data.name]}
                          disabled={inputDisabled || data.readOnly}
                          onChange={(value: any) => {
                            this.handleSelectChange(data.name, value);
                          }}
                        >
                          {data.options.map((option: any) => (
                            <Option key={option.value} label={option.label} value={option.value}>
                              {option.value}
                            </Option>
                          ))}
                        </Select>
                      );
                      break;
                    default:
                      break;
                  }
                  return (
                    <div key={data.name} className={styles.parameter}>
                      <div className={styles.label}>{data.label.zh_CN}</div>
                      {dataInput}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.commit}>
          <Button type="primary" onClick={this.submit} disabled={inputDisabled}>
            提交
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(({ camerasetting }: ConnectState) => ({
  camerasetting,
}))(CameraSetting);
