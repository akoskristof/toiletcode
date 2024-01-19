import { Location, Post, Reaction } from "@prisma/client";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Comments from "./Comments";


const Posts = ({id}:{id:String|undefined}) => {
    const [list, setList] = useState<Array<Post>|null>(null);
    
    const [newCode, setNewCode] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [selected, setSelected] = useState(0);

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
        axios.post('/api/posts/create/',{code,message,locationId:id}).then(res=>{
            console.log(res);
            setList([...list,{code:newCode,message:newMessage}])
            setNewCode('');
            setNewMessage('');
        }).catch(err=>{
            console.log(err);
            
        });
    }


    if (!list) return 'loading';
    return <div style={{display:'grid'}}>
        {list?.map((e,i)=>{return<div
            key={'komment'+i} className="">
            
            {selected==i && <h1 className='text-center m-0 code' >{e.code}</h1>}  
            {selected==i && <div>
                
                <p>{e.message}</p>
                <div className="overflow-hidden height-200">
                  <Comments id={e?.id} />
                </div>
            </div>}
            </div>})
        }
        <p className="button"
            onClick={()=>{
                if (selected < list.length-1)
                setSelected(selected+1)
                else setSelected(0)
            }}>Másik kódot kérek!</p>
        {list.length == 0 && <h3 style={{fontWeight:'bold'}}>Nincsenek feltöltött kódok.</h3>}
        
            <form onSubmit={send}>
                <h3>Új kód feltöltése</h3>
                <label htmlFor="code">WC KÓD</label>
                <input type="text" name='code' id='code' value={newCode} onChange={(e)=>setNewCode(e.target.value)}/><br/>
                <label htmlFor="message">üzenet</label>
                <input type="text" name='message' id='message' value={newMessage} onChange={(e)=>setNewMessage(e.target.value)}/><br/>
                <input type="submit" value="Küldés" className="button" />
            </form>
    </div>
}

export default Posts;