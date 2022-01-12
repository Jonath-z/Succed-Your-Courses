const handleLoginSubmit = (e) => {
    const email = e.target.elements.namedItem('email').value;
    const password = e.target.elements.namedItem('password').value;
        const data = {
            email: email,
            password: password,
        }
        return data;
}

export default handleLoginSubmit;