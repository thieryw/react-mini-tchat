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

    >

}> = (props)=>{


    const {user, store} = props;
    const [isComponentHidden, setIsComponentHidden] = useState(false);
    const [, forceUpdate] = useReducer(x=>x+1, 0);

    const asyncSelectInterlocutor = useAsyncCallback(store.selectInterlocutor);

    const asyncNewConversation = useAsyncCallback(store.newConversation);

    useEvt(ctx =>{
        store.evtInterlocutorSelected.attach(
            data => same(data.user, user),
            ctx,
            ()=> forceUpdate()
        );

        store.evtConversationStarted.attach(
            _user => same(_user, user),
            ctx,
            ()=> forceUpdate()
        )


    }, [store, user]);



    return(
        <div className={`contacts ${isComponentHidden ? "hidden" : ""}`}>
            <h2>Contacts</h2>
            <em>{user.contacts.length} contacts</em>
            {
                user.contacts.map(
                    contact=> 
                    <p 
                        onClick={
                            useCallback(()=> asyncSelectInterlocutor.execute({user, contact}),[store, user])
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