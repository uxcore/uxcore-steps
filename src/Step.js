import React from 'react';

class Step extends React.Component {
  constructor(props) {
    super(props);
  }

  onIconClick() {
    this.props.hasDetail && this.props.onChange(Number(this.props.stepNumber) - 1);
  }

  render() {
    const props = this.props;
    const status = props.status || 'wait';
    const prefixCls = props.prefixCls;
    const iconPrefix = props.iconPrefix;
    const maxWidth = props.maxDescriptionWidth;
    const iconName = props.icon ? props.icon : 'check';
    let fixStyle = props.fixStyle;
    let icon;
    let stepCls = `${prefixCls}-item ${prefixCls}-status-${status}`;
    let tail;
    let description;
    if ((!props.icon && status !== 'process') || !props.stepLast) {
      icon = <span className={`${prefixCls}-icon`}>{props.stepNumber}</span>;
    } else {
      icon = <span className={`${prefixCls}-icon ${iconPrefix}icon ${iconPrefix}icon-${iconName}`} />;
    }

    if (props.stepLast) {
      stepCls += ` ${prefixCls}-item-last`;
    } else {
      tail = <div className={`${prefixCls}-tail`}><i /></div>;
    }
    if (props.icon) {
      stepCls += ` ${prefixCls}-custom`;
    }
    if (props.description) {
      description = (<div className={`${prefixCls}-description`}>
        {props.description}
      </div>);
    } else {
      stepCls += ` ${prefixCls}-no-desc`;
    }

    if (fixStyle) {
      fixStyle.width = props.tailWidth;
    } else {
      fixStyle = {
        width: props.tailWidth,
      };
    }

    const detailCls = `${prefixCls}-detail ${(props.showDetail ? `${prefixCls}-detail-current` : '')}`;
    const headStyleFixed = { cursor: (props.hasDetail ? 'pointer' : 'default') };
    return (
      <div className={`${stepCls}`} style={fixStyle}>
        {tail}
        <div className={`${prefixCls}-head`} style={headStyleFixed} onClick={this.onIconClick.bind(this)}>
          <div className={`${prefixCls}-head-inner`}>{icon}</div>
        </div>
        <div className={`${prefixCls}-main`} style={{ maxWidth }}>
          <div className={`${prefixCls}-detail-arrow`} style={{ display: (props.showDetail ? 'block' : 'none') }} />
          <div className={`${prefixCls}-title`}>{props.title}</div>
          {description}
        </div>
        <div className={detailCls}>
          <div className={`${prefixCls}-detail-con`} style={props.detailContentFixStyle}>
            <div className={`${prefixCls}-detail-content`}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Step;
