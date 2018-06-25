import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'uxcore-icon';
import Tooltip from 'uxcore-tooltip';

class Step extends React.Component {
  static displayName = 'Step';

  static propTypes = {
    hasDetail: PropTypes.bool,
    editable: PropTypes.bool,
    onChange: PropTypes.func,
    stepNumber: PropTypes.number,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    iconPrefix: PropTypes.string,
    maxDescriptionWidth: PropTypes.number,
    current: PropTypes.number,
    direction: PropTypes.string,
    showIcon: PropTypes.bool,
    icon: PropTypes.any,
    type: PropTypes.oneOf(['default', 'title-on-top', 'long-desc', 'bottom-desc', 'arrow-bar']),
    showDetail: PropTypes.bool,
    currentDetail: PropTypes.number,
    stepLast: PropTypes.bool,
    fixStyle: PropTypes.object,
    tailWidth: PropTypes.node,
    title: PropTypes.node,
    description: PropTypes.node,
    detailContentFixStyle: PropTypes.object,
    children: PropTypes.any,
    status: PropTypes.string,
  };

  static defaultProps = {
    hasDetail: false,
    editable: false,
    onChange: () => {},
    stepNumber: 0,
    prefixCls: 'kuma-step',
    className: '',
    iconPrefix: '',
    maxDescriptionWidth: 100,
    current: 0,
    direction: '',
    showIcon: true,
    icon: '',
    type: 'default',
    showDetail: false,
    currentDetail: 0,
    stepLast: false,
    fixStyle: null,
    tailWidth: 0,
    title: '',
    description: '',
    detailContentFixStyle: {},
    children: [],
    status: '',
  };

  constructor(props) {
    super(props);

    this.onIconClick = this.onIconClick.bind(this);
  }

  onIconClick() {
    if (this.props.hasDetail || this.props.editable) {
      this.props.onChange(this.props.stepNumber - 1);
    }
  }

  render() {
    // Destructuring all vars from props
    const {
      prefixCls,
      type,
      showIcon,
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
    } = this.props;

    const status = this.props.status || 'wait';

    // arrow-bar 是一种完全不一样的类型，之前的逻辑完全用不到，提前返回
    if (type === 'arrow-bar') {
      let arrowbarStepCls = `${prefixCls}-item-arrowbar ${prefixCls}-status-${status}`;
      if (editable) {
        arrowbarStepCls = `${arrowbarStepCls} ${prefixCls}-editable`;
      }

      let arrowJsx = null;
      if (!stepLast) {
        arrowJsx = (<div>
          <div className={`${prefixCls}-arrow-right`} />
          <div className={`${prefixCls}-arrow-right-bg`} />
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
        <div className={`${prefixCls}-title`} onClick={this.onIconClick}>
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

    // 节点图标，逻辑：如果用户指定了 icon 就用指定的 icon，否则根据状态确定 icon
    let iconJsx = <span className={`${prefixCls}-icon`} />;
    if (showIcon) {
      iconJsx = <span className={`${prefixCls}-icon`}>{stepNumber}</span>;
      if (icon) {
        stepCls += ` ${prefixCls}-custom`;
        if (typeof icon === 'string') {
          iconJsx = <span className={`${prefixCls}-icon ${iconPrefix}icon ${iconPrefix}icon-${icon}`} />;
        } else {
          iconJsx = <span className={`${prefixCls}-icon ${prefixCls}-uxicon`}>{icon}</span>;
        }
      } else if (status === 'finish') {
        iconJsx = <span className={`${prefixCls}-icon`}><Icon name="option-yixuan-gou" /></span>;
      } else if (status === 'error') {
        iconJsx = <span className={`${prefixCls}-icon`}><Icon name="biaoqian-qingchu" /></span>;
      }
    }

    // 节点之间的连接线
    let tailJsx = null;
    if (stepLast) {
      stepCls += ` ${prefixCls}-item-last`;
    } else {
      tailJsx = <div className={`${prefixCls}-tail`}><i /></div>;
    }

    const headStyle = { cursor: hasDetail ? 'pointer' : 'default' };
    const detailCls = `${prefixCls}-detail ${(showDetail ? `${prefixCls}-detail-current` : '')}`;

    // 描述，为了兼容之前的样式，默认还是已 pop 的方式放在上面，用户指定 bottom-desc 的类型后放到 title 下面
    let descContentJsx = null;
    if (description) {
      descContentJsx = (<div className={`${prefixCls}-description`}>
        {description}
      </div>);
    } else {
      stepCls += ` ${prefixCls}-no-desc`;
    }

    let descriptionDesc = descContentJsx;
    if (type !== 'bottom-desc') {
      descriptionDesc = (<div>
        {descContentJsx}
        {descContentJsx ? <div className={`${prefixCls}-description-arrow`} /> : null}
      </div>);
    }

    const titleTitle = (typeof title === 'string') ? title : '';

    return (
      <div className={`${stepCls}`} style={stepStyle}>
        {tailJsx}
        <div className={`${prefixCls}-head`} style={headStyle} onClick={this.onIconClick}>
          <div className={`${prefixCls}-head-inner`}>{iconJsx}</div>
        </div>
        <div className={`${prefixCls}-main`} style={{ maxWidth: maxDescriptionWidth }}>
          <div className={`${prefixCls}-detail-arrow`} style={{ display: (showDetail ? 'block' : 'none') }} />
          <div className={`${prefixCls}-title`} title={titleTitle}>{title}</div>
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

export default Step;
