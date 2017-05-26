<template>
    <ul class="zero-tree-node">
        <li
            v-for='item in nodeData'
            v-show="!item.disable"
            :class="[(item[options.children] && item[options.children].length > 0) ? 'folder' : 'file', 'level-' + level]"><div class="li-content"><svg class="icon"
                v-if="item[options.children] && item[options.children].length > 0"
                @click.stop="handleNodeExpand(item)">
                <use v-if="item.open" xlink:href="#down"></use>
                <use v-else xlink:href="#right"></use>
            </svg><div v-else class="icon-blank"></div><svg class="icon"
                    v-if="options.showCheckbox"
                    @click.stop="handleCheckedChange(item)">
                    <use v-if="item.checked" xlink:href="#check"></use>
                    <use v-else xlink:href="#uncheck"></use>
                </svg><!--<input
                type="checkbox"
                class="check"
                v-if="options.showCheckbox"
                v-model='item.checked'
                @click.stop="handleCheckedChange(item)"/>--><div
                class="li-slot"
                @click.stop="handleNodeCheck(item)"
                ><slot :item="item"></slot></div>
            </div>
            <zero-tree-node
                v-if="item[options.children] && item[options.children].length > 0"
                :options="options"
                @handleCheckedChange="handleCheckedChange"
                @handleNodeCheck="handleNodeCheck"
                v-show='item.open'
                :tree-data="item[options.children]"
                :level="level + 1"
                >
                <template scope="props">
                    <slot :item="props.item">
                    </slot>
                </template>
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
        handleCheckedChange (node, flag) {
            if (this.tree) {
                flag || (node.checked = !node.checked)
                this.tree.handleCheckedChange(node)
            } else {
                flag || (node.checked = !node.checked)
                this.$nextTick(() => {
                    this.$emit('handleCheckedChange', node, true)
                })
            }
        },
        handleNodeCheck (node) {
            if (this.tree) {
                this.tree.handleNodeCheck(node)
            } else {
                this.$emit('handleNodeCheck', node)
            }
            // this.tree.$emit('node-click', node)
        }
    }
}
</script>

<style scoped lang="stylus">
    icon-width = 20px /*1.1428rem*/
    icon-padding = 2px /*0.3571rem*/
    li-padding = 5px /*0.3571rem*/
    ul-padding-left = icon-width
    li-height = icon-width + icon-padding * 2 + li-padding * 2
    file-margin-left = icon-width + icon-padding * 2
    folder-left = icon-padding
    li-after-width = 8px
    folder-left = ul-padding-left - (file-margin-left / 2)
    .node-selected
        border 1px solid #66B3FF
    .zero-tree
        min-height 20px
        li
            margin 0
            padding li-padding li-padding li-padding 0
            position relative
            list-style none
        .li-content
            display inline-block
            height icon-width + icon-padding * 2
        .li-slot
            display inline-block
        ul
            padding-left ul-padding-left
        .icon, .icon-blank
            width icon-width
            height icon-width
            display inline-block
            vertical-align middle
            padding icon-padding
            margin-right 0
            background-color white
        .icon
            cursor pointer
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
            left -(folder-left)
        li.file:after
            width folder-left + file-margin-left
</style>

