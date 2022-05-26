export const getLocalStorageToken = (key) => {
  return localStorage.getItem(key)
}
export const getLocalStorageUser = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

export const setLocalStorageUser = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}


export const setLocalStorageToken = (key, value) => {
  localStorage.setItem(key, value)
}

export const deleteLocalStorageUser = (key) => {
localStorage.removeItem(key)
}

export const deleteLocalStorageToken = (key) => {
  localStorage.removeItem(key)
  }