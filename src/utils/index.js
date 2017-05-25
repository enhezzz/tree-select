export function tco (f) {
    let value
    let active = false
    const accumulated = []
    return function accumulator(...args) {
        accumulated.push(args)
        if (!active) {
            active = true
            while (accumulated.length) {
                value = f.apply(this, accumulated.shift())
            }
            active = false
            return value
        }
        return null
    }
}
