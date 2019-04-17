/**
 * Steps Component for uxcore
 * @author vincent.bian
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';

class Steps extends React.Component {
  static displayName = 'Steps';

  static defaultProps = {
    prefixCls: 'kuma-step',
    className: '',
    iconPrefix: '',
    maxDescriptionWidth: 100,
    current: 0,
    direction: '',
    showIcon: true,
    type: 'default',
    showDetail: false,
    currentDetail: 0,
    onChange: () => {
    },
    children: [],
    // 是否将最后一个元素fix
    _lastAbsolute: false,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    iconPrefix: PropTypes.string,
    maxDescriptionWidth: PropTypes.number,
    current: PropTypes.number,
    direction: PropTypes.string,
    showIcon: PropTypes.bool,
    type: PropTypes.oneOf(['default', 'title-on-top', 'long-desc', 'bottom-desc', 'arrow-bar']),
    showDetail: PropTypes.bool,
    currentDetail: PropTypes.number,
    onChange: PropTypes.func,
    children: PropTypes.any,
    _lastAbsolute: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      tailWidth: 0,
    };
    this.previousStepsWidth = 0;
    this.itemsWidth = [];
  }

  componentDidMount() {
    const { type, direction } = this.props;
    if (type === 'arrow-bar' || direction === 'vertical') {
      return;
    }

    this.update();

    /*
     * 下面的代码是为了兼容window系统下滚动条出现后会占用宽度的问题。
     * componentDidMount时滚动条还不一定出现了，这时候获取的宽度可能不是最终宽度。
     * 对于滚动条不占用宽度的浏览器，下面的代码也不二次render，resize里面会判断要不要更新。
     */
    setTimeout(() => {
      this.resize();
    });

    this.resizeBind = this.resize.bind(this);

    if (window.attachEvent) {
      window.attachEvent('onresize', this.resizeBind);
    } else {
      window.addEventListener('resize', this.resizeBind);
    }
  }

  componentDidUpdate(prevProps) {
    if (React.Children.count(this.props.children) !== React.Children.count(prevProps.children)) {
      this.update();
      return;
    }

    if (this.props.type === 'arrow-bar') {
      return;
    }

    this.resize();
    /*
      * 把最后一个元素设置为absolute，是为了防止动态添加元素后滚动条出现导致的布局问题。
      * 未来不考虑ie8一类的浏览器后，会采用纯css来避免各种问题。
      */
    if (this.props._lastAbsolute) {
      const $dom = this.root;
      const len = $dom.children.length - 1;
      // 可以使用:last-child,但这部分功能应该可以移除,就先不动
      for (let i = 0; i <= len; i++) {
        $dom.children[i].style.position = 'relative';
      }
      $dom.children[len].style.position = 'absolute';
    }
    this.fixLastDetailHeight();
  }

  componentWillUnmount() {
    if (this.props.direction === 'vertical') {
      return;
    }

    if (window.attachEvent) {
      window.detachEvent('onresize', this.resizeBind);
    } else {
      window.removeEventListener('resize', this.resizeBind);
    }
  }

  resize() {
    if (!this.root) {
      return;
    }

    this.fixLastDetailHeight();

    const w = Math.floor(this.root.offsetWidth);
    if (this.previousStepsWidth === w) {
      return;
    }

    this.previousStepsWidth = w;
    this.update();
  }

  /*
   * 把整体高度调整为适合高度,处理最后一个detail是绝对定位的问题
   */
  fixLastDetailHeight() {
    if (this.props.type === 'arrow-bar') {
      return;
    }

    const $dom = this.root;
    const len = $dom.children.length - 1;
    const $domLastDetail = $dom.children[len];
    if (this.props.currentDetail === len && $dom.offsetHeight <= $domLastDetail.offsetHeight) {
      $dom.style.height = `${$domLastDetail.offsetHeight}px`;
    } else {
      $dom.style.height = 'auto';
    }
  }

  update() {
    const $dom = this.root;
    const len = $dom.children.length;
    this.itemsWidth = new Array(len);

    // FIXME: 没太看懂，既然值都一样，为什么还要用一个数组？
    for (let i = 0; i < len; i++) {
      this.itemsWidth[i] = this.props.maxDescriptionWidth;
    }

    this.previousStepsWidth = Math.floor($dom.offsetWidth);

    this.fixLastDetailHeight();

    const tw = this.itemsWidth.reduce((prev, w) =>
      prev + w
      , 0);
    const dw = Math.floor((this.previousStepsWidth - tw) / (len - 1)) - 1;
    if (dw <= 0) {
      return;
    }

    this.setState({
      tailWidth: dw,
    });
  }

  render() {
    let { current } = this.props;
    const {
      prefixCls,
      className,
      children,
      maxDescriptionWidth,
      iconPrefix,
      direction,
      showIcon,
      type,
      showDetail,
      currentDetail,
      onChange,
    } = this.props;
    const len = React.Children.count(children) - 1;
    const iws = this.itemsWidth;
    let clsName = prefixCls;
    let fixStyle;
    if (direction === 'vertical') {
      clsName += ` ${prefixCls}-vertical ${className}`;
    } else {
      clsName += ` ${prefixCls}-type-${type} ${className}`;
      // fix #5
      if (type === 'default') {
        const descItemsCount = children.filter(d => d.props.description).length;
        if (descItemsCount > 0 && descItemsCount !== len + 1) {
          fixStyle = {
            marginTop: 70,
          };
        }
      }
    }
    if (!showIcon) {
      clsName += ` ${prefixCls}-noicon`;
    }
    if (typeof current !== 'number') {
      current = Number(current);
    }

    return (
      <div className={clsName} ref={(c) => { this.root = c; }}>
        {React.Children.map(children, (ele, idx) => {
          const np = {
            type,
            showIcon,
            stepNumber: idx + 1,
            stepLast: idx === len,
            tailWidth: iws.length === 0 || idx === len || direction === 'vertical' ? 'auto' : iws[idx] + this.state.tailWidth,
            prefixCls,
            iconPrefix,
            maxDescriptionWidth,
            fixStyle,
            showDetail: showDetail && currentDetail === idx && direction !== 'vertical' && type !== 'long-desc',
            detailContentFixStyle: {
              marginLeft: !isNaN(-(iws[idx] + this.state.tailWidth) * idx)
                ? (-(iws[idx] + this.state.tailWidth) * idx)
                : 0,
              width: this.previousStepsWidth,
            },
            onChange,
            hasDetail: showDetail && direction !== 'vertical' && type !== 'long-desc',
          };
          if (!ele.props.status) {
            if (idx === current) {
              np.status = 'process';
            } else if (idx < current) {
              np.status = 'finish';
            } else {
              np.status = 'wait';
            }
          }

          // If it's vertical, the step point will take 30px width
          if (direction === 'vertical') {
            np.maxDescriptionWidth += 30;
          }

          return React.cloneElement(ele, np);
        }, this)}
      </div>
    );
  }
}

export default Steps;
