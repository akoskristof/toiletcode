import { Reaction } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import like from "../assets/like.svg";
import liked from "../assets/liked.svg";
import dislike from "../assets/dislike.svg";
import disliked from "../assets/disliked.svg";

const Comments = ({id}:{id:String|undefined}) => {
    const [list, setList] = useState<Array<Reaction>|null>(null);
    const [liked_disliked, setLiked_disliked] = useState("none");
    useEffect(() => {
        if (id)
        axios.get('/api/reactions/'+id).then(res=>{
            setList(res.data);
            res.data.map((e:Reaction)=>{
                if (e.userId=='clnxbcnoz0003w5vf6em3rbmy')
                    setLiked_disliked(e.like_dislike?'liked':'disliked')
            })
        })
    }, [id]);


    const rate = (rate:boolean) => {
        axios.post('api/reactions/create',{
            postId:id,
            like_dislike: rate,
            comment: ''
        }).then(res=>{
            setLiked_disliked(rate?"liked":"disliked")
        })
    }
    if (!list) return 'loading';
    if (list.length==0) return 'Nincsenek kommentek'
    return <div>

            <div className="flex flex-row justify-center align-center">
                <h1>{list.reduce(
                    (accumulator, e) => e.like_dislike?(accumulator + 1):accumulator,0
                )}</h1>
                <Image src={liked_disliked=='liked'?liked:like} alt="" className="icon" onClick={()=>rate(true)}/>
                <Image src={liked_disliked=='disliked'?disliked:dislike} alt="" className="icon" onClick={()=>rate(false)}/>
                <h1>{list.reduce(
                    (accumulator, e) => e.like_dislike?accumulator:(accumulator + 1),0
                )}</h1>
            </div>
            <p className="pl-3">Kommentek:</p>
        {list?.map((e,i)=> {
        console.log(e);
        
        return (<div
            key={'komment'+i} className="p-2 m-2 bg-slate-200	">
              <p><b>{e.userId}</b></p>
              <span>{e.comment}</span>
            </div>)
        }
        )}

        
    </div>
}

export default Comments;