import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
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