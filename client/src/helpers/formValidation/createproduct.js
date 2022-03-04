const SKURe = /\b[A-Z0-9]{8}\b/
const urlRe = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i

const validatePrice = async (price) => {
    if(!price) return 'Price must be specified';
    return false;
}

const validateSKU = async (SKU) => {
    if(!SKURe.test(SKU)) return 'Insert an 8 digit, no lowercase, alhpanumeric code. Example: SKU23EX45';
    return false
}

const validateQuantity = async (quantity) => {
    if(!quantity) return 'Quantity must be specified';
    return false;
}

const validateImage = (image) => {
    if(image.length === 0) return false
    if(!urlRe.test(image)) return 'Please insert a valid url or leave empty'
    return false;
}

export const validator = async (input, value) => {
    switch(input) {
        case "price":
            return await validatePrice(value)
        case "SKU":
            return await validateSKU(value)
        case "quantity":
            return validateQuantity(value)
        case "image":
            return validateImage(value)
        default: return false    
    }
}   