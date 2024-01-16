export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const {public: {apiBaseUrl}} = useRuntimeConfig();
    const token = getCookie(event, 'token');

    try {
        const data = await $fetch(`${apiBaseUrl}/profile/addresses/create`, {
            method: 'POST',
            body: body,
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