import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore, auth } from "../firebaseConfig";


const loginUser = async(email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log(res.user.uid);
        return { message: 'User successfully signed in', success: true }
    } catch (error) {
        console.log(error);
        return error
    }
}
const loginUserInternal = async(password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, auth.currentUser.email, password);
        console.log(res.user.uid);
        return { message: 'User successfully signed in', success: true }
    } catch (error) {
        console.log(error);
        return error
    }
}

const registerUser = async(email, username, password, confirmPassword) => {
    if(password != confirmPassword) return { message: 'Passwords do not match' }
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        const docRef = doc(firestore, 'users', userCredentials.user.uid)
        await setDoc(docRef, { name: username, uid: userCredentials.user.uid })
        return { message: 'User successfully registered', success: true }
    } catch (error) {
        console.log(error);
        return error
    }

}
const updateUser = async(userObject) => {
    try {
        // console.log(auth.currentUser);
        const password = userObject.password
        delete userObject.password
        const docRef = doc(firestore, 'users', auth.currentUser.uid)
        await setDoc(docRef, userObject)
        console.log('success');
        if(password) await setPassword(password)
        return { success: true, message: 'User has been updated' }
    } catch (error) {
        console.log(error);
        return error
    }
}
const fetchUserData = async() => {
    try {
        const docRef = doc(firestore, 'users', auth.currentUser.uid)
        const userData = await getDoc(docRef);
        console.log(userData.data()); 
    } catch (error) {
        console.log(error);
    }
}

const logoutUser = async() => {
    try {
        await signOut(auth)
        console.log('signed out');
    } catch (error) {
        console.log(error);
    }
}
const setPassword = async(password) => {
    try {
        await updatePassword(auth.currentUser, password)
        // console.log('success');
    } catch (error) {
        console.log(error);
        return { ...error, success: 'false' }
    }
}
const requestPasswordReset = async(email) => {
    try {
        await sendPasswordResetEmail(auth, email)
    } catch (error) {
        console.log(error);
    }
}

// registerUser('vukona@mlab.co.za', 'Vukona', '12345678', '12345678')
// loginUser('vukona@mlab.co.za', '12345678')
// updateUser({ name: 'Vukona', age: 40, password: 'g$dW12345' })
// setPassword('gad32349ei')
// logoutUser()
// fetchUserData()

export { loginUser, registerUser, updateUser, loginUserInternal, requestPasswordReset, logoutUser }