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
      <div className="uxcore-steps-demo">
        <h3>横向步骤条(标准)</h3>
        <div className="demo-box">
          <Steps current={2} type="arrow-bar">
            <Step key={0} title={'步骤一'} />
            <Step key={1} title={'步骤二'} description="描述文案" />
            <Step key={2} title={'步骤三'} status="error" />
            <Step key={3} title={'步骤四'} />
          </Steps>
        </div>
        <div className="demo-box">
          <Steps current={2} type="bottom-desc">
            <Step key={0} title={'步骤一'} description="描述文案" />
            <Step key={1} title={'步骤二'} description="描述文案" />
            <Step key={2} title={'步骤三'} description="描述文案" />
            <Step key={3} title={'步骤四'} description="描述文案" />
          </Steps>
        </div>
        <div className="demo-box">
          <Steps current={2} type="bottom-desc">
            <Step key={0} title={'步骤一'} description="描述文案" />
            <Step key={1} title={'步骤二'} description="描述文案" />
            <Step key={2} title={'步骤三'} description="描述文案" status="error" />
            <Step key={3} title={'步骤四'} description="描述文案" />
          </Steps>
        </div>
        <div className="demo-box">
          <Steps current={2} showIcon={false} type="bottom-desc">
            <Step key={0} title={'步骤一'} />
            <Step key={1} title={'步骤二'} />
            <Step key={2} title={'步骤三'} />
            <Step key={3} title={'步骤四'} />
          </Steps>
        </div>
        <div className="demo-box">
          <Steps current={2} showIcon={false} type="bottom-desc">
            <Step key={0} title={'步骤一'} />
            <Step key={1} title={'步骤二'} />
            <Step key={2} title={'步骤三'} status="error" />
            <Step key={3} title={'步骤四'} />
          </Steps>
        </div>
        <h3>横向步骤条(可返回编辑)</h3>
        <div className="demo-box">
          <Steps current={2} type="bottom-desc">
            <Step key={0} title={'步骤一'} description="描述文案" editable />
            <Step key={1} title={'步骤二'} description="描述文案" />
            <Step key={2} title={'步骤三'} description="描述文案" />
            <Step key={3} title={'步骤四'} description="描述文案" />
          </Steps>
        </div>
        <div className="demo-box">
          <Steps current={2} showIcon={false}>
            <Step key={0} title={'步骤一'} editable />
            <Step key={1} title={'步骤二'} />
            <Step key={2} title={'步骤三'} />
            <Step key={3} title={'步骤四'} />
          </Steps>
        </div>
        <h2>纵向步骤条</h2>
        <div className="vertical-demo">
          <h3>不可返回编辑</h3>
          <div className="demo-box">
            <Steps current={1} showIcon direction="vertical">
              <Step key={0} title={'步骤一'} description="这里是说明文案" />
              <Step key={1} title={'步骤二'} description="这里是说明文案" />
              <Step key={2} title={'步骤三'} description="这里是说明文案" />
              <Step key={3} title={'步骤四'} description="这里是说明文案" />
              <Step key={4} title={'已完成'} description="这里是说明文案" />
            </Steps>
          </div>
        </div>
        <div className="vertical-demo">
          <h3>可返回编辑</h3>
          <div className="demo-box">
            <Steps current={1} direction="vertical" showIcon={false}>
              <Step key={0} title={'步骤一'} description="这里是说明文案" />
              <Step key={1} title={'步骤二'} description="这里是说明文案" />
              <Step key={2} title={'步骤三'} description="这里是说明文案" />
              <Step key={3} title={'步骤四'} description="这里是说明文案" />
              <Step key={4} title={'已完成'} description="这里是说明文案" />
            </Steps>
          </div>
        </div>


        <div className="demo-box">
          <Steps
            current={1} showIcon
            onChange={this.cb.bind(this)} showDetail currentDetail={this.state.c}
          >
            <Step key={0} title={'步骤一'} >步骤1, 利用回调函数改变currentDetail取值来切换详情面板</Step>
            <Step key={1} title={'步骤二'} >步骤2, 利用回调函数改变currentDetail取值来切换详情面板</Step>
            <Step key={2} title={'步骤三'} status="error" >步骤3, 利用回调函数改变currentDetail取值来切换详情面板</Step>
            <Step key={3} title={'步骤四'} >步骤4, 利用回调函数改变currentDetail取值来切换详情面板</Step>
            <Step key={4} title={'已完成'} >步骤5
              <br />利用回调函数改变currentDetail取值来切换详情面板
              <br />利用回调函数改变currentDetail取值来切换详情面板
              <br />利用回调函数改变currentDetail取值来切换详情面板
              <br />利用回调函数改变currentDetail取值来切换详情面板
            </Step>
          </Steps>
        </div>
        <div className="demo-box">
          <Steps current={3} showIcon >
            <Step key={0} editable={true} title={'步骤一'} />
            <Step key={1} editable={true} title={'步骤二'} />
            <Step key={2} title={'步骤三'} />
            <Step key={3} title={'步骤四'} />
            <Step key={4} title={'已完成'} />
          </Steps>
        </div>
        <h3>横向步骤条(样式二)</h3>
        <div className="demo-box">
          <Steps current={1} showIcon={false}>
            <Step key={0} title={'步骤一'} description="内容文案内容文案内容文案内容文案" />
            <Step key={1} title={'步骤二'} description="内容文案内容文案内容文案内容文案" />
            <Step key={2} title={'步骤三'} description="内容文案内容文案内容文案内容文案" />
            <Step key={3} title={'步骤四'} description="内容文案内容文案内容文案内容文案" />
          </Steps>
        </div>
        <h3>显示时间的步骤条</h3>
        <div className="demo-box">
          <Steps current={1} showIcon type="title-on-top" >
            <Step key={0} title={'步骤一'} description="2015-10-11" />
            <Step key={1} title={'步骤二'} description="2015-10-12" />
            <Step key={2} title={'步骤三'} description="2015-10-13" />
            <Step key={3} title={'步骤四'} description="2015-10-14" />
            <Step key={4} title={'已完成'} description="2015-10-15" />
          </Steps>
        </div>
        <h3>大量文案描述的步骤条</h3>
        <div className="demo-box">
          <Steps current={1} showIcon type="long-desc" showDetail currentDetail={0}>
            <Step key={0} title={'步骤一'} description="这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案" />
            <Step key={1} title={'步骤二'} description="这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案" />
            <Step key={2} title={'步骤三'} description="这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案" />
            <Step key={3} title={'步骤四'} description="这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案" />
          </Steps>
        </div>
        
      </div>
    );
  }
}

module.exports = Demo;
