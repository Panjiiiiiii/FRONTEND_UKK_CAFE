const getLocalStorage = (key) => {
    const data = localStorage.getItem(key)
    return data ?? ""
}

const deleteLocalStorage = (key) => {
    const data = localStorage.removeItem(key)
    return data ?? ""
}
export {getLocalStorage, deleteLocalStorage}