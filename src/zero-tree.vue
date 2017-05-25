<template>
    <div class="zero-tree">
        <zero-tree-node
            :treeData='treeStore.root'
            :options="options"
            @handlecheckedChange="handlecheckedChange"
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
            propChange: true,
            treeStore: new ZeroTreeStore(Object.assign({
                root: this.treeData.slice(0),
                children: 'children',
                label: 'label',
                treeKey: 'id',
                showCheckbox: true
            }, this.options), this.$set)
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
        },
        treeData(newVal) {
            const treeData = newVal || []
            this.treeStore = new ZeroTreeStore(Object.assign({
                root: treeData.slice(0)
            }, this.options), this.$set)
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
        }
    }
}
</script>
