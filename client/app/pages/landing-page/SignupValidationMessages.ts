const signup_messages = {
    'username': [
        { type: 'required', message: 'Username is required' },
        { type: 'minlength', message: 'Username must be at least 2 characters long' },
        { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
        { type: 'validUsername', message: 'Your username can\'t contain a space or a @' }
    ],
    'email': [
        { type: 'required', message: 'Email is required' },
        { type: 'pattern', message: 'Enter a valid email' }
    ],
    'password_confirmation': [
        { type: 'required', message: 'Confirm password is required' },
        { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
        { type: 'required', message: 'Password is required' },
        { type: 'minlength', message: 'Password must be at least 5 characters long' },
        { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'firstname': [
        { type: 'required', message: 'Firstname is required' },
    ],
    'surname': [
        { type: 'required', message: 'Surname is required' },
    ],
    'terms': [
        { type: 'pattern', message: 'You must accept terms and conditions' }
    ],
    'country': [
        { type: 'required', message: 'Please select a country to represent'}
    ]
};

export default signup_messages;