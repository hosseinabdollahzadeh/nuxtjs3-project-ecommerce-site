export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const {public: {apiBaseUrl}} = useRuntimeConfig();
    const token = getCookie(event, 'token');
    const query = getQuery(event);

    try {
        const data = await $fetch(`${apiBaseUrl}${query.url}`, {
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