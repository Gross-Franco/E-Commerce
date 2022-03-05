import {axiosWithCredentials as axios} from "../../utilities/axios" 
const hasNumber = /\d/
const hasSpeChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
const emailRe = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const passwordRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/m;

const validateUsername = async (username) => {
    if(username.length === 0) return 'Please insert a username'
    const response = await axios.get(`/user/validate?username=${username}`);
    if(response.data) return 'Username is taken';
    return false;
}

const validateEmail = async (email) => {
    if(!emailRe.test(email)) return 'Please insert a valid Email'
    const response = await axios.get(`/user/validate?email=${email}`); 
    if(response.data) return "There's already an account registered with this email"
    return false;
}

const validatePassword = async (password) => {
    if(!passwordRe.exec(password)) return 'Password must contain at least 8 characters, 1 uppercase, 1 lowercase and 1 number';
    return false;
}

const validateFirstName = (firstName) => {
    if(firstName.length === 0) return 'Please insert a name'
    if(hasNumber.test(firstName) || hasSpeChar.test(firstName)) return 'Please insert a valid name'
    return false
}

const validateLastName = (lastName) => {
    if(lastName.length === 0) return 'Please insert a last name'
    if(hasNumber.test(lastName) || hasSpeChar.test(lastName)) return 'Please insert a valid last name'
    return false
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