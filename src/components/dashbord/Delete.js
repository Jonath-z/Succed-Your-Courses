import { realTimeDB, fireStoreDB } from "../modules/firebase";

export const DeleteModuleFromRealTimeDB = (courseID) => {
    realTimeDB.ref('/modules').child(courseID).remove();
}

export const DeleteModuleFormUserCollectionfireStoreDB = (courseID) => {
    fireStoreDB.collection('users')
        .get()
        .then(snapshot => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    if (doc.data().courses.indexOf(courseID !== -1)) {
                        doc.data().courses.filter((id) => id !== courseID );
                        fireStoreDB.collection('users').add(doc.data());
                    }
                })
            }
        });
}

export const DeleteModuleDocumentFromFireStore = (courseID) => {
    fireStoreDB.collection('module-doc').where("moduleID", "==", `${courseID}`)
        .get()
        .then(snapshot => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    doc.ref.delete();
                })
            }
        });
}