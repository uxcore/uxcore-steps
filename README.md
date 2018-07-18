---

## uxcore-steps [![Dependency Status](http://img.shields.io/david/uxcore/uxcore-steps.svg?style=flat-square)](https://david-dm.org/uxcore/uxcore-steps) [![devDependency Status](http://img.shields.io/david/dev/uxcore/uxcore-steps.svg?style=flat-square)](https://david-dm.org/uxcore/uxcore-steps#info=devDependencies)

## TL;DR

uxcore-steps ui component for react

#### setup develop environment

```sh
$ git clone https://github.com/uxcore/uxcore-steps
$ cd uxcore-steps
$ npm install
$ npm run start
```

## Usage
```js
import Steps, { Step } from 'uxcore-steps';

ReactDOM.render(
	<Steps current={0} type="bottom-desc">
		<Steps.Step key={0} title="第一步" />
		<Steps.Step key={1} title="第二步" />
		<Steps.Step key={2} title="第三步" />
	</Steps>, target)
```

## demo
http://uxcore.github.io/uxcore/components/steps/

## API

## Props

### Steps
| 配置项 | 说明 | 类型 | 可选值 | 默认值 |
|---|---|---|---|---|
| prefixCls | prefix class name | string | | kuma-step |
| className | additional class name added to wrap | string | | |
|current | 可选参数，指定当前处理正在执行状态的步骤，从0开始记数。在子Step元素中，可以通过status属性覆盖状态。 | number | 无 | 0|
|direction | 可选参数，指定步骤条方向（目前支持水平和竖直两种方向，默认水平方向）。 | string | vertical | 无 |
|maxDescriptionWidth | 可选参数，指定步骤的详细描述文字的最大宽度。 | number | 无 | 100 |
|showIcon | 步骤节点是否显示图标或数字 | bool | `true` or `false` | true |
|type | 步骤条类型 | string | `default` `arrow-bar` `title-on-top` `long-desc` or `bottom-desc` | `default` |
|showDetail | 可选参数[direction=vertical或type=long-desc不生效],是否显示详情面板[step的children] | bool | `true` `false` | `false` |
|currentDetail | 可选参数[direction=vertical或type=long-desc不生效],指定当前正在显示的详情面板，从0开始记数 | number | `0` ... | `0` |
|onChange | 可选参数[direction=vertical或type=long-desc不生效],指定步骤icon点击事件回调,参数为被点击步骤对应数字 | func |  | (v)=>{} |

### Steps.Step
| 配置项 | 说明 | 类型 | 可选值 | 默认值 |
|---|---|---|---|---|
|status | 可选参数，指定状态。当不配置该属性时，会使用父Steps元素的current来自动指定状态。 | string | wait, process, finish, error | wait |
|title | 必要参数，标题。 | string/jsx | 无 | 无 |
|description | 可选参数，步骤的详情描述。 | string/jsx | 无 | 空 |
|icon | 可选参数，步骤的Icon。如果传 string，则为自定义样式方式；如果传 jsx，请传 uxcore-icon。 | string/jsx | 无 | 空 |
|editable | 可选参数，该步骤的内容是否可以返回编辑。 | boolean | true/false | false |

- 在 React V16 之后，如果 icon 传入 jsx 并使用的是 uxcore-icon 时，请增加 `usei` 属性，否则 React 会抛出 `The tag <icon> is unrecognized in this browser` 的警告信息
- 如果指定 editable 为 true，则该节点样式为可点击，使用需要配合传入 onChange 回调函数，回调函数将通过参数回传用户当前点击步骤的 key，可以通过 key 值来调整 current 或者需要显示的内容。
