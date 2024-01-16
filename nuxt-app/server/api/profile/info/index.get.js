export default defineEventHandler(async (event) => {
    const {public: {apiBaseUrl}} = useRuntimeConfig();
    const token = getCookie(event, 'token');

    try {
        const data = await $fetch(`${apiBaseUrl}/profile/info`, {
            headers: {
                'Accept' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return data.data;

    }catch (error){
        return error
    }
})