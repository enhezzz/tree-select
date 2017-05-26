<template>
    <ul class="zero-tree-node">
        <li
            v-for='item in nodeData'
            v-show="!item.disable"
            :class="[(item[options.children] && item[options.children].length > 0) ? 'folder' : 'file', 'level-' + level]"><svg class="icon"
                v-if="item[options.children] && item[options.children].length > 0"
                @click.stop="handleNodeExpand(item)">
                <use v-if="item.open" xlink:href="#down"></use>
                <use v-else xlink:href="#right"></use>
            </svg><input
                type="checkbox"
                class="check"
                v-if="options.showCheckbox"
                v-model='item.checked'
                @click.stop="handleCheckedChange(item)"/><slot :item="item"><span
                @click.stop="handleNodeCheck(item)"
                :class="{'node-selected':item.checked && !options.showCheckbox }">
                {{item.label}}
            </span></slot>
            <zero-tree-node
                v-if="item[options.children] && item[options.children].length > 0"
                :options="options"
                @handleCheckedChange="handleCheckedChange"
                @handleNodeCheck="handleNodeCheck"
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
        handleCheckedChange (node) {
            this.$nextTick(() => {
                this.$emit('handleCheckedChange', node)
            })
        },
        handleNodeCheck (node) {
            this.$emit('handleNodeCheck', node)
            // this.tree.$emit('node-click', node)
        }
    }
}
</script>

<style scoped lang="stylus">
    icon-width = 16px /*1.1428rem*/
    icon-padding = 5px /*0.3571rem*/
    li-padding = 5px /*0.3571rem*/
    ul-padding-left = icon-width
    li-height = icon-width + icon-padding * 2 + li-padding * 2
    file-margin-left = icon-width + icon-padding * 2
    folder-left = icon-padding
    li-after-width = icon-padding + ul-padding-left - icon-width
    folder-left = ul-padding-left - (file-margin-left / 2)
    .node-selected
        background-color: #ddd
    .check
        display inline-block
        position relative
        top 4px
    .zero-tree
        min-height 20px
        li
            margin 0
            padding li-padding li-padding li-padding 0
            position relative
            list-style none
        ul
            padding-left ul-padding-left
        li.file
            margin-left file-margin-left
        .icon
            width icon-width
            height icon-width
            display inline-block
            vertical-align middle
            padding icon-padding
            margin-right 0
            cursor pointer
            background-color white
        li:after, li:before
            content ''
            left -(folder-left)
            position absolute
            border-width 1px
        li:before
            border-left: 1px dashed #999
            height 100%
            top -(li-padding)
            width 1px
        li:after
            border-top 1px dashed #999
            top (li-height / 2)
            width li-after-width
        li:last-child::before
            height (li-height / 2 + li-padding)
        li.file:after, li.file:before
            left -(folder-left + file-margin-left)
        li.file:after
            width folder-left + file-margin-left
</style>

