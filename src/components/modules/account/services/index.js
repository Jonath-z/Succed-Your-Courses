import { fireStoreDB,storageDB,realTimeDB } from "../../../services/firebase";
import encrypt from "../../Auth-user/signup/services/uploadForm/encrypt";
import { LocalStorage } from "../../../helper/localStorage";
import uuid from "react-uuid";

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

export const uploadPayement = (amount, payementProof, user) => {
    const id = uuid();
    let ref = storageDB.ref('/Payement').child(`/payement_${Date.now()}`);
    const file = payementProof;
    ref.put(file).then((snapshot) => {
        const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        snapshot.ref.getDownloadURL().then(url => {
            realTimeDB.ref('/request').child(id).set({
                id: id,
                amout: amount,
                payementProof: url,
                user: {
                    name: user.name,
                    email: user.email
                }
            });
            return uploadProgress;
        });
    });       
}

export const deleteAccount = (user) => {
    fireStoreDB.collection('/users').where('id', '==', user.id)
    .get()
    .then(snapshot => {
        if (!snapshot.empty) {
            snapshot.forEach(async (doc) => {
                const ref = fireStoreDB.collection('/users').doc(doc.id);
                await ref.delete();
            });
        }
    });
    LocalStorage.clear();
}

