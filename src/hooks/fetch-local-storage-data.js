export const fetchUser = () => {
    let userInfo = null
    if (typeof window !== 'undefined') {
        userInfo =
            localStorage.getItem('user') !== 'undefined'
                ? JSON.parse(localStorage.getItem('user'))
                : localStorage.clear()
    }

    return userInfo
}

export const fetchRole = () => {
    let userRole = null
    if (typeof window !== 'undefined') {
        userRole =
            localStorage.getItem('role') !== 'undefined'
                ? JSON.parse(localStorage.getItem('role'))
                : localStorage.clear()
    }

    return userRole
}