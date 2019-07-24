// @flow
import React, { PureComponent, type Element } from 'react';
import { canUseEventListeners } from 'exenv';
import NodeResolver from 'react-node-resolver';

import { allowTouchMove, preventInertiaScroll, listenerOptions } from './utils';

type Props = {
  // allow touch-scroll on this element
  children: Element<*>,
  options?: any
};

export class TouchScrollable extends PureComponent<Props> {
  static defaultProps = {
    options: {},
  }

  scrollableArea: HTMLElement;
  getScrollableArea = (ref: HTMLElement) => {
    this.scrollableArea = ref;
  };
  componentDidMount() {
    const { onTouchMove, onTouchStart } = this.props.options;
    if (!canUseEventListeners) return;

    this.scrollableArea.addEventListener(
      'touchstart',
      onTouchStart || preventInertiaScroll,
      listenerOptions,
    );
    this.scrollableArea.addEventListener(
      'touchmove',
      onTouchMove || allowTouchMove,
      listenerOptions,
    );
  }
  componentWillUnmount() {
    const { onTouchMove, onTouchStart } = this.props.options;
    if (!canUseEventListeners) return;

    this.scrollableArea.removeEventListener(
      'touchstart',
      onTouchStart || preventInertiaScroll,
      listenerOptions,
    );
    this.scrollableArea.removeEventListener(
      'touchmove',
      onTouchMove || allowTouchMove,
      listenerOptions,
    );
  }
  render() {
    return <NodeResolver innerRef={this.getScrollableArea} {...this.props} />;
  }
}
