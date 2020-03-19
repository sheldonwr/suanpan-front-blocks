import { Reducer } from 'redux';
import { Effect } from 'dva';

import { 
  supportParameters,
  getTempList,
  getTempDetail,
  createTemplate,
  deleteTemplates,
  trainImage,
  roiSet,
  argsUpdate,
  train,
  updateFeatures,
  updateCoordinate,
  testImage,
  test,
  submit
} from '../service/calibration';

export interface Parameter {
  type: string;
  name: string;
  label: {
    en?: string;
    zh_CN?: string;
  };
}

export interface Parameters {
  title: string;
  parameters: Array<Parameter>;
}

export interface CalibrationModelState {
  parameters: Parameters;
}

export interface CalibrationModelType {
  namespace: 'calibration';
  state: CalibrationModelState;
  effects: {
    supportParameters : Effect;
    getTempList: Effect;
    getTempDetail: Effect;
    createTemplate: Effect;
    deleteTemplates: Effect;
    trainImage: Effect;
    roiSet: Effect;
    argsUpdate: Effect;
    train: Effect;
    updateFeatures: Effect;
    updateCoordinate: Effect;
    testImage: Effect;
    test: Effect;
    submit: Effect;
  };
  reducers: {
    saveParameters: Reducer<CalibrationModelState>;
  };
}

const CalibrationModel: CalibrationModelType = {
  namespace: 'calibration',

  state: {
    parameters: {
      title: '',
      parameters: [],
    }
  },

  effects: {

    *supportParameters({ payload,callback }, { call, put }) {
      const data = yield call(supportParameters);
      yield put({
        type: 'saveParameters',
        payload: data
      });
    },

    *getTempList({ payload,callback }, { call, put }) {
      const data = yield call(getTempList);
      yield put({
        type: 'saveTempList',
        payload: data
      });
      if(callback) callback(data)
    },

    *getTempDetail({ payload,callback }, { call, put }) {
      const data = yield call(getTempDetail,payload);
      if(callback) callback(data)
    },

    *createTemplate({ payload,callback }, { call, put }) {
      const data = yield call(createTemplate,payload);
      if(callback) callback(data)
    },

    *deleteTemplates({ payload,callback }, { call, put }) {
      const data = yield call(deleteTemplates,payload);
      if(callback) callback(data)
    },

    *trainImage({ payload,callback }, { call, put }) {
      const data = yield call(trainImage,payload);
      if(callback) callback(data)
    },

    *roiSet({ payload,callback }, { call, put }) {
      const data = yield call(roiSet,payload);
      if(callback) callback(data)
    },

    *argsUpdate({ payload,callback }, { call, put }) {
      const data = yield call(argsUpdate,payload);
      if(callback) callback(data)
    },

    *train({ payload,callback }, { call, put }) {
      const data = yield call(train,payload);
      if(callback) callback(data)
    },

    *updateFeatures({ payload,callback }, { call, put }) {
      const data = yield call(updateFeatures,payload);
      if(callback) callback(data)
    },

    *updateCoordinate({ payload,callback }, { call, put }) {
      const data = yield call(updateCoordinate,payload);
      if(callback) callback(data)
    },

    *testImage({ payload,callback }, { call, put }) {
      const data = yield call(testImage,payload);
      if(callback) callback(data)
    },

    *test({ payload,callback }, { call, put }) {
      const data = yield call(test,payload);
      if(callback) callback(data)
    },

    *submit({ payload,callback }, { call, put }) {
      const data = yield call(submit,payload);
      if(callback) callback(data)
    }
  },

  reducers: {
    saveParameters(state, { payload }): CalibrationModelState {
      return {
        ...state,
        parameters: payload
      }
    },
  }
};

export default CalibrationModel;
