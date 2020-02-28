const express = require('express');

function validUser(user) {
    
    const validUsername = typeof user.username == 'string' &&
                            user.username.trim() != '';
    const validEmail = typeof user.email == 'string' &&
                            user.email.trim() != '';
    const validPassword = typeof user.user_password == 'string' &&
                            user.user_password.trim() != '' &&
                            user.user_password.trim().length > 6;
                            
    return validUsername && validEmail && validPassword
}


module.exports = {
    validUser
}