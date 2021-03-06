import { tco } from './utils'

export default function ZeroTreeStore (options, set) {
    this.root = options.root || []
    this.options = Object.assign({}, options)
    this.datas = {}
    this.len = 0
    this.flag = false
    const _traverseNodes = tco((root, parentId) => {
        for (let i = 0, len = root.length; i < len; i++) {
            this.len++
            const node = root[i]
            node.parentId = parentId
            const nodeId = node[this.options.treeKey]
            if (this.datas[nodeId]) {
                throw new Error('nodeId repeat:' + nodeId)
            }
            this.datas[node[this.options.treeKey]] = node
            node.checked === undefined && set(node, 'checked', false)
            if (node[this.options.children] && node[this.options.children].length > 0) {
                node.open === undefined && set(node, 'open', false)
                _traverseNodes(node[this.options.children], node[this.options.treeKey])
            }
        }
    })
    _traverseNodes(this.root, null)
    if (this.len > 5000) {
        this.datas = null
        this.root = []
        throw new Error('node len > 5000 clear root len:' + this.len)
    }
}
ZeroTreeStore.prototype.changeCheckStatus = function (node) {
    const _traverseUp = tco((node) => {
        if (node.checked && node.parentId) {
            const parent = this.getNode(node.parentId)
            if (parent) {
                parent.checked = this.sameSilibingChecked(parent, node[this.options.treeKey])
                return _traverseUp(parent)
            }
        } else if (!node.checked && node.parentId) {
            const upparent = this.getNode(node.parentId)
            if (upparent) {
                upparent.checked = false
                if (upparent.parentId) {
                    return _traverseUp(upparent)
                }
            }
        }
        return true
    })
    const _traverseDown = tco((node) => {
        const children = node[this.options.children]
        if (children && children.length > 0) {
            for (let i = 0, len = children.length; i < len; i++) {
                const child = children[i]
                child.checked = node.checked
                _traverseDown(child)
            }
        }
    })
    if (node && node.parentId) {
        _traverseUp(node)
    }
    if (node) {
        _traverseDown(node)
    }
}
ZeroTreeStore.prototype.getNode = function (key) {
    return this.datas[key]
}
ZeroTreeStore.prototype.sameSilibingChecked = function (parent, currentId) {
    if (!parent) {
        return false
    }
    const children = parent[this.options.children]
    if (!children) {
        return false
    }
    for (let i = 0, len = children.length; i < len; i++) {
        const node = children[i]
        if (node[this.options.treeKey] !== currentId && !node.checked) {
            return false
        }
    }
    return true
}
ZeroTreeStore.prototype.getCheckIds = function () {
    return this.getCheckNodes().map((i) => i[this.options.treeKey])
}
ZeroTreeStore.prototype.changeCheckByKey = function (keys, check = true, isDeep = false) {
    const self = this
    keys.forEach(function(i) {
        const node = self.datas[i]
        if (node) {
            self.datas[i].checked = check
        }
    })
    if (isDeep) {
        return this.NodeDeep()
    }
}
ZeroTreeStore.prototype.checkAll = function (check = false) {
    for (const key in this.datas) {
        const node = this.datas[key]
        if (node.checked !== check) {
            node.checked = check
        }
    }
}
ZeroTreeStore.prototype.checkNodeDeep = function (key, check = false) {
    const node = this.datas[key]
    if (node) {
        node.checked = check
        this.changeCheckStatus(node)
        return true
    }
    return false
}
ZeroTreeStore.prototype.getCheckLabels = function () {
    return this.getCheckNodes().map((i) => i[this.options.label])
}
ZeroTreeStore.prototype.getCheckNodes = function () {
    const nodes = []
    for (const key in this.datas) {
        const node = this.datas[key]
        if (node.checked) {
            nodes.push(node)
        }
    }
    return nodes
}

ZeroTreeStore.prototype.NodeDeep = function() {
    const Deep = (nodes, parent) => {
        let check = true
        nodes.forEach(node => {
            const children = node[this.options.children]
            if (children && children.length > 0) {
                Deep(children, node)
            }
            check = check && node.checked
        })
        if (parent && parent.checked !== check) {
            parent.checked = check
        }
    }
    Deep(this.root)
}
