import { Component, PropTypes } from 'react';
import Icon from 'uxcore-icon';
import Tooltip from 'uxcore-tooltip';

class Step extends Component {
  constructor(props){
    super(props);

    this.onIconClick = this.onIconClick.bind(this);
  }

  onIconClick() {
    if (this.props.hasDetail || this.props.editable) {
      this.props.onChange(Number(this.props.stepNumber) - 1);
    }
  }

  render() {
    // Destructuring all vars from props
    const {
      prefixCls, 
      type,
      icon,
      iconPrefix, 
      maxDescriptionWidth, 
      stepLast,
      stepNumber,
      fixStyle,
      tailWidth,
      title,
      description,
      hasDetail,
      showDetail,
      detailContentFixStyle,
      editable,
      children,
      status = 'wait',
    } = this.props;

    // arrow-bar 是一种完全不一样的类型，之前的逻辑完全用不到，提前返回
    if (type === 'arrow-bar') {
      const arrowbarStepCls = `kuma-step-item-arrowbar status-${status}`;
      let arrowJsx = null;
      if (!stepLast) {
        arrowJsx = (<div>
          <div className="arrow-right"></div>
          <div className="arrow-right-bg"></div>
        </div>);
      }

      let descJsx = null;
      if (description) {
        const overlay = <div>{description}</div>;
        descJsx = (<Tooltip overlay={overlay} placement="bottom">
          <Icon name="xinxitishicopy" className="step-info" />
        </Tooltip>);
      }

      return (<div className={arrowbarStepCls}>
        <div className="step-title">
          <span>{title}</span>
          {descJsx}
        </div>
        {arrowJsx}
      </div>);
    }

    // arrow-bar 之外的其它类型从这里开始
    let stepCls = `${prefixCls}-item ${prefixCls}-status-${status}`;
    if (editable) {
      stepCls = `${stepCls} ${prefixCls}-editable`;
    }

    // Step styles by calculating
    let stepStyle;
    if (fixStyle) {
      stepStyle = { 
        width: tailWidth, 
        ...fixStyle,
      };
    } else {
      stepStyle = {
        width: tailWidth,
      };
    }

    // ICON Jsx，逻辑：如果用户指定了 icon 就用指定的 icon，否则根据状态确定 icon
    let iconName = icon;
    if (!iconName){
      if (status === 'finish') {
        iconName = 'check';
      } else if (status === 'error') {
        iconName = 'error';
      }
    }

    let iconJsx = <span className={`${prefixCls}-icon`}>{stepNumber}</span>;
    if (iconName) {
      iconJsx = <span className={`${prefixCls}-icon ${iconPrefix}icon ${iconPrefix}icon-${iconName}`} />;
    }

    /*
    if ((!icon && status !== 'process') || !stepLast) {
      iconJsx = <span className={`${prefixCls}-icon`}>{stepNumber}</span>;
    } else {
      const iconName = icon ? icon : 'check';
      iconJsx = <span className={`${prefixCls}-icon ${iconPrefix}icon ${iconPrefix}icon-${iconName}`} />;
    }
    */
    
    // 节点之间的连接线
    let tailJsx = null;
    if (stepLast) {
      stepCls += ` ${prefixCls}-item-last`;
    } else {
      tailJsx = <div className={`${prefixCls}-tail`}><i /></div>;
    }

    if (icon) {
      stepCls += ` ${prefixCls}-custom`;
    }

    const headStyle= { cursor: hasDetail ? 'pointer' : 'default' };
    const detailCls = `${prefixCls}-detail ${(showDetail ? `${prefixCls}-detail-current` : '')}`;

    // 描述，为了兼容之前的样式，默认还是已 pop 的方式放在上面，用户指定 bottom-desc 的类型后放到 title 下面
    let descConttentJsx = null;
    if (description) {
      descConttentJsx = (<div className={`${prefixCls}-description`}>
        {description}
      </div>);
    } else {
      stepCls += ` ${prefixCls}-no-desc`;
    }

    let descriptionDesc = descConttentJsx;
    if (type !== 'bottom-desc') {
      descriptionDesc = (<div>
        {descConttentJsx}
        {descConttentJsx ? <div className={`${prefixCls}-description-arrow`} /> : null}
      </div>);
    }

    return (
      <div className={`${stepCls}`} style={stepStyle}>
        {tailJsx}
        <div className={`${prefixCls}-head`} style={headStyle} onClick={this.onIconClick}>
          <div className={`${prefixCls}-head-inner`}>{iconJsx}</div>
        </div>
        <div className={`${prefixCls}-main`} style={{ maxWidth: maxDescriptionWidth }}>
          <div className={`${prefixCls}-detail-arrow`} style={{ display: (showDetail ? 'block' : 'none') }} />
          <div className={`${prefixCls}-title`} title={title}>{title}</div>
          {descriptionDesc}
        </div>
        <div className={detailCls}>
          <div className={`${prefixCls}-detail-con`} style={detailContentFixStyle}>
            <div className={`${prefixCls}-detail-content`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Step.propTypes = {
  hasDetail: PropTypes.bool,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  stepNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

Step.defaultProps = {
  hasDetail: false,
  editable: false,
};

Step.displayName = 'Step';

export default Step;
