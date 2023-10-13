import BasePage from "@/components/BasePage";
import axios from "axios";
import { FormEvent } from "react";

export default function Page() {

    const send = (e:FormEvent) => {
        e.preventDefault();
        console.log('signin');
        
        axios.post('user/signin',e.currentTarget);
    }

    return <BasePage back="/">
        <h1>Toilet Code</h1>
        <div className='container flex flex-col p-12 self-center w-auto'>
            <p>Regisztrálj be, hogy részt tudj venni!</p>
            <ul className="list-disc ml-8">
                <li>Kommentelés</li>
                <li>Új helyek létrehozása</li>
                <li>Új kódok feltöltése</li>
                <li>Kódok értékelése</li>
            </ul>
            <form onSubmit={send}>
                <input type="email" name="email" id="email" placeholder="Email-címed"/>
                <input type="password" name="pass" id="pass" placeholder="Jelszavad"/>
                <input type="text" name="name" id="name" placeholder="Neved"/>
                <input type="submit" value="Regisztráció" className="button" />
            </form>
        </div>
    </BasePage>
}