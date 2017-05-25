<template>
    <ul class="zero-tree-node">
        <li
            v-for='item in nodeData'
            v-show="!item.disable"
            :class="[(item[options.children] && item[options.children].length > 0) ? 'folder' : 'file', 'level-' + level]"><svg class="icon"
                v-if="item[options.children] && item[options.children].length > 0"
                @click="handleNodeExpand(item)">
                <use v-if="item.open" xlink:href="#down"></use>
                <use v-else xlink:href="#right"></use>
            </svg><input
                type="checkbox"
                class="check"
                v-if="options.showCheckbox"
                v-model='item.checked'
                @click.stop="handlecheckedChange(item)"/><span
                @click="handleNode(item)"
                :class="{'node-selected':item.checked && !options.showCheckbox }">
                {{item.label}}
            </span>
            <zero-tree-node
                v-if="item[options.children] && item[options.children].length > 0"
                :options="options"
                @handlecheckedChange="handlecheckedChange"
                v-show='item.open'
                :tree-data="item[options.children]"
                :level="level + 1"
                >
            </zero-tree-node>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'zero-tree-node',
    props: {
        treeData: {
            type: Array,
            required: true
        },
        options: {
            type: Object,
            default: {}
        },
        level: {
            type: Number,
            default: 1
        }
    },
    data () {
        return {
        }
    },
    computed: {
        nodeData() {
            return this.treeData.slice(0)
        }
    },
    created () {
        const parent = this.$parent
        if (parent.isTree) {
            this.tree = parent
        } else {
            this.tree = parent.tree
        }
    },
    methods: {
        handleNodeExpand (node) {
            node.open = !node.open
        },
        handlecheckedChange (node) {
            this.$nextTick(() => {
                this.$emit('handlecheckedChange', node)
            })
        },
        handleNode (node) {
            this.tree.$emit('node-click', node)
        }
    }
}
</script>

<style scoped>
    .node-selected {
        background-color: #ddd;
    }
    .check {
        display: inline-block;
        position: relative;
        top: 2px;
    }
    .zero-tree {
        min-height: 20px;
    }
    .zero-tree li {
        margin: 0;
        padding: 5px 5px 5px 0;
        position: relative;
        list-style: none;
    }
    .zero-tree>ul {
        padding-left: 0;
    }
    .zero-tree>ul ul {
        padding-left: 1rem;
    }
    .zero-tree li.file {
        margin-left: 26px;
    }
    .zero-tree .icon {
        width: 16px;
        height: 16px;
        display: inline-block;
        vertical-align: middle;
        padding: 5px;
        margin-right: 0;
        cursor: pointer;
        background-color: white;
    }
    
    .zero-tree li.folder:after,
    .zero-tree li.folder:before {
        content: '';
        left: -4px;
        position: absolute;
        right: auto;
        border-width: 1px
    }
    .zero-tree li.folder:before {
        border-left: 1px dashed #999;
        bottom: 50px;
        height: 100%;
        top: -18px;
        width: 1px;
    }
    .zero-tree li.folder:after {
        border-top: 1px dashed #999;
        height: 20px;
        top: 24px;
        width: 8px;
    }
    .zero-tree li.folder:last-child::before {
        height: 42px
    }
    .zero-tree li.file:after,
    .zero-tree li.file:before {
        content: '';
        position: absolute;
        right: auto;
        border-width: 1px
    }
    .zero-tree li.file:before {
        border-left: 1px dashed #999;
        left: -29px;
        bottom: 50px;
        height: 100%;
        top: -8px;
        width: 1px;
    }
    .zero-tree li.file:after {
        border-top: 1px dashed #999;
        left: -29px;
        height: 20px;
        top: 19px;
        width: 28px;
    }
    .zero-tree li.file:last-child::before {
        height: 26px
    }
</style>

