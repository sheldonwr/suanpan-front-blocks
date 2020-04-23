import request from '@/utils/request';

// 图片api
export async function getInputInfo(): Promise<any> {
  return request('image/meta/input');
}

// 相机参数api
export async function getParameters(): Promise<any> {
  return request('parameters');
}

export async function getArguments(): Promise<any> {
  return request('args/get');
}

export async function updateArguments(data: any): Promise<any> {
  return request('args/update', { method: 'post', data });
}