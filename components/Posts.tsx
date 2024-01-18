import { Location, Post, Reaction } from "@prisma/client";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Comments from "./Comments";


const Posts = ({id}:{id:String|undefined}) => {
    const [list, setList] = useState<Array<Post>|null>(null);
    useEffect(() => {
        if (id)
        axios.get('/api/posts/'+id).then(res=>{
            console.log(res.data);
            setList(res.data);
        })
    }, [id]);

    const send = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {message, code} = Object.fromEntries(new FormData(e.currentTarget));
        axios.post('/api/posts/create',{code,message,locationId:id}).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
            
        });
    }


    if (!list) return 'loading';
    if (list.length==0) return 'Nincsenek feltöltött kódok!'
    return <div>
        {list?.map((e,i)=><div
            key={'komment'+i} className="">
            <h1 className='text-center m-0'>{e.code}</h1>  
            <p>{e.message}</p>
            <p>Értékelése</p>
            
            <div className="overflow-hidden height-200">  
              <Comments id={e?.id} />
            </div>
            </div>)}
            <form onSubmit={send}>
                <h3>Új kód feltöltése</h3>
                <label htmlFor="code">WC KÓD</label>
                <input type="text" name='code' id='code'/><br/>
                <label htmlFor="message">üzenet</label>
                <input type="text" name='message' id='message'/><br/>
                <input type="submit" value="Küldés" />
            </form>
        
    </div>
}

export default Posts;