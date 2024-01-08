export default defineEventHandler(async (event) => {
    const {public: {apiBaseUrl}} = useRuntimeConfig();
    const loginToken = getCookie(event, 'login_token');

    try {
        const data = await $fetch(`${apiBaseUrl}/auth/resend-otp`, {
            method: 'POST',
            body: {login_token: loginToken},
            headers: {
                'Accept' : 'application/json',
            }
        });

        setCookie(event, 'login_token', data.data.login_token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/'
        })

        return 'otp resend'
    }catch (error){

        console.log(error.data)
        return error
    }
})