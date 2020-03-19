export default {
  "GET /support_parameters": {
    "title": "相机参数调整",
    "parameters": [
      {"type": "float", "name": "dp", "label": {"zh_CN": "累加器分辨率与图像分辨率的反比"}},
      {"type": "float", "name": "minDist", "label": {"zh_CN": "不同圆圆心的最短距离"}},
      {"type": "float", "name": "paramOne", "label": {"zh_CN": "Canny阈值"}},
      {"type": "float", "name": "paramTwo", "label": {"zh_CN": "投票阈值"}},
      {"type": "float", "name": "minRadius", "label": {"zh_CN": "最小半径"}},
      {"type": "float", "name": "maxRadius", "label": {"zh_CN": "最大半径"}},
    ]
  },
  "GET /get_templates": {
    templates: ['temp1','temp2']
  },
  "POST /template/args/get/temp1": {
    "success": true,
    "images": {
      "original": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1220056307,407109612&fm=26&gp=0.jpg",
      "template": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1220056307,407109612&fm=26&gp=0.jpg",
      "feature": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1220056307,407109612&fm=26&gp=0.jpg",
      "test": ["https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1220056307,407109612&fm=26&gp=0.jpg"],
      "result": ["https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1220056307,407109612&fm=26&gp=0.jpg"],
    },
    "param": {
      'dp':'1',
      'minDist':'1',
      'paramOne':'1',
      'paramTwo':'1',
      'minRadius':'1',
      'maxRadius':'1'
    },
    // "roi": {...},
    // "mask": {...},
    "coordinate": {
      "x": 100,
      "y": 200,
      "orientation": 30
    }
  },
  "POST /template/args/get/temp2": {
    "success": true,
    "images": {
      "original": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1630785361,3822785478&fm=26&gp=0.jpg",
      "template": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1630785361,3822785478&fm=26&gp=0.jpg",
      "feature": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1630785361,3822785478&fm=26&gp=0.jpg",
      "test": [
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1630785361,3822785478&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1220056307,407109612&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1630785361,3822785478&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1630785361,3822785478&fm=26&gp=0.jpg"
      ],
      "result": ["https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1630785361,3822785478&fm=26&gp=0.jpg"],
    },
    "param": {
      'dp':'1',
      'minDist':'1',
      'paramOne':'1',
      'paramTwo':'1',
      'minRadius':'1',
      'maxRadius':'1'
    },
    // "roi": {...},
    // "mask": {...},
    "coordinate": {
      "x": 100,
      "y": 200,
      "orientation": 30
    }
  },
  "POST /create_template": {"success": true},
  "POST /delete_templates": {"success": true},
  "POST /train_image": {"success": true},
  "POST /roi_set": {"success": true},
  "POST /functions/args/update": {"success": true},
  "POST /train": {"success": true},
  "POST /features/update": {"success": true},
  "POST /coordinate/update": {"success": true},
  "POST /test_image": {"success": true},
  "POST /test": {"success": true},
  "POST /submit": {"success": true},
}