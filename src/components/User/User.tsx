import React from "react";
import {Store} from "../../logic";
import {Messages} from "../Messages/Messages"



export const User: React.FunctionComponent<{
    user: Store["users"][number];
    store: Pick<Store,
        "sendMessage" |
        "evtMessageSent"
    >;
}> = (props)=>{

    const {user, store} = props;


    

    return(
        <div className="user">
            <h2>User {user.name}</h2>
            
            <Messages 
                evtMessageSent={store.evtMessageSent} 
                messages={user.messages} 
            />

        </div>
    )
}