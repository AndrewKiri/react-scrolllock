# React Scroll Lock

Prevent scroll on the `<body />` when a component is mounted.

## Note from developer
This library is a fork of `react-scrolllock` by `jossmac` with ability to accept options object which will override some touch handlers.
It is useful if you want to have vertical scroll locked while allowing for horizontal scroll or in cases where some of your children require horizontal scroll to work (which original package doesn't allow because of aggressive event capturing and propagation prevention) 

[Forked Github Repo](https://github.com/jossmac/react-scrolllock)
[Forked NPM Package](https://www.npmjs.com/package/react-scrolllock)

## Install

```bash
yarn add react-scrolllock-configurable
```

## Usage

```js
import ScrollLock, { TouchScrollable } from 'react-scrolllock-configurable';

class Modal extends Component {
  state = { lockScroll: false }
  render() {
    return (
      <div>
        ...
        // the lock accepts a single child element, which supports touch-scrolling.
        <ScrollLock>
          <ElementWithScrollableContent>...</ElementWithScrollableContent>
        </ScrollLock>

        // if your app structure doesn't allow wrapping like above, the `TouchScrollable`
        // component is exposed as a named export.
        <ScrollLock />
        <TouchScrollable>
          <ElementWithScrollableContent>...</ElementWithScrollableContent>
        </TouchScrollable>
        
        // you can also toggle the lock based on some state.
        <ScrollLock isActive={this.state.lockScroll} />
      </div>
    );
  }
}
```

## Props

#### ScrollLock

| Property                       | Description                                                                    |
| :----------------------------- | :----------------------------------------------------------------------------- |
| accountForScrollbars `boolean` | Default: `true` -- Whether or not to replace the scrollbar width when active. |
| isActive `boolean` | Default: `true` -- Whether or not the lock is active. |
| children `element` | Default: `null` -- This element is wrapped internally by the TouchScrollable component. |

#### TouchScrollable

Wrap an element in the `TouchScrollable` component if you need an area that supports scroll on mobile.

This is necessary because the `touchmove` event is explicitly cancelled &mdash; iOS doesn't observe `overflow: hidden;` when applied to the `<body />` element 😢

| Property                 | Description                                    |
| :----------------------- | :--------------------------------------------- |
| children `element` | **Required** The element that can be scrolled. |
| options `object` | **Optional** Provide an options object |

##### Options 
```js
Options object can have `onTouchMove` and `onTouchStart` event handlers if you need to unblock scrolling 
{
  onTouchMove: (event) => {}
  onTouchStart: (event) => {}
}
```
