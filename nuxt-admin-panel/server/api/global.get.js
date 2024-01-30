export default defineEventHandler(async (event) => {
    const {public: {apiBaseUrl}} = useRuntimeConfig();
    const token = getCookie(event, 'token');
    const query = getQuery(event);

    let page = query.hasOwnProperty('page') ? `?page=${query.page}` : '';

    try {
        const data = await $fetch(`${apiBaseUrl}${query.url}${page}`, {
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