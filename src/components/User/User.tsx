import React, {useState, useCallback} from "react";
import {Store} from "../../logic";
import {useEvt} from "evt/hooks";
import {same} from "evt/tools/inDepth";
import {Contacts} from "./Contacts";
import {Conversation} from "./Conversation";
import "./User.scss";



export const User: React.FunctionComponent<{
    user: Store["users"][number];
    isUserVisible: boolean;
    store: Omit<Store,
        "users"
    >;
}> = (props)=>{

    const {user, store, isUserVisible} = props;
    const [isContactVisible, setIsContactVisible] = useState(false);
    const [isConversationVisible, setIsConversationVisible] = useState(false);

    useEvt(ctx=>{
        store.evtConversationStarted.attach(
            _user => same(_user, user),
            ctx,
            ()=> setIsContactVisible(false)
        );

        store.evtConversationSelected.attach(
            data => same(data.user, user),
            ctx,
            () => {setIsConversationVisible(true); console.log("ok")}
        )


    },[store, user]);


    const selectConversation = useCallback((conversation: Store["users"][number]["conversations"][number])=>{
        store.selectConversation({
            conversation,
            user
        });



    },[store, user])




    return(
        <div className={`User ${isUserVisible ? "" : "hidden"}`}>
            <div className={`conversation-wrapper ${isContactVisible || isConversationVisible ? "hidden" : ""}`}>
                <h2>Conversations</h2>

                <div className="conversations">

                    {
                        user.conversations.length === 0 ? "" : 
                        user.conversations.map(conversation => 
                            <p 
                                key={conversation.id}
                                onClick={()=> selectConversation(conversation)}
                            >
                            {
                                conversation.participants.map(participant => `${participant.name}, `)
                            }
                        </p>)
                    }


                </div>
                <input type="button" value="+" onClick={useCallback(()=> setIsContactVisible(true), [])}/>
            </div>

            <Contacts store={store} user={user} isComponentVisible={isContactVisible}/>


            <Conversation 
                isComponentVisible={isConversationVisible}
                store={store}
                user={user}
            />







        </div>
    )
}