import React, {useReducer} from "react";
import {Store} from "../../logic";
import { Message } from "../Message/Message";
import {useEvt} from "evt/hooks";



export const Messages:React.FunctionComponent<{
    messages: Store["users"][number]["messages"];
    evtMessageSent: Store["evtMessageSent"];

}> = (props)=>{

    const {messages, evtMessageSent} = props;
    const [, forceUpdate] = useReducer(x=>x+1, 0);

    useEvt(ctx=>{
        evtMessageSent.attach(ctx, ()=> forceUpdate());

    },[messages, evtMessageSent])

    return(
        <div className="message-wrapper">
            {
                messages.map((message, index) => 
                    <Message key={index} message={message}/>
                )
            }
        </div>

    )
}