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

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <h2>步骤条</h2>
                <h3>横向步骤条(标准)</h3>
                <div className="demo-box">
                    <Steps current="3" showIcon={true}>
                        <Step key={0} title={'步骤一'} />
                        <Step key={1} title={'步骤二'} />
                        <Step key={2} title={'步骤三'} />
                        <Step key={3} title={'步骤四'} />
                        <Step key={4} title={'已完成'} />
                    </Steps>
                </div>
                <div className="demo-box">
                    <Steps current="5" showIcon={true}>
                        <Step key={0} title={'步骤一'} />
                        <Step key={1} title={'步骤二'} />
                        <Step key={2} title={'步骤三'} />
                        <Step key={3} title={'步骤四'} />
                        <Step key={4} title={'已完成'} />
                    </Steps>
                </div>
                <div className="demo-box">
                    <Steps current="3" showIcon={false}>
                        <Step key={0} title={'步骤一'} />
                        <Step key={1} title={'步骤二'} />
                        <Step key={2} title={'步骤三'} />
                        <Step key={3} title={'步骤四'} />
                        <Step key={4} title={'已完成'} />
                    </Steps>
                </div>
                <h3>横向步骤条(样式二)</h3>
                <div className="demo-box">
                    <Steps current="3" showIcon={true}>
                        <Step key={0} title={'步骤一'} description="内容文案内容文案内容文案内容文案" />
                        <Step key={1} title={'步骤二'} description="内容文案内容文案内容文案内容文案" />
                        <Step key={2} title={'步骤三'} description="内容文案内容文案内容文案内容文案" />
                        <Step key={3} title={'步骤四'} description="内容文案内容文案内容文案内容文案" />
                        <Step key={4} title={'已完成'} description="内容文案内容文案内容文案内容文案" />
                    </Steps>
                </div>
                <h3>显示时间的步骤条</h3>
                <div className="demo-box">
                    <Steps current="3" showIcon={true} type="title-on-top">
                        <Step key={0} title={'步骤一'} description="2016-1-12" />
                        <Step key={1} title={'步骤二'} description="2016-1-13" />
                        <Step key={2} title={'步骤三'} description="2016-1-14" />
                        <Step key={3} title={'步骤四'} description="2016-1-15" />
                        <Step key={4} title={'已完成'} description="2016-1-16" />
                    </Steps>
                </div>
                <h3>大量文案描述的步骤条</h3>
                <div className="demo-box">
                    <Steps current="3" showIcon={true} type="long-desc">
                        <Step key={0} title={'步骤一'} description="这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案" />
                        <Step key={1} title={'步骤二'}  description="这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案" />
                        <Step key={2} title={'步骤三'}  description="这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案" />
                        <Step key={3} title={'步骤四'}  description="这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案" />
                        <Step key={4} title={'已完成'}  description="这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案这里是说明文案" />
                    </Steps>
                </div>
                <h3>纵向步骤条</h3>
                <div className="demo-box">
                    <Steps current="3" showIcon={true} direction="vertical">
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
