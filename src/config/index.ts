const config = {
    api: {
        base: process.env.NEXT_PUBLIC_BASE_API_URL || "https://vnk-server.onrender.com/api/",
        local: process.env.NEXT_PUBLIC_LOCAL_API_URL || "http://localhost:8800/api/",
    },
}

export default config