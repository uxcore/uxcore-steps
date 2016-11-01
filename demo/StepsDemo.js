/**
 * Steps Component Demo for uxcore
 * @author vincent.bian
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

// let classnames = require('classnames');

import React from 'react';
import Steps, { Step } from '../src';

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      c: 4,
    };
  }

  cb(v) {
    this.setState({ c: v });
  }

  render() {
    return (
      <div>
        <h2>步骤条</h2>
        <h3>横向步骤条(标准)</h3>
        <div className="demo-box">
          <Steps current={3} showIcon onChange={this.cb.bind(this)} showDetail currentDetail={this.state.c}>
            <Step key={0} title={'步骤一'} >步骤1, 利用回调函数改变currentDetail取值来切换详情</Step>
            <Step key={1} title={'步骤二'} >步骤2, 利用回调函数改变currentDetail取值来切换详情</Step>
            <Step key={2} title={'步骤三'} >步骤3, 利用回调函数改变currentDetail取值来切换详情</Step>
            <Step key={3} title={'步骤四'} >步骤4, 利用回调函数改变currentDetail取值来切换详情</Step>
            <Step key={4} title={'已完成'} >步骤5
              <br />我是比较高的最后一步
              <br />我是比较高的最后一步
              <br />我是比较高的最后一步
              <br />我是比较高的最后一步
            </Step>
          </Steps>
        </div>
        <div className="demo-box">
          <Steps current={5} showIcon >
            <Step key={0} title={'步骤一'} />
            <Step key={1} title={'步骤二'} />
            <Step key={2} title={'步骤三'} />
            <Step key={3} title={'步骤四'} />
            <Step key={4} title={'已完成'} />
          </Steps>
        </div>
        <div className="demo-box">
          <Steps current={3} showIcon={false}>
            <Step key={0} title={'步骤一'} />
            <Step key={1} title={'步骤二'} />
            <Step key={2} title={'步骤三'} />
            <Step key={3} title={'步骤四'} />
            <Step key={4} title={'已完成'} >
                            我是最后一个元素
            </Step>
          </Steps>
        </div>
        <h3>横向步骤条(样式二)</h3>
        <div className="demo-box">
          <Steps current={3} showIcon>
            <Step key={0} title={'步骤一'} description="内容文案内容文案内容文案内容文案" />
            <Step key={1} title={'步骤二'} description="内容文案内容文案内容文案内容文案" />
            <Step key={2} title={'步骤三'} description="内容文案内容文案内容文案内容文案" />
            <Step key={3} title={'步骤四'} description="内容文案内容文案内容文案内容文案" />
            <Step key={4} title={'已完成'} description="内容文案内容文案内容文案内容文案" />
          </Steps>
        </div>
        <h3>显示时间的步骤条</h3>
        <div className="demo-box">
          <Steps current={3} showIcon type="title-on-top" >
            <Step key={0} title={'步骤一'} description="2015-10-11" />
            <Step key={1} title={'步骤二'} description="2015-10-12" />
            <Step key={2} title={'步骤三'} description="2015-10-13" />
            <Step key={3} title={'步骤四'} description="2015-10-14" />
            <Step key={4} title={'已完成'} description="2015-10-15" />
          </Steps>
        </div>
        <h3>大量文案描述的步骤条</h3>
        <div className="demo-box">
          <Steps current={3} showIcon type="long-desc" showDetail currentDetail={0}>
            <Step key={0} title={'步骤一'} description="这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案" />
            <Step key={1} title={'步骤二'} description="这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案" />
            <Step key={2} title={'步骤三'} description="这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案" />
            <Step key={3} title={'步骤四'} description="这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案" />
            <Step key={4} title={'已完成'} description="这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案" />
          </Steps>
        </div>
        <h3>纵向步骤条</h3>
        <div className="demo-box">
          <Steps current={3} showIcon direction="vertical">
            <Step key={0} title={'步骤一'} description="这里是说明文案" />
            <Step key={1} title={'步骤二'} description="这里是说明文案" />
            <Step key={2} title={'步骤三'} description="这里是说明文案" />
            <Step key={3} title={'步骤四'} description="这里是说明文案" />
            <Step key={4} title={'已完成'} description="这里是说明文案" />
          </Steps>
        </div>
      </div>
    );
  }
}

module.exports = Demo;
