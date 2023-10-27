import BasePage from "@/components/BasePage";
import Image from "next/image";
import Link from "next/link";
import map from '../assets/map.png'
import { FormEvent, useState } from "react";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";

export default function Page(props) {
    const [response, setResponse] = useState(null);
    const { push } = useRouter();
    const send = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        console.log('signin',data);
        axios.post('/api/user/login',data).then(res=>{
            console.log(res);
            window.localStorage.setItem('loggedIn','true');
            window.dispatchEvent(new Event("storage"));
            push('/map');
            
        }).catch(err=>{
            setResponse(err.response?.data?.message)
        });
    }
    return <BasePage back="/">
        <h1>Toilet Code</h1>
        <div className='container flex flex-col p-12 self-center w-auto'>
            <h2>Bejelentkezés</h2>
            <p>A bejelentkezett felhasználók tudnak:</p>
            <ul className="list-disc ml-8">
                <li>Kommentelni</li>
                <li>Új helyeket létrehozni</li>
                <li>Új kódokat feltölteni</li>
                <li>Kódokat értékelni</li>
            </ul>
            <form onSubmit={send} className='container flex flex-col p-12 self-center w-auto'>    
                <input type="email" name="email" id="email" placeholder="Email-címed"/>
                <input type="password" name="password" id="password" placeholder="Jelszavad"/>
                <button type="submit" className="button" >Bejelentkezés</button>
                {!!response && <p className="p-3 text-orange-700">
                    Error: {response}
                </p>}
                <Link href='/signup' className="text-center p-4">Regisztráció</Link>
            </form>
        </div>
    </BasePage>
}