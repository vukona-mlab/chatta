import { auth, firestore } from '../firebaseConfig.js'
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, } from 'firebase/auth'
import { doc, collection, query, setDoc, where, getDocs, serverTimestamp, orderBy, deleteDoc, updateDoc, addDoc, onSnapshot } from 'firebase/firestore';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
// import { }

const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(userCred => {
            console.log(userCred);
        })
        .catch(error => {
            console.log(error.messasge);
        })
}
const registerUser = (email, name, password, confirmPassword) => {
    if(password != confirmPassword) return {
        message: "Passwords don't match"
    }
    createUserWithEmailAndPassword(auth, email, password)
        .then(async userCred => {
            console.log(userCred);
            try {
                const docRef = doc(firestore, users, userCred.user.uid)
                await setDoc(docRef, { name: name, uid: uid })
            } catch (error) {
                console.log(error);
            }

        })
        .catch(error => {
            console.log(error.message);
        })
}
const updateUser = async(data) => {
    try {
        const docRef = doc(firestore, 'users', userCred.user.uid)
        await setDoc(docRef, data)
    } catch (error) {
        console.log(error);
    }
}
const sendRequest = async(email, message) => {
    try {
        const methods = await fetchSignInMethodsForEmail(auth, email)
        console.log(methods);
        let uid
        const collectionRef = collection(firestore, 'users')
        console.log('we in');
        const qry = query(collectionRef, where("email", '==', email))
        const qrySnapshot = await getDocs(qry)
        qrySnapshot.forEach(doc => {
            console.log(doc.data());
            uid = doc.data().uid
        })
        const docRef = doc(firestore, 'users', uid, 'requests', auth.currentUser.uid)
        // const currentUserUID = CurrentUser(auth)
        
        await setDoc(docRef, {
            requestor: auth.currentUser.uid,
            message: message,
            time: serverTimestamp(),
            seen: false
        })
        
    } catch (error) {
        console.log(error);
    }

}

const deleteRequest = async(requestorID, receiverID) => {
    try {
        const docRef = doc(firestore, 'users', receiverID, 'requests', requestorID)
        await deleteDoc(docRef)
    } catch (error) {
        
    }

}

const acceptRequest = async(requestorID, receiverID, timeStamp, message) => {
    try {
        const collectionRef = collection(firestore, 'chatRooms')
        const newChatroomDocRef = doc(collectionRef)
        const roomID = newChatroomDocRef.id
        const chatResult = await setDoc(newChatroomDocRef, {
            lastMessage: {
                timeStamp: timeStamp,
                message: message,
                sender: requestorID,
            },
            members: [receiverID, requestorID],
            isGroup: false,
        })
    
        const messageCollectionRef = collection(firestore, 'chatRooms', roomID, 'messages')
        const messageResult = await addDoc(messageCollectionRef, {
            sender: requestorID,
            message: message,
            status: 'read',
            type: 'text',
            starred: false,
            timeStamp: timeStamp
        })
        chatResult.then(res => {
            console.log(res);
        })

        console.log( messageResult);
        await deleteRequest(requestorID, receiverID)
        return {
            message: 'Request successsfully accepted'
        }
    } catch (error) {
        return {
            message: error.message ? error.message : 'error'
        }
    }

}

const declineRequest = async(requestorID, receiverID) => {
    try {
        const docRef = doc(firestore, 'users', receiverID, 'requests', requestorID)
        await updateDoc(docRef, {
            status: 'declined'
        })
    } catch (error) {
        
    }
}
const sentRequests = () => {

}
const getReceivedRequests = async() => {
    const collectionRef = collection(firestore, 'users', auth.currentUser.uid, 'requests');
    const q = query(collectionRef, orderBy('time'))
    const qrySnapshot = await getDocs(q)
    qrySnapshot.forEach(doc => {
        console.log(doc.data());
    })
}

const fetchChatroomMessages = async(chatroomID) => {
    try {
        console.log('run');
        const collectionRef = collection(firestore, 'chatRooms', chatroomID, 'messages')
        const qry = query(collectionRef, orderBy('timeStamp', 'desc'));
        // const qrySnapshot = await getDocs(qry)
        // qrySnapshot.forEach(doc => {
        //     console.log(doc.data());
        // })


        const unsub = onSnapshot(qry, snapshot => {
            snapshot.forEach(doc => 
                console.log(doc.data()))
        })
    } catch (error) {
        console.log(error);
    }


}
const fetchLastMessages = async() => {
    try {
        console.log('runn');
        const collectionRef = collection(firestore, 'chatRooms');
        const q = query(collectionRef, where('members', 'array-contains', auth.currentUser.uid), orderBy('timeStamp', 'desc'))
        const qrySnapshot = await getDocs(q)
        qrySnapshot.forEach(doc => {
            console.log(doc.data());
        })
    } catch (error) {
        console.log(error);
    }

}

const deleteMessage = async(chatroomID, messageID) => {
    try {
        const docRef = doc(firestore, 'chatRooms', chatroomID, 'messages', messageID)
        await deleteDoc(docRef)
    } catch (error) {
        console.log(error);
    }
}

