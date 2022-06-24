import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth,db } from "./firebaseConfig";

import { notification } from 'antd';

export const openNotification = (info, kind) => {
    if(kind==='success'){
        notification.success({
            message: `Welcome `,
            description:`${info.email}`
        });
    }else{
        notification.error({
            message: `${info.code}`,
            description:`${info.message}`
        });
    }
};

export const logIn = (email, password) => signInWithEmailAndPassword(auth, email, password)

export const exit =()=>signOut(auth)

export const getRol = async(uid)=>{
    const docRef = doc(db, "procfile", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
    return docSnap.data()
    } else {
    console.log("No such document!");
    }
}