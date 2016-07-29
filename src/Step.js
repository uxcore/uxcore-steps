import React from 'react'; 

class Step extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    const props = this.props;
    const status = props.status || 'wait';
    const prefixCls = props.prefixCls;
    const iconPrefix = props.iconPrefix;
    const maxWidth = props.maxDescriptionWidth;
    const iconName = props.icon ? props.icon : 'check';
    let icon, stepCls = `${prefixCls}-item ${prefixCls}-status-${status}`, tail, description;
    if (!props.icon && status !== 'process' || !props.stepLast) {
        icon = <span className={`${prefixCls}-icon`}>{props.stepNumber}</span>;
    } else {
        icon = <span className={`${prefixCls}-icon ${iconPrefix}icon ${iconPrefix}icon-${iconName}`}></span>;
    }
    
    if (props.stepLast) {
        stepCls += ` ${prefixCls}-item-last`;
    } else {
        tail = <div className={`${prefixCls}-tail`}><i></i></div>
    }
    if (props.icon) {
        stepCls += ` ${prefixCls}-custom`;
    }
    if (props.description) {
        description = (<div className={`${prefixCls}-description`}>
          {props.description}
        </div>)
    } else {
        stepCls += ` ${prefixCls}-no-desc`;
    }
    
    return (
        <div className={`${stepCls}`} style={{width: props.tailWidth}}>
            {tail}
            <div className={`${prefixCls}-head`}>
                <div className={`${prefixCls}-head-inner`}>{icon}</div>
            </div>
            <div className={`${prefixCls}-main`} style={{maxWidth: maxWidth}}>
                <div className={`${prefixCls}-title`}>{props.title}</div>
                {description}
            </div>
        </div>
    );
  }
}

module.exports = Step;