const sendAudio = async(file, chatroomID) => {
    try {
        const storageRef = ref(storage, 'audio/' + file.name)
        uploadBytes(storageRef, file).then(res => {
            console.log(res);
        }).catch(err => console.log(err))

        const audioUrl = await getDownloadURL(storageRef)
        const chatroomDocRef = doc(firestore, 'chatRooms', chatroomID)
        const timeStamp = serverTimestamp
        const chatResult = await setDoc(chatroomDocRef, {
            lastMessage: {
                timeStamp: timeStamp,
                url: audioUrl,
                sender: requestorID,
                type: 'image'
            },
            members: [receiverID, requestorID],
            isGroup: false,
        })
    
        
        // const 
        const messageCollectionRef = collection(firestore, 'chatRooms', roomID, 'messages')
        const messageResult = await addDoc(messageCollectionRef, {
            sender: requestorID,
            message: message,
            status: 'sent',
            type: 'image',
            starred: false,
            timeStamp: timeStamp
        })
    } catch (error) {
        
    }
}

const sendImage = async(file) => {
    try {
        const storageRef = ref(storage, 'images/' + file.name)
        uploadBytes(storageRef, file).then(res => {
            console.log(res);
        }).catch(err => console.log(err))

        const imageUrl = await getDownloadURL(storageRef)
        const chatroomDocRef = doc(firestore, 'chatRooms', chatroomID)
        const timeStamp = serverTimestamp
        const chatResult = await setDoc(chatroomDocRef, {
            lastMessage: {
                timeStamp: timeStamp,
                url: imageUrl,
                sender: requestorID,
                type: 'image'
            },
            members: [receiverID, requestorID],
            isGroup: false,
        })
    
        
        // const 
        const messageCollectionRef = collection(firestore, 'chatRooms', roomID, 'messages')
        const messageResult = await addDoc(messageCollectionRef, {
            sender: requestorID,
            message: message,
            status: 'sent',
            type: 'image',
            starred: false,
            timeStamp: timeStamp
        })
    } catch (error) {
        
    }
}
const sendGif = async(link, chatroomID) => {
    try {
        const chatroomDocRef = doc(firestore, 'chatRooms', chatroomID)
        const chatResult = await setDoc(chatroomDocRef, {
            lastMessage: {
                timeStamp: timeStamp,
                url: link,
                sender: requestorID,
                type: 'gif'
            },
            members: [receiverID, requestorID],
            isGroup: false,
        })
    
        
        // const 
        const messageCollectionRef = collection(firestore, 'chatRooms', roomID, 'messages')
        const messageResult = await addDoc(messageCollectionRef, {
            sender: requestorID,
            message: message,
            status: 'read',
            type: 'gif',
            starred: false,
            timeStamp: timeStamp
        })
    
        
    } catch (error) {
        
    }
}

const sendText = async(text, chatroomID) => {
    try {
        const chatroomDocRef = doc(firestore, 'chatRooms', chatroomID)
        const chatResult = await setDoc(chatroomDocRef, {
            lastMessage: {
                timeStamp: timeStamp,
                message: text,
                sender: requestorID,
                type: 'text'
            },
            members: [receiverID, requestorID],
            isGroup: false,
        })
    
        
        // const 
        const messageCollectionRef = collection(firestore, 'chatRooms', roomID, 'messages')
        const messageResult = await addDoc(messageCollectionRef, {
            sender: requestorID,
            message: message,
            status: 'read',
            type: 'text',
            starred: false,
            timeStamp: timeStamp
        })
    
        
    } catch (error) {
        console.log(error);
    }
}


const markChatAsFavorite = async(chatroomID, starred) => {
    try {
        starred.map((s, index) => {
            console.log(s, index);
            if(s.userID === auth.currentUser.uid)
                starred[index] = { userID: 'Nut6ue20H3bFIkY1gceKd6RuRp92', starred: true }
            console.log(index);
        })
        const docRef = doc(firestore, 'chatRooms', chatroomID)
        await updateDoc(docRef, { starred })
    } catch (error) {
        console.log(error);
    }
}

const unmarkChatAsFavorite = async(chatroomID, starred) => {
    try {
        starred.map((s, index) => {
            console.log(s, index);
            if(s.userID === auth.currentUser.uid)
                starred[index] = { userID: 'Nut6ue20H3bFIkY1gceKd6RuRp92', starred: false }
            console.log(index);
        })
        const docRef = doc(firestore, 'chatRooms', chatroomID)
        await updateDoc(docRef, { starred })
    } catch (error) {
        console.log(error);
    }
}

// loginUser('vukona@mlab.co.za', '12345678')
// sendRequest('vukona@mlab.co.za', 'Hi there')
// getReceivedRequests()
// deleteRequest("Nut6ue20H3bFIkY1gceKd6RuRp92", auth.currentUser.uid)
// acceptRequest('asdfas', 'asdfasf', 'asdfas', 'Hey you, wanna bowl together?')
// fetchLastMessages()
// fetchChatroomMessages('DhWLLNckPf4IY13cMwUR')
// deleteMessage('9svvzmmkBdpgI0iYIQCh', 'MgJBJAYrjqwoYPrBsVWx')
markChatAsFavorite('DhWLLNckPf4IY13cMwUR', [
        {userID: 'Nut6ue20H3bFIkY1gceKd6RuRp92', starred: true }, {userID: 'asdfsdf', starred: false}
    ])
// unmarkChatAsFavorite('DhWLLNckPf4IY13cMwUR', [
//     {userID: 'Nut6ue20H3bFIkY1gceKd6RuRp92', starred: true }, {userID: 'asdfsdf', starred: false}
// ])

export { loginUser, registerUser, sendRequest, deleteRequest, acceptRequest, declineRequest, sendAudio, sendImage, sendText, markChatAsFavorite, unmarkChatAsFavorite }