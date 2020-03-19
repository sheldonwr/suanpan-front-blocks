export default {
  "GET /parameters": {
    "title": "相机参数调整",
    "parameters": [
      {
        "type": "select",
        "name": "resolution",
        "label": {
          "zh_CN": "分辨率"
        },
        "options": [
          {
            "name": {
              "zh_CN": "3264x1848"
            },
            "value": "3264x1848"
          },
          {
            "name": {
              "zh_CN": "1920x1080"
            },
            "value": "1920x1080"
          },
          {
            "name": {
              "zh_CN": "1280x720"
            },
            "value": "1280x720"
          }
        ]
      },
      {
        "type": "float",
        "name": "fps",
        "label": {
          "zh_CN": "FPS"
        }
      },
      {
        "type": "select",
        "name": "itype",
        "label": {
          "zh_CN": "图片格式"
        },
        "options": [
          {
            "name": {
              "zh_CN": "MONO8"
            },
            "value": "MONO8"
          },
          {
            "name": {
              "zh_CN": "RGB888"
            },
            "value": "RGB888"
          },
          {
            "name": {
              "zh_CN": "YUV420"
            },
            "value": "YUV420"
          },
          {
            "name": {
              "zh_CN": "JPEG"
            },
            "value": "JPEG"
          },
          {
            "name": {
              "zh_CN": "JPEG_SW"
            },
            "value": "JPEG_SW"
          },
          {
            "name": {
              "zh_CN": "JPEG_SLOW"
            },
            "value": "JPEG_SLOW"
          },
          {
            "name": {
              "zh_CN": "YCbCr420"
            },
            "value": "YCbCr420"
          }
        ]
      },
      {
        "type": "float",
        "name": "jpegQuality",
        "label": {
          "zh_CN": "JPEG 质量标签"
        }
      },
      {
        "type": "float",
        "name": "exposureCompensation",
        "label": {
          "zh_CN": "曝光增益"
        }
      },
      {
        "type": "float",
        "name": "analogGain",
        "label": {
          "zh_CN": "Analog Gain"
        }
      },
      {
        "type": "string",
        "name": "roi",
        "label": {
          "zh_CN": "裁剪"
        }
      },
      {
        "type": "string",
        "name": "scale",
        "label": {
          "zh_CN": "缩放"
        }
      }
    ]
  }
}