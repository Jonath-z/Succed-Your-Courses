import { fireStoreDB } from "../../../../../services/firebase";
import uuid from "react-uuid";

const upload = (name, email, password) => {
    console.log(name, email, password);
    fireStoreDB.collection('users').add({
        name: name,
        email: email,
        password: password,
        id: uuid(),
        courses: []
    });
}

export default upload;