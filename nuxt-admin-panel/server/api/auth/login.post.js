export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {public: {apiBaseUrl}} = useRuntimeConfig()

    try {
        const data = await $fetch(`${apiBaseUrl}/auth/login`, {
            method: 'POST',
            body: body,
            headers: {
                'Accept': 'application/json'
            }
        })

        setCookie(event, 'token', data.data.token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/'
        })

        return data.data.user
    } catch (error) {
        return error
    }
})