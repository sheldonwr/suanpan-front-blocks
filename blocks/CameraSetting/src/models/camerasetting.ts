import { Reducer } from 'redux';
import { Effect } from 'dva';

import {
  getInputInfo,
  getParameters,
  getArguments,
  updateArguments,
} from '../services/camerasetting';

export interface ChessboardParameters {
  type: 'float' | 'string';
  name: string;
  label: {
    zh_CN: string;
  };
}

export interface InputInfo {
  last_access_time: number;
  last_information_changed_time: number;
  last_modified_time: number;
  path: string;
  size: number;
}

export interface Parameter {
  type: string;
  name: string;
  label: {
    en?: string;
    zh_CN?: string;
  };
  value?: any;
}

export interface Parameters {
  title: string;
  parameters: Array<Parameter>;
}

export interface CameraModelState {
  parameters?: Parameters;
  currentParameters?: { [key: string]: any };
}

export interface CameraSettingModelType {
  namespace: 'camerasetting';
  state: CameraModelState;
  effects: {
    getInputInfo: Effect;
    getParameters: Effect;
    getArguments: Effect;
    updateArguments: Effect;
  };
  reducers: {
    saveInputInfo: Reducer<CameraModelState>;
    saveParameters: Reducer<CameraModelState>;
    saveArguments: Reducer<CameraModelState>;
  };
}

const CameraSettingModel: CameraSettingModelType = {
  namespace: 'camerasetting',

  state: {
    currentParameters: {}
  },

  effects: {
    *getInputInfo(_, { call, put }) {
      const data = yield call(getInputInfo);
      yield put({
        type: 'saveInputInfo',
        payload: data,
      });
    },

    *getParameters(_, { call, put }) {
      const data = yield call(getParameters);
      yield put({
        type: 'saveParameters',
        payload: data,
      });
    },

    *getArguments(_, { call, put }) {
      const data = yield call(getArguments);
      yield put({
        type: 'saveArguments',
        payload: data,
      });
    },

    *updateArguments(_, { call, put }) {
      yield call(updateArguments, _.data);
      yield put({ type: 'getInputInfo' });
    },
  },

  reducers: {
    saveInputInfo(state, { payload }): CameraModelState {
      return {
        ...state,
        inputInfo: payload,
      };
    },

    saveParameters(state, { payload }): CameraModelState {
      return {
        ...state,
        parameters: payload,
      };
    },

    saveArguments(state, { payload }): CameraModelState {
      return {
        ...state,
        currentParameters: payload,
      };
    },
  },
};

export default CameraSettingModel;
