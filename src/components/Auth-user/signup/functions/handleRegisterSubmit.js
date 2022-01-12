
const handleRegisterSubmit = (e) => {
    const name = e.target.elements.namedItem('name').value;
    const email = e.target.elements.namedItem('email').value;
    const password = e.target.elements.namedItem('password').value;
    const confirmedPassword = e.target.elements.namedItem('confirmedPassword').value; 
        const data = {
            name: name,
            email: email,
            password: password,
            confirmedPassword:confirmedPassword
        }
        return data;
}

export default handleRegisterSubmit;