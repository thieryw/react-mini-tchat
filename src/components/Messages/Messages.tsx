import React, {useReducer} from "react";
import {Store} from "../../logic";
import { Message } from "./Message";
import {useEvt} from "evt/hooks";



export const Messages:React.FunctionComponent<{
    user: Store["users"][number];
    store: Pick<Store,
        "evtMessageSent"
    >

}> = (props)=>{

    const {user, store} = props;
    const [, forceUpdate] = useReducer(x=>x+1, 0);


    useEvt(ctx=>{

        store.evtMessageSent.attach(
            data => data.user.id === user.id || data.user.interlocutor?.id === user.id,
            ctx,
            ()=> forceUpdate()
        );

    },[store]);




    return(
        <div className="message-wrapper">
            <h2>Messages</h2>
            <div className="messages">
                {
                    user.messages.map((message, index) => 
                        <Message key={index} message={message}/>
                    ).reverse()
                }
            </div>

        </div>

    )

}