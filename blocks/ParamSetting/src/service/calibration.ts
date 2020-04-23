import request from '@/utils/request';

export async function supportParameters(): Promise<any> {
  return request('support_parameters');
}

export async function getTempList(): Promise<any> {
  return request('get_templates');
}

export async function getTempDetail(data: any): Promise<any> {
  return request('template/args/get', { 
      method: 'post',
      data
    }
  );
}

export async function createTemplate(data: any): Promise<any> {
  return request('create_template', { 
    method: 'post',
    data
  });
}

export async function deleteTemplates (data: any): Promise<any> {
  return request('delete_templates', { 
    method: 'post',
    data
  });
}

export async function trainImage (data: any): Promise<any> {
  return request('set_train_image ', {
    method: 'post',
    data
  });
}

export async function roiSet (data: any): Promise<any> {
  return request('roi_set', {
    method: 'post',
    data
  });
}

// export async function setTrainImage (data: any): Promise<any> {
//   return request('set_train_image ', {
//     method: 'post',
//     data
//   });
// }

export async function argsUpdate (data: any): Promise<any> {
  return request('functions/args/update', {
    method: 'post',
    data
  });
}

export async function train (data: any): Promise<any> {
  return request('train', {
    method: 'post',
    data
  });
}

export async function updateFeatures (data: any): Promise<any> {
  return request('features/update', {
    method: 'post',
    data
  });
}

export async function updateCoordinate (data: any): Promise<any> {
  return request('coordinate/update', {
    method: 'post',
    data
  });
}

export async function test (data: any): Promise<any> {
  return request('test', {
    method: 'post',
    data
  });
}

export async function submit (data: any): Promise<any> {
  return request('submit', {
    method: 'post',
    data
  });
}