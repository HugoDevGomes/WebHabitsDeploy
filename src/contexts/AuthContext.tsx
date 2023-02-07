import { createContext, ReactNode, useEffect, useState  } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import {  auth } from "../services/firebase";
import { Navigate } from "react-router-dom";
import { api } from "../lib/axios";


const provider = new GoogleAuthProvider()
export const AuthContext = createContext({});

interface Props {
    children: ReactNode
}

export function AuthGoogleProvider ({ children }: Props){
    const authGoogle = auth
    const [user, setUser] = useState<User | null | string>();
    const [token, setIsToken] = useState<string>()
    const [isUserLoading, setIsUserLoading] = useState(false)

    // useEffect(() =>{
    // const LoadStorageData = () => {
    //     const storageUser = sessionStorage.getItem('@AuthFirebase:user');
    //     const storageToken = sessionStorage.getItem('@AuthFirebase:token');
    //     if(storageToken && storageUser) {
    //         setUser(storageUser)
    //     }
    // };
    // LoadStorageData();
    // });

    async function signInGoogle(){
        signInWithPopup(authGoogle, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            setIsToken(token);
            sessionStorage.setItem("AuthFirebase:token", token!);
            sessionStorage.setItem("AuthFirebase:user", JSON.stringify(user));
            

        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            const email = error.email
            const credential = GoogleAuthProvider.credentialFromError(error)
        })
    }

    async function signInWhithGoogle (access_token: string){
        try{
            setIsUserLoading(true);
            const tokenResponse = await api.post('/users', {access_token});
            api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;
            console.log(tokenResponse.data.token)

            const userInfoResponse = await api.get('/me')
            setUser(userInfoResponse.data.user)
             
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setIsUserLoading(false)
        }
    }
    useEffect(() => {
        if (token) {
            signInWhithGoogle(token)
            
        }
    }, [token])


    function signOut() {
        sessionStorage.clear()
        setUser(null)
        return <Navigate to ="/"/>
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                isUserLoading,
                signInGoogle,
                signOut,
            }}>
                {children}
        </AuthContext.Provider>
    )
}




