const isEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null;
};

const sendCodeValidator = ({email}) => {
    const errors = {
        password: "",
    }

    if(!email){
        errors.email = "Email is required"
    }else if(!isEmail(email)){
        errors.email = "Invalid email"
    }

    return errors
}

export default sendCodeValidator