/**
 * Steps Component for uxcore
 * @author vincent.bian
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

import React from 'react'; 

class Steps extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            init: false,
            tailWidth: 0
        };
        this._previousStepsWidth = 0;
        this._itemsWidth = [];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.children.length !== this.props.children.length) {
            if (this.props.direction === 'vertical') {
                return;
            }
            const $dom = ReactDOM.findDOMNode(this);
            const len = nextProps.children.length - 1;
            this._itemsWidth = new Array(len + 1);

            let i;
            for (i = 0; i <= len - 1; i++) {
                this._itemsWidth[i] = nextProps.maxDescriptionWidth;
            }
            this._itemsWidth[i] = nextProps.maxDescriptionWidth;
            this._update(nextProps);
        }
    }

    componentDidMount() {
        if (this.props.direction === 'vertical') {
            return;
        }
        const $dom = ReactDOM.findDOMNode(this);
        const len = $dom.children.length - 1;
        this._itemsWidth = new Array(len + 1);

        let i;
        for (i = 0; i <= len - 1; i++) {
            this._itemsWidth[i] = this.props.maxDescriptionWidth;
        }
        this._itemsWidth[i] = this.props.maxDescriptionWidth;
        this._previousStepsWidth = Math.floor(ReactDOM.findDOMNode(this).offsetWidth);
        this._update();

        /*
         * 把最后一个元素设置为absolute，是为了防止动态添加元素后滚动条出现导致的布局问题。
         * 未来不考虑ie8一类的浏览器后，会采用纯css来避免各种问题。
         */
        $dom.children[len].style.position = 'absolute';

        /*
         * 下面的代码是为了兼容window系统下滚动条出现后会占用宽度的问题。
         * componentDidMount时滚动条还不一定出现了，这时候获取的宽度可能不是最终宽度。
         * 对于滚动条不占用宽度的浏览器，下面的代码也不二次render，_resize里面会判断要不要更新。
         */
        setTimeout(() => {
            this._resize();
        });

        this._resizeBind = this._resize.bind(this)

        if (window.attachEvent) {
            window.attachEvent('onresize', this._resizeBind);
        } else {
            window.addEventListener('resize', this._resizeBind);
        }
    }

    componentDidUpdate() {
        this._resize();
        const $dom = ReactDOM.findDOMNode(this);

        const len = $dom.children.length - 1;
        /*
         * 把最后一个元素设置为absolute，是为了防止动态添加元素后滚动条出现导致的布局问题。
         * 未来不考虑ie8一类的浏览器后，会采用纯css来避免各种问题。
         */
        for (let i = 0; i <= len; i++) {
            $dom.children[i].style.position = 'relative';
        }
        $dom.children[len].style.position = 'absolute';
    }

    componentWillUnmount() {
        if (this.props.direction === 'vertical') {
            return;
        }
        if (window.attachEvent) {
            window.detachEvent('onresize', this._resizeBind);
        } 
        else {
            window.removeEventListener('resize', this._resizeBind);
        }
    }

    _resize() {
        const w = Math.floor(ReactDOM.findDOMNode(this).offsetWidth);
        if (this._previousStepsWidth === w) {
            return;
        }
        this._previousStepsWidth = w;
        this._update();
    }

    _update(props = this.props) {
        const len = props.children.length - 1;
        let tw = this._itemsWidth.reduce((prev, w) => {
            return prev + w;
        }, 0);
        const dw = Math.floor((this._previousStepsWidth - tw) / len) - 1;
        if (dw <= 0) {
            return;
        }
        this.setState({
            init: true,
            tailWidth: dw
        });
    }

    render(){
        let props = this.props;
        let { prefixCls, className, children, maxDescriptionWidth, iconPrefix, size, direction, showIcon, current, type } = props;
        let len = children.length - 1;
        let iws = this._itemsWidth;
        let clsName = prefixCls;
        if (direction === 'vertical') {
            clsName += ` ${prefixCls}-vertical ${className}`;
        } else {
            clsName += ` ${prefixCls}-type-${type} ${className}`;
        }
        if (!showIcon) {
            clsName += ` ${prefixCls}-noicon`;
        }

        return (
            <div className={clsName}>
                {React.Children.map(children, (ele, idx) => {
                    let np = {
                        stepNumber: showIcon ? (idx + 1).toString(): '',
                        stepLast: idx === len,
                        tailWidth: iws.length === 0 || idx === len ? 'auto' : iws[idx] + this.state.tailWidth,
                        prefixCls: prefixCls,
                        iconPrefix: iconPrefix,
                        maxDescriptionWidth: maxDescriptionWidth
                    };
                    if (!ele.props.status) {
                        np.status = idx === current ? 'process' : (idx < current ? 'finish' : 'wait');
                    }
                    return React.cloneElement(ele, np);
                }, this)}
            </div>
        );
    }
}

Steps.defaultProps = {
    prefixCls: 'kuma-step',
    className: '',
    iconPrefix: '',
    maxDescriptionWidth: 100,
    current: 0,
    direction: '',
    showIcon: true,
    type: 'default'    
};

// http://facebook.github.io/react/docs/reusable-components.html
Steps.propTypes = {
    prefixCls: React.PropTypes.string,
    className: React.PropTypes.string,
    iconPrefix: React.PropTypes.string,
    maxDescriptionWidth: React.PropTypes.number,
    current: React.PropTypes.number,
    direction: React.PropTypes.string,
    showIcon: React.PropTypes.bool,
    type: React.PropTypes.oneOf(['default', 'title-on-top', 'long-desc'])
};

Steps.displayName = "Steps";

export default Steps;
