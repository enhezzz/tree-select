# zero-tree
A Vue tree by zeromake

## Install
``` bash
npm i github:zeromake/zero-tree
```
## Use
``` javascript
import ZeroTree from 'zero-tree'
Vue.use(ZeroTree)

new Vue({
    template: '<div id="app"><zero-tree v-model="keys" :treeData="treeData"/><span>{{keys}}</span></div>',
    data: function() {
        return {
            keys: [],
            treeData: [
                {
                    id: 1,
                    label: 'leve1-1',
                    children: [
                        {
                            id: 4,
                            label: 'leve2-1'
                        },
                        {
                            id: 5,
                            label: 'leve2-2'
                        },
                        {
                            id: 6,
                            label: 'leve2-3'
                        }
                    ]
                },
                {
                    id: 2,
                    label: 'leve1-2'
                },
                {
                    id: 3,
                    label: 'leve1-3',
                    children: [
                        {
                            id: 7,
                            label: 'leve2-4'
                        },
                        {
                            id: 8,
                            label: 'leve2-5'
                        },
                        {
                            id: 9,
                            label: 'leve2-6'
                        }
                    ]
                }
            ]
        }
    }
})
```
## Thank
[vue2-tree](https://github.com/halower/vue2-tree) by @halower
