import React from 'react';
import { List, Card } from 'antd';

import styles from './blockpreview.less';

const list = [
  { title: '参数面板组件', description: '参数面板组件，数据结构与算盘web右面板一致', img: '', link: '#/paramsetting' }
];

const BlockPreview: React.FC = () => (
  <List
    className={styles.blocklist}
    dataSource={list}
    renderItem={item => (
      <List.Item
        className={styles.blockinfo}
        key={item.title}
      >
        <Card
          className={styles.content}
          title={item.title}
          cover={
            <a href={item.link}>
              <img
                className={styles.image}
                alt="preview"
                src={item.img || "/images/block.jpg"}
              />
            </a>
          }
        >
          <p className={styles.description}>{item.description}</p>
          <p className={styles.commandtitle}>安装命令</p>
          <p className={styles.command}>umi block add</p>
        </Card>
      </List.Item>
    )}
  />
)

export default BlockPreview;