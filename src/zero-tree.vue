<template>
    <div class="zero-tree">
        <zero-tree-node
            :treeData='treeStore.root'
            :options="treeOption"
            @handleCheckedChange="handleCheckedChange"
            @handleNodeCheck="handleNodeCheck"
            >
        </zero-tree-node>
    </div>
</template>
<script>
import ZeroTreeNode from './zero-tree-node'
import ZeroTreeStore from './zero-tree-store'
export default {
    components: { ZeroTreeNode },
    name: 'zero-tree',
    props: {
        treeData: {
            type: Array,
            required: true
        },
        options: {
            type: Object,
            default () {
                return { children: 'children', label: 'label', treeKey: 'id', showCheckbox: true }
            }
        },
        value: {
            type: Array,
            required: false,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            isTree: true,
            propChange: true
        }
    },
    watch: {
        value(newVal) {
            if (this.propChange) {
                this.treeStore.checkAll(false)
                this.treeStore.changeCheckByKey(newVal, true)
            } else {
                this.propChange = true
            }
        }
    },
    computed: {
        treeStore() {
            return new ZeroTreeStore(Object.assign({
                root: this.treeData.slice(0)
            }, this.treeOption), this.$set)
        },
        treeOption() {
            return Object.assign({ children: 'children', label: 'label', treeKey: 'id', showCheckbox: true }, this.options)
        }
    },
    created () {
    },
    methods: {
        handleCheckedChange(node) {
            this.treeStore.changeCheckStatus(node)
            this.propChange = false
            this.$emit('input', this.treeStore.getCheckIds())
            this.$emit('handleCheckedChange', node)
        },
        handleNodeCheck(node) {
            const children = node[this.treeOption.children]
            if (children && children.length > 0) {
                node.open = !node.open
            }
            this.$emit('handleNodeCheck')
        },
        checkAll(check) {
            this.treeStore.checkAll(check)
            this.propChange = false
            this.$emit('input', this.treeStore.getCheckIds())
            this.$emit('handleCheckedChange')
        },
        checkKey(key, check) {
            this.treeStore.checkNodeDeep(key, check)
            this.propChange = false
            this.$emit('input', this.treeStore.getCheckIds())
            this.$emit('handleCheckedChange')
        }
    }
}
</script>
