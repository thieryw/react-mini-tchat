import React, {useMemo, useReducer} from "react";
import {Store} from "../../logic";
import {Messages} from "../Messages/Messages";
import {Form} from "../Form/Form";
import {useEvt} from "evt/hooks";
import {Contacts} from "../Contacts/Contacts";
import {same} from "evt/tools/inDepth"
import {useAsyncCallback} from "react-async-hook";
import {Spinner} from "../Spinner";


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


    const asyncChangeInterlocutor = useAsyncCallback(store.changeInterlocutor);
 
    
    const asyncSendMessage = useAsyncCallback(store.sendMessage);

    

    return(
        <div className={`user ${isCurrentUser ? "current" : ""}`}>
            <div className="contacts">
                {
                    user.interlocutor === undefined ? "" : 

                    (
                        asyncChangeInterlocutor.loading ? <h2><Spinner /></h2> : 

                        <h2>{user.interlocutor.name}</h2>
                    )
                        
                }
                <Contacts 
                    contacts={contacts} 
                    user={user} 
                    asyncChangeInterlocutor={asyncChangeInterlocutor}
                />
            </div>

            <div className="flex-message-and-form">
                <Messages 
                    user={user}
                    store={store}
                    isMessageLoading={asyncSendMessage.loading}

                />

                <Form

                    user={user}
                    asyncSendMessage={asyncSendMessage}
                />
                </div> 

        </div>
    )
}