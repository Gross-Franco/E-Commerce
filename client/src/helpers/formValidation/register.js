import axios from "axios"
const nameRe = /[a-zA-Z]+/;
const emailRe = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const passwordRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/m

const validateUsername = async (username) => {
    if(username.length === 0) return 'Please insert a valid username'
    const existing = await axios.get(`/user/validate?username=${username}`);
    if(existing.data) return 'Username is taken';
    return false;
}

const validateEmail = async (email) => {
    if(!emailRe.test(email)) return 'Please insert a valid Email'
    const existing = await axios.get(`/user/validate?email=${email}`); 
    if(existing.data) return "There's already an account registered with this email"
    return false;
}

const validatePassword = async (password) => {
    if(!passwordRe.exec(password)) return 'Password must contain at least 8 characters, 1 uppercase, 1 lowercase and 1 number';
    return false;
}

const validateFirstName = (firstName) => {
    if(nameRe.test(firstName)) return false
    return 'Please insert a valid name' 
}

const validateLastName = (lastName) => {
    if(!nameRe.test(lastName)) return 'Please insert a valid last name'
    return false;
}

export const validator = async (input, value) => {
    switch(input) {
        case "username":
            return await validateUsername(value)
        case "email":
            return await validateEmail(value)
        case "password":
            return validatePassword(value)
        case "lastName":
            return validateLastName(value)
        case "firstName":
            return validateFirstName(value)
        default: return false    
    }
}   