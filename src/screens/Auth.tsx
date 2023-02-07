
import { GoogleLogo, X } from "phosphor-react";
import Habits from '../assets/Habits (i).svg'
import { useContext, useEffect } from "react";
import { AuthContext, AuthGoogleProvider } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { api } from "../lib/axios";


export function SignIn(){
    const {signInGoogle, signed} = useContext(AuthContext)

    async function loginGoogle(){
        await signInGoogle()
    }

    if(!signed) {
    return(

        <div  className='flex-row flex bg-background '>
            <div className=" bg-background w-screen h-screen flex flex-col justify-center items-center " >
                <img src={Habits} alt='Logo' style={{width:200, display:'inline'}} className=""  />
                <h1 className='mt-3 text-2xl text-zinc-400' >
                    Aplicativo de Hábitos
                </h1>
                {/* <strong>{user.displayName}</strong> */}
                <h3 className='mt-2 text-zinc-200 text-sm'>
                    Faça login e comece a usar!
                </h3>
                <button
                    title='ENTRAR COM GOOGLE' className='mt-6 text-white py-4 px-3 flex items-center gap-1 bg-Orange rounded font-semibold to-black text-sm w-72 transition-colors hover:bg-violet-500
                    focus:ring-2 ring-white'
                    onClick={() => loginGoogle()}
                    
                    >
                        <GoogleLogo size={20} className="text-white flex justify-center items-center ml-12" 
                        />
                        ENTRAR COM GOOGLE

                </button>
                <h5 className='text-base text-zinc-500 mt-4 gap-2'>
                    Não utilizamos nenhuma informação além 
                    do seu e-mail para criação de sua conta
                </h5>
            </div>
        </div>
            
    )
    } else {
        return ( 
            // useEffect(() => {
            //     setTimeout(() => {
                    <Navigate to="/Home" />
            //     }, 2000)
            //   }, [])
        
        )
    }
}