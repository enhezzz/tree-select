import ZeroTree from './zero-tree.vue'

ZeroTree.install = function (Vue) {
    if (!document.getElementById('zero-tree-icon')) {
        const svg = document.createElement('div')
        svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;" id="zero-tree-icon">
            <symbol id="down" viewBox="0 0 1024 1024">
                <defs><style type="text/css"></style></defs><path d="M45.376 481.088l933.856 0c17.184 0 31.136 13.952 31.136 31.136s-13.952 31.136-31.136 31.136l-933.856 0c-17.184 0-31.136-13.952-31.136-31.136s13.92-31.136 31.136-31.136z" p-id="9230"></path>
            </symbol>
            <symbol id="right" viewBox="0 0 1024 1024">
                <defs><style type="text/css"></style></defs><path d="M979.232 532.96l-425.408 0 0 446.176c0 17.184-13.92 31.136-31.136 31.136s-31.136-13.952-31.136-31.136l0-446.176-446.176 0c-17.184 0-31.136-13.952-31.136-31.136s13.92-31.136 31.136-31.136l446.176 0 0-425.408c0-17.184 13.92-31.136 31.136-31.136s31.136 13.952 31.136 31.136l0 425.408 425.408 0c17.184 0 31.136 13.952 31.136 31.136s-13.92 31.136-31.136 31.136z" p-id="9116"></path>
            </symbol>
        </svg>`
        document.body.appendChild(svg)
    }
    Vue.component('zero-tree', ZeroTree)
}

module.exports = ZeroTree
