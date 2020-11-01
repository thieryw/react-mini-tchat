import React, {useCallback, useState, useReducer} from "react";
import {Store} from "../../logic";
import {useAsyncCallback, UseAsyncReturn} from "react-async-hook";
import {useEvt} from "evt/hooks";
import {same} from "evt/tools/inDepth";
import {Evt} from "evt";
import "./Contacts.scss";




export const Contacts: React.FunctionComponent<{
    user: Store["users"][number];
    store: Pick<Store,
        "evtInterlocutorSelected" |
        "newConversation" |
        "selectInterlocutor" |
        "unselectInterlocutor" |
        "evtInterlocutorUnselected" |
        "emptyInterlocutors" |
        "evtInterlocutorsEmptied" |
        "evtConversationStarted"

    >;

    isComponentVisible: boolean;

}> = (props)=>{


    const {user, store, isComponentVisible} = props;
    const [, forceUpdate] = useReducer(x=>x+1, 0);
    


    const asyncNewConversation = useAsyncCallback(store.newConversation);
    const asyncEmptyInterlocutor = useAsyncCallback(store.emptyInterlocutors);
    const asyncSelectInterlocutor = useAsyncCallback(store.selectInterlocutor);
    const asyncUnselectInterlocutor = useAsyncCallback(store.unselectInterlocutor);
    useEvt(ctx =>{

        Evt.merge(ctx, [store.evtInterlocutorSelected, store.evtInterlocutorUnselected]).attach(
            data => same(user, data.user),
            ()=> forceUpdate()
        );

        
        

    }, [store, user]);




    const backToConversation = useCallback(()=>{
        
        asyncEmptyInterlocutor.execute(user);

    },[asyncEmptyInterlocutor, user])

    



    return(
        <div 
            className="contacts"
            style={
                {
                    height: isComponentVisible && 
                    !asyncEmptyInterlocutor.loading &&
                    !asyncNewConversation.loading ?
                    "100%" : "0%",
                }
            }
        >
            <header>
                <input 
                    type="button" 
                    value="<"
                    style={
                        {color: asyncEmptyInterlocutor.loading
                            || 
                        asyncNewConversation.loading ? "grey" : "greenyellow"}
                    }
                    disabled={asyncEmptyInterlocutor.loading}
                    onClick={backToConversation}
                />
                <div>
                    <h2>Contacts</h2>
                    {
                        asyncSelectInterlocutor.loading ||
                        asyncUnselectInterlocutor.loading ?
                        <em className="loading">Loading...</em> : 
                        <em>{user.interlocutors.map(interlocutor => `${interlocutor.name}, `)}</em>
                    }
                    

                </div>


            </header>
            <em>{user.contacts.length} contacts</em>

            <section>
                {
                    user.contacts.map(
                        (contact, index)=> 
                                <Contact 
                                    store={store} 
                                    contact={contact} 
                                    user={user}
                                    asyncSelectInterlocutor={asyncSelectInterlocutor}
                                    asyncUnselectInterlocutor={asyncUnselectInterlocutor}
                                    key={index}
                                />

                    )
                    
                }
            </section>



            <input 
                disabled={user.interlocutors.length === 0} 
                className={user.interlocutors.length === 0 ? "disabled" : ""}
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
        "evtInterlocutorUnselected" |
        "evtInterlocutorsEmptied" |
        "evtConversationStarted"

    >

    asyncSelectInterlocutor: UseAsyncReturn<void, [{
        user: Store["users"][number];
        contact: Store["users"][number];
    }]>

    asyncUnselectInterlocutor: UseAsyncReturn<void, [{
        user: Store["users"][number];
        contact: Store["users"][number];
    }]>

}> = (props)=>{

    const {
        contact, 
        user, 
        store, 
        asyncSelectInterlocutor, 
        asyncUnselectInterlocutor
    } = props;

    const [isSelected, setIsSelected] = useState(false);

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


        Evt.merge(ctx, [store.evtConversationStarted, store.evtInterlocutorsEmptied]).attach(
            _user => same(user, _user) && isSelected,
            () => setIsSelected(false)
        );




    },[contact, user, store, isSelected])

    return(
        <div className={`contact ${isSelected ? "contact-selected" : ""}`} onClick={handleClick}>

            <p>{contact.name}</p>


        </div>

    )

}