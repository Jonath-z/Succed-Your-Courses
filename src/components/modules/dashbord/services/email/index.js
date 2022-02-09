import emailjs from 'emailjs-com';

export const requestAcceptedNotification = (user) => {
    emailjs.send(`${process.env.REACT_APP_EMAILJS_SERVICE_ID}`, `${process.env.REACT_APP_EMAILJS_TEMPLETE_ID}`, {
        subject: `Payement validation`,
        from_name:'Succed your course Team',
        name: `${user.name}`,
        to_email: `${user.email}`,
        message: `
            Your Payement has been validated.
            Now you have access to all the enrolled courses.
    `}, `${process.env.REACT_APP_EMAILJS_USER_ID}`);

}

export const requestRejectedNotification = (user) => {
    emailjs.send(`${process.env.REACT_APP_EMAILJS_SERVICE_ID}`, `${process.env.REACT_APP_EMAILJS_TEMPLETE_ID}`, {
        subject: `Payement rejected`,
        from_name:'Succed your course Team',
        name: `${user.name}`,
        to_email: `${user.email}`,
        message: `
            Your Payement has been rejected.
            For any claim please let us know as soon as possible.
    `}, `${process.env.REACT_APP_EMAILJS_USER_ID}`);
}