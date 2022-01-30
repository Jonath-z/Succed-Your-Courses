import { fireStoreDB } from "../../../services/firebase";
import encrypt from "../../Auth-user/signup/services/uploadForm/encrypt";
import { LocalStorage } from "../../../helper/localStorage";

export const updateNewName = (name, userID) => {
    fireStoreDB.collection('/users').where('id', '==', userID)
        .get()
        .then(snapshot => {
            if (!snapshot.empty) {
                snapshot.forEach(async (doc) => {
                    const ref = fireStoreDB.collection('/users').doc(doc.id);
                    await ref.update({ name: name });
                });
            }
        });
    const user = JSON.parse(LocalStorage.get('userData'));
    user.name = name;
    LocalStorage.set('userData',JSON.stringify(user));
}

export const updateNewEmail = (email,userID) => {
    fireStoreDB.collection('users').where('id', '==', userID)
    .get()
    .then(snapshot => {
        if (!snapshot.empty) {
            snapshot.forEach(async (doc) => {
                const ref = fireStoreDB.collection('users').doc(doc.id);
                await ref.update({ email: email });
            });
        }
    });
    const user = JSON.parse(LocalStorage.get('userData'));
    user.email = email;
    LocalStorage.set('userData',JSON.stringify(user));
}

export const updateNewPassword = (password, userID) => {
    const encryptPassword = encrypt(password);
    fireStoreDB.collection('/users').where('id', '==', userID)
    .get()
    .then(snapshot => {
        if (!snapshot.empty) {
            snapshot.forEach(async (doc) => {
                const ref = fireStoreDB.collection('/users').doc(doc.id);
                await ref.update({ password: encryptPassword });
            });
        }
    });
    const user = JSON.parse(LocalStorage.get('userData'));
    user.password = encryptPassword;
    LocalStorage.set('userData',JSON.stringify(user));
    
}

export const updateNewPhone = (phone, userID) => {
    fireStoreDB.collection('/users').where('id', '==', userID)
        .get()
        .then(snapshot => {
            if (!snapshot.empty) {
                snapshot.forEach(async (doc) => {
                    const ref = fireStoreDB.collection('/users').doc(doc.id);
                    await ref.update({ phone: phone });
                });
            }
        });
    const user = JSON.parse(LocalStorage.get('userData'));
    user.phone = phone;
    LocalStorage.set('userData', JSON.stringify(user));
}
