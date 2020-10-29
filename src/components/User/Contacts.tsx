import React, {useCallback, useState, useReducer} from "react";
import {Store} from "../../logic";
import {useAsyncCallback} from "react-async-hook";
import {useEvt} from "evt/hooks";
import {same} from "evt/tools/inDepth";




export const Contacts: React.FunctionComponent<{
    user: Store["users"][number];
    store: Pick<Store,
        "selectInterlocutor" |
        "evtInterlocutorSelected" |
        "newConversation" |
        "evtConversationStarted"

    >;

    isComponentVisible: boolean;

}> = (props)=>{


    const {user, store, isComponentVisible} = props;
    const [, forceUpdate] = useReducer(x=>x+1, 0);

    const asyncSelectInterlocutor = useAsyncCallback(store.selectInterlocutor);

    const asyncNewConversation = useAsyncCallback(store.newConversation);

    useEvt(ctx =>{
        store.evtInterlocutorSelected.attach(
            data => same(data.user, user),
            ctx,
            ()=> forceUpdate()
        );

    }, [store, user]);



    return(
        <div className={`contacts ${isComponentVisible ? "" : "hidden"}`}>
            <h2>Contacts</h2>
            <em>{user.contacts.length} contacts</em>
            {
                user.contacts.map(
                    (contact, index)=> 
                    <p 
                        key={index}
                        onClick={
                            ()=> asyncSelectInterlocutor.execute({user, contact})
                        }>{contact.name}
                    </p>
                )
                
            }

            <input 
                disabled={user.interlocutors.length === 0} 
                type="button" 
                value=">"
                onClick={
                    useCallback(()=>
                        asyncNewConversation.execute(user)
                    , [store, user])

                }
            />





        </div>
    )
}