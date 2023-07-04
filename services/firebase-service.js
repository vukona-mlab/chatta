import { createUserWithEmailAndPassword, EmailAuthCredential, EmailAuthProvider, reauthenticateWithCredential, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, auth, storage } from "../firebaseConfig";


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
        // good coding practices
        const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
        const result = await reauthenticateWithCredential(auth.currentUser, credential)
        console.log(result);
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
        const email = userObject.email
        delete userObject.password
        const docRef = doc(firestore, 'users', auth.currentUser.uid)
        await setDoc(docRef, userObject)
        console.log('success');
        if(password) await setPassword(password)
        if(email) await setEmail(email)
        return { success: true, message: 'User has been updated' }
    } catch (error) {
        console.log(error);
        return error
    }
}
const fetchUserData = async(id) => {
    try {
        const docRef = doc(firestore, 'users', id || auth.currentUser.uid)
        const userData = await getDoc(docRef);
        // console.log(userData.data()); 
        return userData
    } catch (error) {
        console.log(error);
    }
}

const logoutUser = async(callback) => {
    try {
        await signOut(auth)
        console.log('signed out');
        callback()
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
const setEmail = async(email) => {
    try {
        const res = await updateEmail(auth.currentUser, email)
        return { message: 'email successfully reset', success: true}
    } catch (error) {
        return error
    }
}
const requestPasswordReset = async(email) => {
    try {
        await sendPasswordResetEmail(auth, email)
    } catch (error) {
        console.log(error);
    }
}


const requestNewChat = async(email, msg) => {
    // Goal: To send a new request; requires: uid
    // 1. Check if theres a doc with the email provided as an argument
    //    a. IF there is a doc, we need to get the corresponding uid
    //    b. IF there isnt, we need to return a message to the user (email is not registered)
    // 2. With the uid from 1.a we need to check if there's no chats between the two users (request, sending)
    //   a. IF theres a chat: send a message a to user (Already chatting)
    //   b. Request a new chat
    try {

        if(email === auth.currentUser.email) return { message: 'You can not send yourself a request', status: 'failed' }
        //1. Checking if email is registered
        const userCollectionRef = collection(firestore, 'users');
        const userQry = query(userCollectionRef, where('email', '==', email))
        const userSnapshot = await getDocs(userQry)
        let recipientUID;
        for(let i = 0; i < userSnapshot.size; i++) {
            recipientUID = userSnapshot.docs[i].id;
            break;
        }
        if(!recipientUID) return { message: 'Email is not registered', status: 'failed' }

        // 2. Checking for existing chat between request sender and recipient
        const chatCollectionRef = collection(firestore, 'chatRooms');
        const chatQry = query(chatCollectionRef, 
                            where('members', 'array-contains-any', [recipientUID, auth.currentUser.uid]),
                            where('isGroup', '==', false))
        const chatSnapshot = await getDocs(chatQry)
        let alreadyFriends = false
        for(let i = 0; i < chatSnapshot.size; i++) {
            console.log(chatSnapshot.docs[i].data());
            const members = chatSnapshot.docs[i].data().members;
            if(members.includes(recipientUID) && members.includes(auth.currentUser.uid)) {
                alreadyFriends = true;
                break
            }
        }
        console.log(alreadyFriends);
        // console.log('rec: ', recipientUID);
        if(alreadyFriends) return { message: 'Already friends', status: 'failed' }

        // 2.b Send new request
        const chatsRef = doc(firestore, 'users', recipientUID, 'requests', auth.currentUser.uid)
        const requestResult = await setDoc(chatsRef, {
            requestorID: auth.currentUser.uid,
            message: msg,
            time: serverTimestamp(),
            seen: false  
        })
        return requestResult
    } catch (error) {
        console.log(error);
        return error
    }
}

const fetchChatRequests = (callback) => {
    const docRef = doc(firestore, 'users', auth.currentUser.uid);
    const collectionRef = collection(firestore, 'users', auth.currentUser.uid, 'requests')
    return onSnapshot(collectionRef, callback)

}
//fetching ongoing chats last messages
const fetchOngoingChats = (callback) => {
    const collectionRef = collection(firestore, 'chatRooms')
    const qry = query(collectionRef, where('members', 'array-contains', auth.currentUser.uid))
    return onSnapshot(qry, callback)
}
// fetching ongoing chats
const fetchOngoingMessages = (chatID, callback) => {
    const collectionRef = collection(firestore, 'chatRooms', chatID, 'messages')
    const qry = query(collectionRef, orderBy('time', 'desc'))
    return onSnapshot(qry, callback)
}

const deleteRequest = async(senderID) => {
    try {
        const docRef = doc(firestore, 'users', auth.currentUser.uid, 'requests', senderID)
        await deleteDoc(docRef)
        return { message: 'succes' }
    } catch (error) {
        console.log(error);
        return error
    }

}
const acceptRequest = async(data) => {
    try {
        const collectionRef = collection(firestore, 'chatRooms');
        const docRef = doc(collectionRef)
        const res =  await setDoc(docRef, {
            lastMessage: {
                time: data.time,
                type: 'text',
                sender: data.requestorID,
                status: 'read',
                message: data.message
            },
            members: [
                data.requestorID,
                auth.currentUser.uid
            ],
            time: data.time,
            isGroup: false
        });
    
        // Add the message to messages
    
        const messageCollectionRef = collection(firestore, 'chatRooms', docRef.id, 'messages');
        await addDoc(messageCollectionRef, {
            sender: data.requestorID,
            message: data.message,
            status: 'read',
            type: 'text',
            starred: false,
            time: data.time
        })
    
        // delete the request
        await deleteRequest(data.requestorID)
        return { message: 'success' }
    } catch (error) {
        console.log(error);
        return error
    }


}

const sendPlainText = async(chatRoomID, text) => {
    console.log('Sending text');
    try {
        const collectionRef = collection(firestore, 'chatRooms', chatRoomID, 'messages')
        const messageObject = {
            message: text,
            sender: auth.currentUser.uid,
            type: 'text',
            time: serverTimestamp(),
            status: 'sent'
        }
        addDoc(collectionRef, {
            ...messageObject, starred: false
        })

        const docRef = doc(firestore, 'chatRooms', chatRoomID)
        updateDoc(docRef, {
            lastMessage: messageObject,
            time: messageObject.time
        })
        return { success: true, message: 'Message successfully sent' }
    } catch (error) {
        console.log(error);
        return { success: false, message: error }
    }
}

const checkAuthState = () => auth?.currentUser?.uid

// registerUser('vukona@mlab.co.za', 'Vukona', '12345678', '12345678')
// loginUser('vukona@mlab.co.za', '12345678')
// updateUser({ name: 'Vukona', age: 40, password: 'g$dW12345' })
// setPassword('gad32349ei')
// logoutUser()
// fetchUserData()
// requestNewChat('vukona@mlab.co.za', 'Hi there')
export {
    loginUser,
    fetchChatRequests,
    fetchOngoingChats,
    fetchOngoingMessages,
    registerUser,
    updateUser,
    fetchUserData,
    loginUserInternal,
    requestPasswordReset,
    logoutUser,
    requestNewChat,
    checkAuthState,
    deleteRequest,
    acceptRequest,
    sendPlainText
}