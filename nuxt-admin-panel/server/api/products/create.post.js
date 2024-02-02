export default defineEventHandler(async (event) => {
    const {public: {apiBaseUrl}} = useRuntimeConfig();
    const token = getCookie(event, 'token');

    const formData = await readFormData(event);

    // const formData = await readFormData(event)

    // Create a new FormData object and append the grouped 'images' array
    const newData = new FormData();

    newData.append('primary_image', formData.get('primary_image'));

    if (formData.has('images')) {
        // Group 'images' entries into an array
        const groupedImages = formData.getAll('images');
        // Append the grouped 'images' array to the new FormData object
        groupedImages.forEach((image, index) => {
            newData.append(`images[${index}]`, image);
        });
    }

    newData.append('name', formData.get('name'));
    newData.append('category_id', formData.get('category_id'));
    newData.append('status', formData.get('status'));
    newData.append('price', formData.get('price'));
    newData.append('quantity', formData.get('quantity'));

    if (formData.has('sale_price')) {
        newData.append('sale_price', formData.get('sale_price'));
    }
    if (formData.has('date_on_sale_from')) {
        newData.append('date_on_sale_from', formData.get('date_on_sale_from'));
    }
    if (formData.has('date_on_sale_to')) {
        newData.append('date_on_sale_to', formData.get('date_on_sale_to'));
    }
    newData.append('description', formData.get('description'));


    // Now 'newData' contains the organized FormData with 'images' as an array
    // console.log(newData);


    try {
        const data = await $fetch(`${apiBaseUrl}/products`, {
            method: 'POST',
            body: newData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return data.data;

    } catch (error) {
        return error
    }
})