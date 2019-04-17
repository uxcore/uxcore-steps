/**
 * Steps Component Demo for uxcore
 * @author vincent.bian
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

import React from 'react';
import Icon from 'uxcore-icon';
import Steps, { Step } from '../src';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      c: 4,
      s1: 1,
      s2: 1,
      s3: 2,
      s4: 2,
      s5: 4,
      s6: 2,
      steps: ['a', 'b', 'c', 'd'],
      stepsStyle2: ['a', 'b'],
      commonSteps: [
        { title: '步骤一', desc: '描述文字描述文字描述文字描述文字描述文字描述文' },
        { title: '步骤二', desc: '描述文字描述文字描述文字描述文字描述文' },
        { title: '步骤三', desc: '描述文字描述文字描述文字描描述文' },
        { title: '步骤四', desc: '描述文字描述文字描述文字描述文字描' },
      ],
      extraSteps: [],
    };

    this.changeSteps = this.changeSteps.bind(this);
    this.onIncrease = this.onIncrease.bind(this);
  }

  onIncrease() {
    this.setState({
      extraSteps: [...this.state.extraSteps, { title: `步骤${this.state.extraSteps.length}`, desc: Math.random().toString(26).slice(2) }],
    });
  }

  onChange(k, v) {
    const st = this.state;
    st[k] = v;
    this.setState(st);
  }

  cb(v) {
    this.setState({ c: v });
  }

  changeSteps() {
    this.setState({
      steps: ['a', 'b', 'c'],
      stepsStyle2: ['a', 'b', 'c', 'd'],
    });
  }

  renderExtraStep = () => {
    return this.state.extraSteps.map((st, i) => (
      <Step key={i} title={st.title} description={st.desc} />
    ));
  }

  renderCommonStep = () => {
    return this.state.commonSteps.map((st, i) => (
      <Step key={i} title={st.title} description={st.desc} />
    ));
  }

  render() {
    const jsxStepTitle = <span style={{ color: '#f60' }}>JSX步骤二</span>;
    const jsxStepDesc = (<div style={{ color: '#999' }}>
      <a href="javascript:alert('编辑');">编辑</a> 这是一个复杂的JSX描述信息
    </div>);
    return (
      <div className="uxcore-steps-demo">
        <div className="fixed-button"><button type="button" onClick={this.onIncrease}>增加一条</button></div>
        <h3>横向步骤条(横向基础)</h3>
        <button onClick={this.changeSteps}>更新步骤数量</button>
        <div className="demo-box">
          <Steps current={0} type="arrow-bar">
            {this.state.steps.map((step, idx) => <Step key={idx} title={`步骤${step}`} />)}
          </Steps>
        </div>
        <div className="demo-box">
          <Steps current={1} type="arrow-bar">
            <Step key={0} title={'步骤一'} />
            <Step key={1} title={'步骤二'} />
            <Step key={2} title={'步骤三'} />
          </Steps>
        </div>
        <div className="demo-box">
          <Steps current={1} type="arrow-bar">
            <Step key={0} title={'步骤一'} />
            <Step key={1} title={'步骤二'} status="error" />
            <Step key={2} title={'步骤三'} />
          </Steps>
        </div>
        <div className="demo-box">
          <Steps current={1} type="arrow-bar">
            <Step key={0} title={'步骤一'} />
            <Step key={1} title={'步骤二'} description="描述文案" />
            <Step key={2} title={'步骤三'} />
          </Steps>
        </div>
        <div className="demo-box s1">
          <Steps current={this.state.s1} type="arrow-bar" onChange={(v)=>{this.onChange('s1', v)}}>
            <Step key={0} title={'步骤一'} editable />
            <Step key={1} title={'步骤二'} status={this.state.s1 === 1 ? 'error' : ''} />
            <Step key={2} title={'步骤三'} description="描述文案" />
          </Steps>
        </div>
        <div className="demo-box">
          <Steps current={2} type="bottom-desc">
            <Step key={0} title={'步骤一'} icon={<Icon usei name="tupian" />} />
            <Step key={1} title={'步骤二'} icon={<Icon usei name="shezhi" />} />
            <Step key={2} title={'步骤三'} icon={<Icon usei name="youxiang" />} />
            <Step key={3} title={'步骤四'} icon={<Icon usei name="riqiqujian" />} />
            {
              this.renderExtraStep()
            }
          </Steps>
        </div>
        <div className="demo-box">
          <Steps current={2} type="bottom-desc">
            <Step key={0} title={'步骤一'} description="描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案" />
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
        <div className="demo-box">
          <Steps current={2} type="title-on-top">
            <Step key={0} title={'步骤一'} description="描述文案" />
            <Step key={1} title={'步骤二'} description="描述文案" />
            <Step key={2} title={'步骤三'} description="描述文案" />
            <Step key={3} title={'步骤四'} description="描述文案" />
          </Steps>
        </div>
        <div className="demo-box">
          <Steps current={2} showIcon={false} type="title-on-top">
            <Step key={0} title={'步骤一'} description="描述文案" />
            <Step key={1} title={'步骤二'} description="描述文案" />
            <Step key={2} title={'步骤三'} description="描述文案" />
            <Step key={3} title={'步骤四'} description="描述文案" />
          </Steps>
        </div>
        <h3>横向步骤条(可返回编辑)</h3>
        <div className="demo-box s2">
          <Steps current={this.state.s2} type="arrow-bar" onChange={(v)=>{this.onChange( 's2',v)}}>
            <Step key={0} title={'步骤一'} editable />
            <Step key={1} title={'步骤二'} />
            <Step key={2} title={'步骤二'} />
          </Steps>
        </div>
        <div className="demo-box s3">
          <Steps current={this.state.s3} type="bottom-desc" onChange={(v)=>{this.onChange('s3', v)}}>
            <Step key={0} title={'步骤一'} description="描述文案" editable />
            <Step key={1} title={'步骤二'} description="描述文案" />
            <Step key={2} title={'步骤三'} description="描述文案" />
            <Step key={3} title={'步骤四'} description="描述文案" />
          </Steps>
        </div>
        <div className="demo-box s4">
          <Steps current={this.state.s4} showIcon={false} onChange={(v)=>{this.onChange('s4', v)}}>
            <Step key={0} title={'步骤一'} editable />
            <Step key={1} title={'步骤二'} />
            <Step key={2} title={'步骤三'} />
            <Step key={3} title={'步骤四'} />
          </Steps>
        </div>
        <div className="demo-box s5">
          <Steps current={this.state.s5} type="bottom-desc" onChange={(v)=>{this.onChange('s5', v)}}>
            <Step key={0} title={'步骤一'} editable />
            <Step key={1} title={jsxStepTitle} description={jsxStepDesc} editable />
            <Step key={2} title={'步骤三'} editable />
            <Step key={3} title={'步骤四'} editable />
          </Steps>
        </div>
        <h2>纵向步骤条</h2>
        <div className="vertical-demo">
          <h3>不可返回编辑</h3>
          <div className="demo-box">
            <Steps current={2} showIcon direction="vertical">
              {this.renderCommonStep()}
              {this.renderExtraStep()}
            </Steps>
          </div>
        </div>
        <div className="vertical-demo">
          <h3>可返回编辑</h3>
          <div className="demo-box s6">
            <Steps current={this.state.s6} direction="vertical" onChange={(v)=>{this.onChange('s6', v)}}>
              <Step key={0} title={'步骤一'} description="描述文字" editable />
              <Step key={1} title={'步骤二'} description="描述文字" />
              <Step key={2} title={'步骤三'} description="描述文字" />
              <Step key={3} title={'步骤四'} description="描述文字" />
            </Steps>
          </div>
        </div>
        <div className="vertical-demo">
          <h3>出错提示</h3>
          <div className="demo-box">
            <Steps current={2} direction="vertical">
              <Step key={0} title={'步骤一'} description="描述文字" />
              <Step key={1} title={'步骤二'} description="描述文字" />
              <Step key={2} title={'步骤三'} description="描述文字" status="error" />
              <Step key={3} title={'步骤四'} description="描述文字" />
            </Steps>
          </div>
        </div>
        <div className="vertical-demo">
          <h3>不可返回编辑（迷你版）</h3>
          <div className="demo-box">
            <Steps current={2} showIcon={false} direction="vertical">
              <Step key={0} title={'步骤一'} description="描述文字" />
              <Step key={1} title={'步骤二'} description="描述文字" />
              <Step key={2} title={'步骤三'} description="描述文字" />
              <Step key={3} title={'步骤四'} description="描述文字" />
            </Steps>
          </div>
        </div>
        <div className="vertical-demo">
          <h3>可返回编辑（迷你版）</h3>
          <div className="demo-box s6">
            <Steps current={this.state.s6} showIcon={false} direction="vertical" onChange={(v)=>{this.onChange('s6', v)}}>
              <Step key={0} title={'步骤一'} description="描述文字" editable />
              <Step key={1} title={'步骤二'} description="描述文字" />
              <Step key={2} title={'步骤三'} description="描述文字" />
              <Step key={3} title={'步骤四'} description="描述文字" />
            </Steps>
          </div>
        </div>
        <div className="vertical-demo">
          <h3>出错提示（迷你版）</h3>
          <div className="demo-box">
            <Steps current={2} showIcon={false} direction="vertical">
              <Step key={0} title={'步骤一'} description="描述文字" />
              <Step key={1} title={'步骤二'} description="描述文字" />
              <Step key={2} title={'步骤三'} description="描述文字" status="error" />
              <Step key={3} title={'步骤四'} description="描述文字" />
            </Steps>
          </div>
        </div>
        <hr />
        <h2>老版本兼容</h2>
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
            {this.state.stepsStyle2.map((step, idx) => <Step key={idx} title={`步骤${step}`} description="内容文案内容文案内容文案内容文案" />)}
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
