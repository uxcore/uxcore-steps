/**
 * Steps Component for uxcore
 * @author vincent.bian
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */
import RcSteps from 'rc-steps';

class Steps extends RcSteps {
    render(){
        let props = this.props;
        let {prefixCls, children, maxDescriptionWidth, iconPrefix, size, direction, showIcon} = props;
        let len = children.length - 1;
        let iws = this._itemsWidth;
        let clsName = prefixCls;
        if (size === 'small' && showIcon) {
            clsName += ` ${prefixCls}-small`;
        }
        if (direction === 'vertical') {
            clsName += ` ${prefixCls}-vertical`;
        }
        if (!showIcon) {
            clsName += ` ${prefixCls}-noicon`;
        }

        return (
            <div className={clsName}>
                {React.Children.map(children, function (ele, idx) {
                    let np = {
                        stepNumber: showIcon ? (idx + 1).toString(): '',
                        stepLast: idx === len,
                        tailWidth: iws.length === 0 || idx === len ? 'auto' : iws[idx] + this.state.tailWidth,
                        prefixCls: prefixCls,
                        iconPrefix: iconPrefix,
                        maxDescriptionWidth: maxDescriptionWidth
                    };
                    if (!ele.props.status) {
                        np.status = idx === props.current ? 'process' : (idx < props.current ? 'finish' : 'wait');
                    }
                    return React.cloneElement(ele, np);
                }, this)}
            </div>
        );
    }
}

Steps.defaultProps = {
    prefixCls: 'kuma-step',
    iconPrefix: '',
    size: 'default',
    maxDescriptionWidth: 100,
    current: 0,
    direction: '',
    showIcon: true
};

// http://facebook.github.io/react/docs/reusable-components.html
Steps.propTypes = {
    prefixCls: React.PropTypes.string,
    iconPrefix: React.PropTypes.string,
    size: React.PropTypes.oneOf(['default', 'small']),
    maxDescriptionWidth: React.PropTypes.number,
    current: React.PropTypes.number,
    direction: React.PropTypes.string,
    showIcon: React.PropTypes.bool
};

Steps.displayName = "Steps";

Steps.Step = RcSteps.Step;

export default Steps;
