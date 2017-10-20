/* eslint-disable react/jsx-filename-extension */

import expect from 'expect.js';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';
import assign from 'object-assign';
import Steps from '../src';

Enzyme.configure({ adapter: new Adapter() });

const generateSteps = (options = {}) => {
  const opts = assign({}, {
    current: 1,
    direction: '',
    showIcon: true,
    type: 'default', // default title-on-top or long-desc
  }, options || {});
  const items = ['hello', 'hi'].map(i => <Steps.Step key={i} title={i} description={i} />);
  const wrapper = mount(
    <Steps
      prefixCls="kuma-step"
      className="kuma-step-test"
      iconPrefix="kuma-icon"
      maxDescriptionWidth={200}
      {...opts}
    >
      {items}
    </Steps>,
  );
  return wrapper;
};

describe('Steps', () => {
  describe('Initial Instance', () => {
    it('initialized state', (done) => {
      const i = generateSteps().instance();
      i.render();
      expect(i.state.init).to.be(false);
      expect(i.state.tailWidth).to.be(0);
      i.componentWillReceiveProps(assign({}, i.props, {
        children: [<div>Hello</div>],
      }));
      setTimeout(() => {
        expect(i.props.children).to.be.an('array');
        done();
      }, 400);
    });
  });

  describe('Umount Component', () => {
    it('component unmount', () => {
      const i = generateSteps();
      i.render();
      i.unmount();
      // TODO：resize 事件不好处理
      expect(1).to.be(1);
    });

    it('component unmount vertical', () => {
      const i = generateSteps({ direction: 'vertical' });
      i.render();
      i.unmount();
      // TODO：resize 事件不好处理
      expect(1).to.be(1);
    });
  });

  describe('Render Vertically', () => {
    it('render result should be correct', () => {
      const i = generateSteps();
      const html = i.html();
      expect(html).to.contain('kuma-step');
    });
  });

  describe('Render correct with current 2', () => {
    it('render result should be correct', () => {
      const i = generateSteps({ current: 2 });
      const html = i.html();
      expect(html).to.contain('kuma-step');
    });
  });

  describe('Render correct with type: title on top', () => {
    it('render result should be correct', () => {
      const i = generateSteps({ type: 'title-on-top' });
      const html = i.html();
      expect(html).to.contain('kuma-step-type-title-on-top');
    });
  });

  describe('Render correct with type: long-desc', () => {
    it('render result should be correct', () => {
      const i = generateSteps({ type: 'long-desc' });
      const html = i.html();
      expect(html).to.contain('kuma-step-type-long-desc');
    });
  });

  describe('Render correct with type: arrow bar', () => {
    it('render result should be correct', () => {
      const i = generateSteps({ type: 'arrow-bar' });
      const html = i.html();
      expect(html).to.contain('kuma-step-type-arrow-bar');
    });
  });

  describe('Render Vertically', () => {
    it('render result should be correct with vertical param', () => {
      const i = generateSteps({ direction: 'vertical' });
      expect(i.find('.kuma-step-vertical').length).to.be(1);
    });
  });

  describe('Render with Detail', () => {
    it('render result should be correct with vertical param', () => {
      const i = generateSteps({ showDetail: true });
      i.instance().setState({ current: 2 });
      expect(i.find('.kuma-step-vertical').length).to.be(0);
    });
  });

  describe('Render Icon', () => {
    it('render result should be correct without icon', () => {
      const i = generateSteps({ showIcon: false });
      expect(i.find('.kuma-step-noicon').length >= 1).to.be(true);
    });

    it('render result should be correct with icon', () => {
      const i = generateSteps({});
      expect(i.find('.kuma-step-noicon').length === 0).to.be(true);
    });
  });
});
