const changePasswordValidator = ({oldPassword, newPassword}) => {

    const errors = {
        oldPassword : "",
        newPassword : ""
    }

    if(!oldPassword){
        errors.oldPassword = "oldPassword is required"
    }

    if(!newPassword){
        errors.newPassword = "newPassword is required"
    }else if(newPassword.length < 6){
        errors.newPassword = "New password should be 6 character long"
    }

    if(oldPassword && oldPassword === newPassword){
        errors.newPassword = "You are providing old password" 
    }

    return errors
}

export default changePasswordValidator