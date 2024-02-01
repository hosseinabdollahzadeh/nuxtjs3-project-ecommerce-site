import {readFiles} from 'h3-formidable'
import FormData from "form-data";
import fs from "fs";

export default defineEventHandler(async (event) => {
    const {public: {apiBaseUrl}} = useRuntimeConfig();
    const token = getCookie(event, 'token');

    const {fields, files} = await readFiles(event, {
        includeFields: true
    });


    // todo check for reason of not recognize formData on apiBaseUrl/products and return error for required fields and files
    try {

        const formData = new FormData();

        if (files.images && files.images.length > 0) {
            for (let index = 0; index < files.images.length; index++) {
                formData.append("images[]", fs.createReadStream(files.images[index].filepath));
            }
        }

        formData.append("primary_image", fs.createReadStream(files.primary_image[0].filepath));
        formData.append("name", fields.name[0]);
        formData.append("category_id", fields.category_id[0]);
        formData.append("status", fields.status[0]);
        formData.append("price", fields.price[0]);
        formData.append("quantity", fields.quantity[0]);
        formData.append("sale_price", fields.sale_price[0]);
        formData.append("date_on_sale_from", fields.date_on_sale_from[0]);
        formData.append("date_on_sale_to", fields.date_on_sale_to[0]);
        formData.append("description", fields.description[0]);


        const data = await $fetch(`${apiBaseUrl}/products`, {
            method: 'POST',
            body: formData,
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