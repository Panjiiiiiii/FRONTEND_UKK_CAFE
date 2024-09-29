const getLocalStorage = (key) => {
    const data = localStorage.getItem(key)
    return data ?? ""
}
export {getLocalStorage}