<template>
    <div class="zero-tree">
        <div v-html="icon" style="display: none;"></div>
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
            icon: `
            <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="down" viewBox="0 0 1024 1024">
                    <defs><style type="text/css"></style></defs><path d="M45.376 481.088l933.856 0c17.184 0 31.136 13.952 31.136 31.136s-13.952 31.136-31.136 31.136l-933.856 0c-17.184 0-31.136-13.952-31.136-31.136s13.92-31.136 31.136-31.136z" p-id="9230"></path>
                </symbol>
                <symbol id="right" viewBox="0 0 1024 1024">
                    <defs><style type="text/css"></style></defs><path d="M979.232 532.96l-425.408 0 0 446.176c0 17.184-13.92 31.136-31.136 31.136s-31.136-13.952-31.136-31.136l0-446.176-446.176 0c-17.184 0-31.136-13.952-31.136-31.136s13.92-31.136 31.136-31.136l446.176 0 0-425.408c0-17.184 13.92-31.136 31.136-31.136s31.136 13.952 31.136 31.136l0 425.408 425.408 0c17.184 0 31.136 13.952 31.136 31.136s-13.92 31.136-31.136 31.136z" p-id="9116"></path>
                </symbol>
            </svg>
            `,
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
