import { AnyAction } from 'redux';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';

import { CalibrationModelState } from '../../blocks/ParamSetting/src'
import { CameraModelState } from '../../blocks/CameraSetting/src/models/camerasetting';

export { GlobalModelState, SettingModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    camera?: boolean;
    calibration?: boolean;
  };
}

export interface ConnectState {
  loading: Loading;
  calibration: CalibrationModelState;
  camerasetting: CameraModelState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch<AnyAction>;
}
