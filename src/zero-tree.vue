<template>
    <div class="zero-tree">
        <zero-tree-node
            :treeData='treeStore.root'
            :options="treeOption"
            @handleCheckedChange="handleCheckedChange"
            @handleNodeCheck="handleNodeCheck"
            >
            <template scope="props">
                <slot :item="props.item"><span
                    :class="{'node-selected':props.item.checked && !options.showCheckbox }"
                    >{{props.item.label}}</span>
                </slot>
            </template>
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
                return {}
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
            return Object.assign({ children: 'children', label: 'label', treeKey: 'id', showCheckbox: true, checkFolder: false }, this.options)
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
                if (this.treeOption.checkFolder && !this.treeOption.showCheckbox) {
                    node.checked = !node.checked
                    this.treeStore.changeCheckStatus(node)
                    this.propChange = false
                    this.$emit('input', this.treeStore.getCheckIds())
                    this.$emit('handleCheckedChange')
                } else {
                    node.open = !node.open
                }
            } else if (!this.treeOption.showCheckbox) {
                node.checked = !node.checked
                this.propChange = false
                this.$emit('input', this.treeStore.getCheckIds())
                this.$emit('handleCheckedChange')
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
        },
        getCheckLabels() {
            return this.treeStore.getCheckLabels()
        },
        getCheckNode() {
            return this.treeStore.getCheckNode()
        }
    }
}
</script>

<style scoped lang="stylus">
</style>
