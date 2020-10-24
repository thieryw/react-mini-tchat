import React, {useMemo, useReducer} from "react";
import {Store} from "../../logic";
import {Messages} from "../Messages/Messages";
import {Form} from "../Form/Form";
import {useEvt} from "evt/hooks";



export const User: React.FunctionComponent<{
    user: Store["users"][number];
    store: Store;
}> = (props)=>{

    const {user, store} = props;
    const [, forceUpdate] = useReducer(x=>x+1, 0);

    const contacts = useMemo(()=>{
        const out: Store["users"] = [];

        store.users.forEach(contact =>{
            if(contact === user) return;

            out.push(contact);


        });

        return out;

    },[store, user]);

    useEvt(ctx =>{
        
        store.evtMessageSent.attach(
            data => 
                data.emitter.id === user.id || 
                data.emitter.id === contacts[0].id
            ,
            ctx,
            ()=>forceUpdate()
        );

    },[store]);


    

    return(
        <div className="user">
            <h2>{user.name}</h2>
            
            <Messages 
                user={user} 
            />

            <Form
                emitter={user}
                receiver={contacts[0]}
                store={store}
            />

        </div>
    )
}