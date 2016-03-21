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
    title: '再一个待运行',
    description: '描述啊描述啊'
}, {
    title: '待运行',
    description: '这里是多信息的描述啊'
}];

class Demo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            current: 0,
            showIcon: true,
            steps: steps,
            show: true,
            direction: '',
            showDesc: true
        };
    }

    toggleNumberShow(){
        this.setState({
            showIcon: !this.state.showIcon
        });
    }

    changeItem() {
        this.setState({
            steps: [{
                title: '已完成',
                description: '这里是多信息的描述啊'
            }, {
                title: '进行中',
                description: '这里是多信息的耶哦耶哦哦耶哦耶耶哦耶哦哦耶哦耶'
            }, {
                title: '又一个待运行',
                description: '描述啊描述啊'
            },{
                title: '已完成',
                description: '这里是多信息的描述啊'
            },{
                title: '又一个待运行',
                description: '描述啊描述啊'
            },{
                title: '已完成',
                description: '这里是多信息的描述啊'
            },{
                title: '已完成',
                description: '这里是多信息的描述啊'
            }]
        })
    }
    
    toggleDescription(){
        this.setState({
            showDesc: !this.state.showDesc
        });
    }

    next() {
        var s = this.state.current + 1;
        if (s === this.state.steps.length) {
            s = 0;
        }
        this.setState({
            current: s
        });
    }

    unmountComp() {
        let me = this;
        me.setState({
            show: false
        });
    }
    
    toggleDirection(){
        this.setState({
            direction: this.state.direction === 'vertical' ? '': 'vertical'
        });
    }

    render() {
        let showDesc = this.state.showDesc;
        return (
            <div>
                <button className='kuma-button kuma-button-primary' onClick={this.toggleNumberShow.bind(this)}>显示数字</button>
                <button className='kuma-button kuma-button-primary' onClick={this.changeItem.bind(this)}>动态改变块的数量</button>
                <button className='kuma-button kuma-button-primary' onClick={this.unmountComp.bind(this)}>销毁组件</button>
                <button className='kuma-button kuma-button-primary' onClick={this.toggleDirection.bind(this)}>切换方向</button>
                <button className='kuma-button kuma-button-primary' onClick={this.toggleDescription.bind(this)}>切换显示描述</button>
                <button className='kuma-button kuma-button-primary' onClick={this.next.bind(this)}>下一步</button>
                <p style={{marginBottom: 100}}>基本用法</p>
                {this.state.show ? <Steps current={this.state.current} showIcon={this.state.showIcon} direction={this.state.direction} ref="steps">
                    {
                        this.state.steps.map(function(s, i) {
                            return (
                                <Step key={i} title={s.title} description={showDesc? s.description: false} />
                            );
                        })
                    }
                </Steps> : null}
            </div>
        );
    }
}

module.exports = Demo;
