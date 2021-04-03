/**
 * 封装本地存储
 */
const local = {
    get(key) {
        return JSON.parse(window.localStorage.getItem(key))
    },
    set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value))
    },
    remove(key) {
        window.localStorage.removeItem(key)
    },
    clear() {
        window.localStorage.clear()
    }
}

// 暴露出去
export default local;