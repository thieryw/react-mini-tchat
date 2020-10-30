import React, {useCallback, useState, useReducer} from "react";
import {Store} from "../../logic";
import {useAsyncCallback} from "react-async-hook";
import {useEvt} from "evt/hooks";
import {same} from "evt/tools/inDepth";
import {Evt} from "evt";




export const Contacts: React.FunctionComponent<{
    user: Store["users"][number];
    store: Pick<Store,
        "evtInterlocutorSelected" |
        "newConversation" |
        "selectInterlocutor" |
        "unselectInterlocutor" |
        "evtInterlocutorUnselected"

    >;

    isComponentVisible: boolean;

}> = (props)=>{


    const {user, store, isComponentVisible} = props;
    const [, forceUpdate] = useReducer(x=>x+1, 0);


    const asyncNewConversation = useAsyncCallback(store.newConversation);

    useEvt(ctx =>{

        Evt.merge(ctx, [store.evtInterlocutorSelected, store.evtInterlocutorUnselected]).attach(
            data => same(user, data.user),
            ()=> forceUpdate()
        )

    }, [store, user]);



    return(
        <div className={`contacts ${isComponentVisible ? "" : "hidden"}`}>
            <h2>Contacts</h2>
            <h3>{user.interlocutors.map(interlocutor => `${interlocutor.name}, `)}</h3>
            <em>{user.contacts.length} contacts</em>
            {
                user.contacts.map(
                    (contact, index)=> 
                            <Contact 
                                store={store} 
                                contact={contact} 
                                user={user}
                                key={index}
                            />

                )
                
            }

            <input 
                disabled={user.interlocutors.length === 0} 
                type="button" 
                value=">"
                onClick={
                    useCallback(()=>
                        asyncNewConversation.execute(user)
                    , [user, asyncNewConversation])

                }
            />





        </div>
    )
}

const Contact: React.FunctionComponent<{
    contact: Store["users"][number]["contacts"][number];
    user: Store["users"][number];
    store: Pick<Store,
        "selectInterlocutor" |
        "evtInterlocutorSelected"|
        "unselectInterlocutor" |
        "evtInterlocutorUnselected"

    >
}> = (props)=>{

    const {contact, user, store} = props;
    const [isSelected, setIsSelected] = useState(false);
    const asyncSelectInterlocutor = useAsyncCallback(store.selectInterlocutor);
    const asyncUnselectInterlocutor = useAsyncCallback(store.unselectInterlocutor);

    const handleClick = useCallback(()=>{
        if(isSelected){
            asyncUnselectInterlocutor.execute({user, contact});
            return;
        }

        asyncSelectInterlocutor.execute({user, contact});

    }, [isSelected, contact, user, asyncUnselectInterlocutor, asyncSelectInterlocutor]);

    useEvt(ctx=>{

        Evt.merge(ctx, [store.evtInterlocutorSelected, store.evtInterlocutorUnselected]).attach(
            data => same(user, data.user) && same(contact, data.contact),
            ()=> setIsSelected(!isSelected)
        );

    },[contact, user, store, isSelected])

    return(
        <div onClick={handleClick}>

            <p>{contact.name}</p>


        </div>

    )

}