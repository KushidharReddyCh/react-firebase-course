import {auth,googleProvider} from '../config/firebase-config';
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth';
import { async } from '@firebase/util';
import { useState } from 'react';
export const Auth = () =>{

    const [email,setEmail] = useState("");
    const [password,setPasssword] = useState("");

    console.log(auth?.currentUser?.email);
    console.log(auth?.currentUser?.photoURL);

    const signIn = async()=>{
        // console.log("Cool",email,password);
        try{
            await createUserWithEmailAndPassword(auth,email,password);  
        } catch(err){
            console.log(err);
        }
    }; 

    const signInWithGoogle = async()=>{
        try{
            await signInWithPopup(auth,googleProvider);  
        } catch(err){
            console.log(err);
        }
    }; 


    const logOut = async()=>{
        try{
            await signOut(auth);  
        } catch(err){
            console.log(err);
        }
    }; 


    return( 
        <div>
            <input 
                placeholder="Email..." 
                onChange={(e)=> setEmail(e.target.value)}
            />
            <input 
                placeholder="Password.."
                type = "password"
                onChange={(e)=> setPasssword(e.target.value)}/>
            <button onClick={signIn}>Sign In</button>
            <br></br>            <br></br>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
            <button onClick={logOut}>Log Out </button>
        </div>
    )
}