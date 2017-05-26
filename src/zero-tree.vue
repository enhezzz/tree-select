<template>
    <div class="zero-tree">
        <zero-tree-node
            :treeData='treeStore.root'
            :options="treeOption"
            @handlecheckedChange="handlecheckedChange"
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
                setTimeout(() => {
                    this.treeStore.changeCheckByKey(newVal, true)
                }, 0)
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
        handlecheckedChange(node) {
            this.treeStore.changeCheckStatus(node)
            this.propChange = false
            this.$emit('input', this.treeStore.getCheckIds())
            this.$emit('handlecheckedChange', node)
        },
        handleNodeCheck(node) {
            const children = node[this.options.children]
            if (children && children.length > 0) {
                node.open = !node.open
            }
        }
    }
}
</script>
