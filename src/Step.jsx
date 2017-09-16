import { Component, PropTypes } from 'react';

class Step extends Component {
  constructor(props){
    super(props);

    this.onIconClick = this.onIconClick.bind(this);
  }

  onIconClick() {
    if (this.props.hasDetail) {
      this.props.onChange(Number(this.props.stepNumber) - 1);
    }
  }

  render() {
    // Destructuring all vars from props
    const {
      icon = 'check',
      prefixCls, 
      iconPrefix, 
      maxWidth, 
      stepLast,
      stepNumber,
      fixStyle,
      tailWidth,
      title,
      description,
      hasDetail,
      showDetail,
      detailContentFixStyle,
      children,
      status = 'wait',
    } = this.props;

    let stepCls = `${prefixCls}-item ${prefixCls}-status-${status}`;

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

    // ICON Jsx
    let iconJsx;
    if ((!icon && status !== 'process') || !stepLast) {
      iconJsx = <span className={`${prefixCls}-icon`}>{stepNumber}</span>;
    } else {
      iconJsx = <span className={`${prefixCls}-icon ${iconPrefix}icon ${iconPrefix}icon-${icon}`} />;
    }
    
    // Tail Jsx
    let tailJsx = null;
    if (stepLast) {
      stepCls += ` ${prefixCls}-item-last`;
    } else {
      tailJsx = <div className={`${prefixCls}-tail`}><i /></div>;
    }

    if (icon) {
      stepCls += ` ${prefixCls}-custom`;
    }

    // Description Jsx
    let descriptionJsx = null;
    if (description) {
      descriptionJsx = (<div className={`${prefixCls}-description`}>
        {description}
      </div>);
    } else {
      stepCls += ` ${prefixCls}-no-desc`;
    }

    const detailCls = `${prefixCls}-detail ${(showDetail ? `${prefixCls}-detail-current` : '')}`;
    const headStyle= { cursor: hasDetail ? 'pointer' : 'default' };
    
    return (
      <div className={`${stepCls}`} style={stepStyle}>
        {tailJsx}
        <div className={`${prefixCls}-head`} style={headStyle} onClick={this.onIconClick}>
          <div className={`${prefixCls}-head-inner`}>{iconJsx}</div>
        </div>
        <div className={`${prefixCls}-main`} style={{ maxWidth }}>
          <div className={`${prefixCls}-detail-arrow`} style={{ display: (showDetail ? 'block' : 'none') }} />
          <div className={`${prefixCls}-title`} title={title}>{title}</div>
          <div>
            {descriptionJsx}
            {descriptionJsx ? <div className={`${prefixCls}-description-arrow`} /> : null}
          </div>
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
  onChange: PropTypes.func,
  stepNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

Step.defaultProps = {
  hasDetail: false,
};

Step.displayName = 'Step';

export default Step;
