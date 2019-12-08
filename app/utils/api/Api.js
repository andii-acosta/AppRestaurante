import  * as firebase from 'firebase';


export const reautenticate= (password) => {

    const user = firebase.auth().currentUser;

    const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    );
    return user.reauthenticateWithCredential(credentials);
}


export const validateAutenticate = () => {
    firebase.auth().onAuthStateChanged(userInfo => {
        return userInfo.currentUser;
    });
}