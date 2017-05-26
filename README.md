# zero-tree
A Vue tree by zeromake

## Install
``` bash
npm i github:zeromake/zero-tree
```
## Use
``` javascript
import ZeroTree from 'zero-tree'
import 'zero-tree/dist/zero-tree.min.css'

Vue.use(ZeroTree) // mount svg
//ZeroTree.install() // mount svg

new Vue({
    el: '#app',
    template: '<div id="app">\
                <zero-tree v-model="keys" :treeData="treeData"/>\
                <span>{{keys}}</span>\
               </div>',
    data: function() {
        return {
            keys: [],
            treeData: [
                {
                    id: 1,
                    label: 'level1-1',
                    children: [
                        {
                            id: 4,
                            label: 'level2-1'
                        },
                        {
                            id: 5,
                            label: 'level2-2'
                        },
                        {
                            id: 6,
                            label: 'level2-3'
                        }
                    ]
                },
                {
                    id: 2,
                    label: 'level1-2'
                },
                {
                    id: 3,
                    label: 'level1-3',
                    children: [
                        {
                            id: 7,
                            label: 'level2-4'
                        },
                        {
                            id: 8,
                            label: 'level2-5'
                        },
                        {
                            id: 9,
                            label: 'level2-6'
                        }
                    ]
                }
            ]
        }
    }
})
```
## prop
### options(Object)
| name | remark | type | required | default|
| ---- | ------ | ---- | -------- | ------ |
| showCheckbox | is check tree | Boolean | false | true |
| children | children tree key | String | false | 'children' |
| label | label key | String | false | 'label' |
| treeKey | tree key | String | false | 'id' |
| checkFolder | no check's tree check folder  | Boolean | false | fasle |

### treeData(Array<Object>)
| name | remark | type | required | default|
| ---- | ------ | ---- | -------- | ------ |
| id[options.treeKey] | tree key | Any | true | - |
| label[options.label] | node text | String | true | - |
| children[options.children] | children tree key | String | true | - |
| open | node is expand | Boolean | false | false |
| checked | node is checked | Boolean | false | fasle |
### v-model(Array(any))
> checked node's treeKey Array

> set v-model checked key node

## Method
- getCheckLabels() get check node's label Array
- getCheckNode() get check node's Array
- checkKey(key, check) set node deep checked
- checkAll(check) check all node or uncheck all node

## slot
``` html
<template scope="props">
    {{props.item.label}}
</teplate>
```
## Todo
- [ ] unit test
- [ ] travis
- [ ] coverage
- [ ] npm

## Thank
[vue2-tree](https://github.com/halower/vue2-tree) by @halower
