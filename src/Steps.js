/**
 * Steps Component for uxcore
 * @author vincent.bian
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */
import RcSteps from 'rc-steps';

class Steps extends React.Component {

    render() {
        let maxDescriptionWidth = this.props.maxDescriptionWidth;
        if (this.props.direction === 'vertical') {
            maxDescriptionWidth = 'auto';
        }
        return (
            <RcSteps size={this.props.size}
                current={this.props.current}
                direction={this.props.direction}
                iconPrefix={this.props.iconPrefix}
                maxDescriptionWidth={maxDescriptionWidth}
                prefixCls={this.props.prefixCls}>
                {this.props.children}
            </RcSteps>
        );
    }
}

Steps.defaultProps = {
    prefixCls: 'kuma-step',
    iconPrefix: '',
    size: 'default',
    maxDescriptionWidth: 100,
    current: 0,
    direction: ''
};

// http://facebook.github.io/react/docs/reusable-components.html
Steps.propTypes = {
    prefixCls: React.PropTypes.string,
    iconPrefix: React.PropTypes.string,
    size: React.PropTypes.oneOf(['default', 'small']),
    maxDescriptionWidth: React.PropTypes.number,
    current: React.PropTypes.number,
    direction: React.PropTypes.string
};

Steps.displayName = "Steps";

Steps.Step = RcSteps.Step;

export default Steps;
