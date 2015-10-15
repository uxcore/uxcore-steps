/**
 * Steps Component Demo for uxcore
 * @author vincent.bian
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

// let classnames = require('classnames');

let Steps = require('../src');
let Step = Steps.Step;

let steps = [{
    title: '已完成',
    description: '这里是多信息的描述啊'
}, {
    title: '进行中',
    description: '这里是多信息的耶哦耶哦哦耶哦耶'
}, {
    title: '又一个待运行',
    description: '描述啊描述啊'
}, {
    title: '待运行',
    description: '这里是多信息的描述啊'
}].map(function(s, i) {
    return (
        <Step key={i} title={s.title} description={s.description} />
    );
});

let array = Array.apply(null, Array(Math.floor(Math.random() * 3) + 3));
let steps2 = array.map(function(item, i) {
    return {
        title: '步骤' + (i + 1)
    };
});

var steps3 = [{
    status: 'finish',
    title: '已完成',
    description: '这里是多信息的描述啊'
}, {
    status: 'process',
    title: '进行中',
    description: '这里是多信息的耶哦耶哦哦耶哦耶'
}, {
    status: 'wait',
    title: '又一个待运行',
    description: '描述啊描述啊'
}, {
    status: 'wait',
    title: '待运行',
    description: '这里是多信息的描述啊'
}].map(function(s, i) {
    return (
        <Step key={i} title={s.title} status={s.status} description={s.description} />
    );
});

class Demo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentStep: Math.floor(Math.random() * steps2.length)
        };
    }

    next() {
        var s = this.state.currentStep + 1;
        if (s === steps2.length) {
            s = 0;
        }
        this.setState({
            currentStep: s
        });
    }

    render() {
        return (
            <div>
                <p>基本用法</p>
                <Steps current={1}>{steps}</Steps>
                <p>迷你版</p>
                <Steps size="small" current={1}>{steps}</Steps>
                <p>带ICON图标的步骤条</p>
                <Steps>
                    <Step status='finish' title='步骤1' icon='cloud' />
                    <Step status='process' title='步骤2' icon='apple' />
                    <Step status='wait' title='步骤3' icon='github' />
                </Steps>
                <p>切换到下一步</p>
                <div>当前正在执行第 {this.state.currentStep + 1} 步</div>
                <Steps current={this.state.currentStep}>
                    {steps2.map((s, i) => <Step key={i} title={s.title} description={s.description} />)}
                </Steps>
                <div>
                    <button className='kuma-button kuma-button-sm' onClick={this.next.bind(this)}>下一步</button>
                </div>
                <p>竖直方向的步骤条</p>
                <Steps direction="vertical" current={1}>{steps}</Steps>
                <p>竖直方向的小型步骤条</p>
                <Steps direction="vertical" size="small" current={1}>{steps}</Steps>
                <p>自定义状态</p>
                <Steps>{steps3}</Steps>
            </div>
        );
    }
}

module.exports = Demo;
