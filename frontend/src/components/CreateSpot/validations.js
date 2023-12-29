


export const createValidations = (address, city, state, country, description,price, previewImg,name,image1, image2, image3, image4) =>{
     const errObj = {}

    if (!address) errObj.address = "Address is required";
    if (!city) errObj.city = "City is required";
    if (!state) errObj.state = "State is required";
    if (!country) errObj.country = "Country is required";
    if (!description || description.length < 30) errObj.description = "Description needs 30 or more characters";
    if (!previewImg) errObj.previewImg = "Preview Image is required";
    if (!price) errObj.price = "Price per night is required";
    if(typeof price !== 'number') errObj.price = 'Price must be a valid price';
    if (!name) errObj.name = "Title for Spot is required";
    if(typeof name !== 'string') errObj.name = "Name must be valid"
    if(typeof description !== 'string') errObj.name = "Name must be valid"
    if(previewImg && !previewImg.match(/\.(jpg|jpeg|png|gif)$/)) errObj.previewImg = 'Must be a valid image'
    if(image1 && !image1.match(/\.(jpg|jpeg|png|gif)$/)) errObj.image1 = 'Must be a valid image'
    if(image2 && !image2.match(/\.(jpg|jpeg|png|gif)$/)) errObj.image2 = 'Must be a valid image'
    if(image3 &&  !image3.match(/\.(jpg|jpeg|png|gif)$/)) errObj.image3 = 'Must be a valid image'
    if(image4 && !image4.match(/\.(jpg|jpeg|png|gif)$/)) errObj.image4 = 'Must be a valid image'

    return errObj
}

// console.log(createValidations('','','','','','','test','test','test','test','https://a0.muscache.com/im/pictures/0314e46d-7d82-45f4-b5cb-df3927009f17.jpg?im_w=480'))
