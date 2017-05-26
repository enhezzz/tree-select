import ZeroTree from './zero-tree.vue'

ZeroTree.install = function (Vue, svgConfig) {
    if (!document.getElementById('zero-tree-icon')) {
        const svg = document.createElement('div')
        svg.innerHTML = svgConfig || `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;" id="zero-tree-icon">
            <symbol id="right" viewBox="0 0 1025 1024">
                <defs><style type="text/css"></style></defs><path d="M895.531061 485.788536 535.640488 485.788536 535.640488 125.897963c0-13.5716-11.001648-24.573248-24.573248-24.573248s-24.573248 11.001648-24.573248 24.573248l0 359.890572L126.604444 485.788536c-13.5716 0-24.573248 11.001648-24.573248 24.573248s11.001648 24.573248 24.573248 24.573248l359.889548 0 0 359.890572c0 13.5716 11.001648 24.573248 24.573248 24.573248s24.573248-11.001648 24.573248-24.573248L535.640488 534.934007l359.890572 0c13.5716 0 24.573248-11.001648 24.573248-24.573248S909.102661 485.788536 895.531061 485.788536z" p-id="1874"></path>
            </symbol>
            <symbol id="down" viewBox="0 0 1025 1024">
                <defs><style type="text/css"></style></defs><path d="M895.531061 534.934007 126.604444 534.934007c-13.5716 0-24.573248-11.001648-24.573248-24.573248s11.001648-24.573248 24.573248-24.573248l768.926616 0c13.5716 0 24.573248 11.001648 24.573248 24.573248S909.102661 534.934007 895.531061 534.934007z" p-id="1760"></path>
            </symbol>
            <symbol id="check" viewBox="0 0 1024 1024">
                <defs><style type="text/css"></style></defs><path d="M461.973333 586.325333l-105.642666-105.642666a21.248 21.248 0 0 0-30.122667 0.042666c-8.32 8.32-8.213333 21.973333-0.064 30.101334l120.810667 120.832a21.248 21.248 0 0 0 30.122666-0.085334l211.157334-211.157333a21.290667 21.290667 0 0 0 0-30.186667 21.397333 21.397333 0 0 0-30.250667 0.106667l-196.010667 195.989333z" fill="#3D3D3D" p-id="3093"></path><path d="M149.333333 874.602667L874.602667 874.666667 874.666667 149.397333 149.397333 149.333333 149.333333 874.602667zM106.666667 149.397333C106.666667 125.802667 125.909333 106.666667 149.397333 106.666667h725.205334C898.197333 106.666667 917.333333 125.909333 917.333333 149.397333v725.205334A42.794667 42.794667 0 0 1 874.602667 917.333333H149.397333A42.794667 42.794667 0 0 1 106.666667 874.602667V149.397333z" fill="#3D3D3D" p-id="3094"></path>
            </symbol>
            <symbol id="uncheck" viewBox="0 0 1024 1024">
                <defs><style type="text/css"></style></defs><path d="M149.333333 874.602667L874.602667 874.666667 874.666667 149.397333 149.397333 149.333333 149.333333 874.602667zM106.666667 149.397333C106.666667 125.802667 125.909333 106.666667 149.397333 106.666667h725.205334C898.197333 106.666667 917.333333 125.909333 917.333333 149.397333v725.205334A42.794667 42.794667 0 0 1 874.602667 917.333333H149.397333A42.794667 42.794667 0 0 1 106.666667 874.602667V149.397333z" fill="#3D3D3D" p-id="3208"></path>
            </symbol>
        </svg>`
        /*
        `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;" id="zero-tree-icon">
            <symbol id="down" viewBox="0 0 1024 1024">
                <defs><style type="text/css"></style></defs><path d="M45.376 481.088l933.856 0c17.184 0 31.136 13.952 31.136 31.136s-13.952 31.136-31.136 31.136l-933.856 0c-17.184 0-31.136-13.952-31.136-31.136s13.92-31.136 31.136-31.136z" p-id="9230"></path>
            </symbol>
            <symbol id="right" viewBox="0 0 1024 1024">
                <defs><style type="text/css"></style></defs><path d="M979.232 532.96l-425.408 0 0 446.176c0 17.184-13.92 31.136-31.136 31.136s-31.136-13.952-31.136-31.136l0-446.176-446.176 0c-17.184 0-31.136-13.952-31.136-31.136s13.92-31.136 31.136-31.136l446.176 0 0-425.408c0-17.184 13.92-31.136 31.136-31.136s31.136 13.952 31.136 31.136l0 425.408 425.408 0c17.184 0 31.136 13.952 31.136 31.136s-13.92 31.136-31.136 31.136z" p-id="9116"></path>
            </symbol>
        </svg>`
        */
        document.body.appendChild(svg)
    }
    Vue && Vue.component('zero-tree', ZeroTree)
}

module.exports = ZeroTree
