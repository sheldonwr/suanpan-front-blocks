export const parameterTypes = [
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

export const currentDataValue = {
  "param1": "1280x720",
  "resolution": "1280x720",
  "param2": 2,
  "fps": 2,
  "param3": "RGB888",
  "itype": "RGB888",
  "param4": 75,
  "jpegQuality": 75,
  "param5": 20000000,
  "exposureTime": 20000000,
  "param6": 0.0,
  "exposureCompensation": 0.0,
  "param7": 2.0,
  "analogGain": 2.0,
  "param8": {},
  "roi": {},
  "param9": {},
  "scale": {},
  "debug": false,
  "storage_type": "local",
  "storage_oss_access_id": null,
  "storage_oss_access_key": null,
  "storage_oss_bucket_name": "suanpan",
  "storage_oss_endpoint": "http://oss-cn-beijing.aliyuncs.com",
  "storage_oss_delimiter": "/",
  "storage_oss_temp_store": "/tmp",
  "storage_oss_download_num_threads": 1,
  "storage_oss_download_store_name": ".py-oss-download",
  "storage_oss_upload_num_threads": 1,
  "storage_oss_upload_store_name": ".py-oss-upload",
  "storage_local_temp_store": "/sp_data",
  "storage_minio_access_key": null,
  "storage_minio_secret_key": null,
  "storage_minio_bucket_name": "suanpan",
  "storage_minio_endpoint": null,
  "storage_minio_secure": true,
  "storage_minio_delimiter": "/",
  "storage_minio_temp_store": "/tmp",
  "mstorage_type": "redis",
  "mstorage_redis_host": "app-18464-redis",
  "mstorage_redis_port": 6379,
  "mstorage_redis_keepalive": true,
  "mstorage_redis_keepalive_idle": 120,
  "mstorage_redis_keepalive_cnt": 2,
  "mstorage_redis_keepalive_intvl": 30,
  "mstorage_redis_expire": 30,
  "mstorage_redis_socket_connect_timeout": 1,
  "mstorage_redis_unix_socket_path": null,
  "mq_type": "redis",
  "mq_redis_host": "app-18464-redis",
  "mq_redis_port": 6379,
  "mq_redis_realtime": false,
  "mq_redis_keepalive": true,
  "mq_redis_socket_connect_timeout": 1,
  "mq_redis_unix_socket_path": null,
  "dw_type": "hive",
  "dw_hive_host": "localhost",
  "dw_hive_port": 10000,
  "dw_hive_database": "default",
  "dw_hive_username": null,
  "dw_hive_password": null,
  "dw_hive_auth": null,
  "dw_odps_access_id": null,
  "dw_odps_access_key": null,
  "dw_odps_endpoint": "http://service.cn.maxcompute.aliyun.com/api",
  "dw_odps_project": null,
  "dw_postgres_host": "localhost",
  "dw_postgres_port": 5432,
  "dw_postgres_database": null,
  "dw_postgres_username": null,
  "dw_postgres_password": null,
  "dw_mysql_host": "localhost",
  "dw_mysql_port": 3306,
  "dw_mysql_database": null,
  "dw_mysql_username": null,
  "dw_mysql_password": null,
  "sp_user_id": "100030",
  "sp_app_id": "18464",
  "sp_node_id": "230ac4f020b111ea8eab074f4dede1f6",
  "sp_node_group": "default",
  "stream_recv_queue": "mq-230ac4f020b111ea8eab074f4dede1f6",
  "stream_recv_queue_block": 60000,
  "stream_recv_queue_delay": 0,
  "stream_recv_queue_max_length": 1000,
  "stream_recv_queue_trim_immediately": false,
  "stream_recv_queue_retry": false,
  "stream_recv_queue_retry_max_count": 100,
  "stream_recv_queue_retry_timeout": 1.0,
  "stream_recv_queue_retry_max_times": 3,
  "stream_send_queue": "mq-master",
  "stream_send_queue_max_length": 2000,
  "stream_send_queue_trim_immediately": false,
  "triggerInterval": 0
}