import BasePage from "@/components/BasePage";
import Image from "next/image";
import Link from "next/link";
import map from '../assets/map.png'
import { FormEvent } from "react";
import axios from "axios";

export default function Page() {
    const send = (e:FormEvent) => {
        e.preventDefault();
        console.log('signin');
        
        axios.post('user/login',e.currentTarget);
    }
    return <BasePage back="/">
        <h1>Toilet Code</h1>
        <div className='container flex flex-col p-12 self-center w-auto'>
            <p>Jelentkezz be, hogy részt tudj venni!</p>
            <ul className="list-disc ml-8">
                <li>Kommentelés</li>
                <li>Új helyek létrehozása</li>
                <li>Új kódok feltöltése</li>
                <li>Kódok értékelése</li>
            </ul>
            <form onSubmit={send}>    
                <input type="email" name="email" id="email" placeholder="Email-címed"/>
                <input type="password" name="pass" id="pass" placeholder="Jelszavad"/>
                <input type="submit" value="Bejelentkezés" className="button" />
            </form>
        </div>
    </BasePage>
}