import React from "react";
import {Store} from "../../logic";
import { Message } from "../Message/Message";



export const Messages:React.FunctionComponent<{
    user: Store["users"][number];

}> = (props)=>{

    const {user} = props;



    return(
        <div className="message-wrapper">
            {
                user.messages.map((message, index) => 
                    <Message key={index} message={message}/>
                ).reverse()
            }
        </div>

    )
}