import React, {useMemo, useReducer} from "react";
import {Store} from "../../logic";
import {Messages} from "../Messages/Messages";
import {Form} from "../Form/Form";
import {useEvt} from "evt/hooks";
import {Contacts} from "../Contacts/Contacts";
import {same} from "evt/tools/inDepth"


export const User: React.FunctionComponent<{
    user: Store["users"][number];
    store: Store;
    isCurrentUser: boolean;
}> = (props)=>{

    const {user, store, isCurrentUser} = props;
    const [, forceUpdate] = useReducer(x=>x+1, 0);

    const contacts = useMemo(()=>{
        const out: Store["users"] = [];

        store.users.forEach(contact =>{
            if(contact === user) return;

            out.push(contact);


        });

        return out;

    },[store, user]);

    useEvt(ctx=>{
        store.evtInterlocutorChanged.attach(
            data => same(user, data.user),
            ctx,
            ()=> forceUpdate()
        )

    },[store])

 


    

    return(
        <div className={`user ${isCurrentUser ? "current" : ""}`}>
            <div className="contacts">
                {
                    user.interlocutor === undefined ? "" : 
                    <h2>{user.interlocutor.name}</h2>
                }
                <Contacts contacts={contacts} user={user} store={store}/>
            </div>

            <div className="flex-message-and-form">
                <Messages 
                    user={user}
                    store={store}

                />

                <Form

                    user={user}
                    store={store}
                />
                </div> 

        </div>
    )
}