import expect from 'expect.js';
import { mount } from 'enzyme';
import React from 'react';
// import ReactDOM from 'react-dom';

import Step from '../src/Step';

const generateStep = (status, title, desc, icon, options) => {
  const wrapper = mount(
    <Step
      status={status}
      title={title}
      description={desc}
      icon={icon}
      prefixCls={'kuma-step'}
      iconPrefix={'kuma-'}
      maxDescriptionWidth={200}
      stepNumber={2}
      {...options}
    />
  );
  return wrapper;
}

describe('Step', () => {
  describe('status prop', () => {
    it('should display status wait by default', () => {
      const w = generateStep(undefined, '', '', '');
      expect(w.find('.kuma-step-status-wait').length).to.be(1);
    });
    it('should display status process', () => {
      const w = generateStep('process', '', '', '');
      expect(w.find('.kuma-step-status-process').length).to.be(1);
    });
    it('should display status finish', () => {
      const w = generateStep('finish', '', '', '');
      expect(w.find('.kuma-step-status-finish').length).to.be(1);
    });
  });

  describe('title prop', () => {
    it('should display the title', () => {
      const w = generateStep('finish', 'test', '', '');
      expect(w.find('.kuma-step-title').text()).to.be('test');
    });
  });

  describe('description prop', () => {
    it('should have no-desc class without description', () => {
      const w = generateStep('finish', 'test', '', '');
      expect(w.find('.kuma-step-no-desc').length).to.be(1);
    });

    it('should have no-desc class with description', () => {
      const w = generateStep('finish', 'test', 'this is desc', '');
      expect(w.find('.kuma-step-description').length).to.be(1);
    });
  });

  describe('icon prop', () => {
    it('should display the check icon by default', () => {
      const w = generateStep('finish', 'test', '', '');
      expect(w.find('.kuma-step-icon').length).to.be(1);
    });
    it('should display the icon', () => {
      const w = generateStep('process', 'test', 'descp', 'icon');
      expect(w.find('.kuma-step-icon').length).to.be(1);
    });
    it('should display the icon with specific name while not processing', () => {
      const w = generateStep('process', 'test', 'descp', 'dog', {
        stepLast: true,
      });
      expect(w.find('.kuma-icon').length).to.be(1);
      expect(w.find('.kuma-icon-dog').length).to.be(1);
    });
  });

  it('should display the icon with last step', () => {
    const w = generateStep('process', 'test', 'descp', 'dog', {
      stepLast: true,
    });
    expect(w.find('.kuma-step-item-last').length).to.be(1);
  });

  it('should display the tail without last step', () => {
    const w = generateStep('process', 'test', 'descp', 'dog', {
      stepLast: false,
    });
    expect(w.find('.kuma-step-tail').length).to.be(1);
  });

  it('should display the tail with fixStyle', () => {
    const w = generateStep('process', 'test', 'descp', 'dog', {
      fixStyle: {},
      tailWidth: '100px',
    });
    expect(w.html()).to.contain('100px');
  });

  it('should display the cursor pointer while have detail', () => {
    const w = generateStep('process', 'test', 'descp', 'dog', {
      hasDetail: true,
    });
    expect(w.html()).to.contain('pointer');
  });
});

