import BasePage from "@/components/BasePage";
import axios from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Page(props) {
    const [response, setResponse] = useState(null);

    const send = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        console.log('signin',data);
        axios.post('/api/user/register',data).then(res=>{
            window.localStorage.setItem('loggedIn','true');
            window.dispatchEvent(new Event("storage"));
        }).catch(err=>{
            setResponse(err.response.data.message)
        });
    }

    return <BasePage back="/">
        <h1>Toilet Code</h1>
        <div className='container flex flex-col p-12 self-center w-auto'>
            <h2>Regisztráció</h2>
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
                <input type="password" name="password2" id="password2" placeholder="Jelszó mégegyszer"/>
                <input type="text" name="name" id="name" placeholder="Neved"/>
                <input type="submit" value="Regisztráció" className="button" />
                {!!response && <p className="p-3 text-orange-700">
                    Error: {response}
                </p>}
                <Link href='/login' className="text-center p-4">Bejelentkezés</Link>
            </form>
        </div>
    </BasePage>
}