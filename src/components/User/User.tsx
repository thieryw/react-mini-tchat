import React, {useState, useCallback} from "react";
import {Store} from "../../logic";
import {useEvt} from "evt/hooks";
import {same} from "evt/tools/inDepth";
import {Contacts} from "./Contacts";
import "./User.scss";



export const User: React.FunctionComponent<{
    user: Store["users"][number];
    store: Omit<Store,
        "users"
    >;
}> = (props)=>{

    const {user, store} = props;
    const [isContactVisible, setIsContactVisible] = useState(false);

    useEvt(ctx=>{
        store.evtConversationStarted.attach(
            _user => same(_user, user),
            ctx,
            ()=> setIsContactVisible(false)
        )

    },[store, user])



    return(
        <div className="User">
            <div className={`conversation-wrapper ${isContactVisible ? "hidden" : ""}`}>
                <h2>Conversations</h2>

                <div className="conversations">

                    {
                        user.conversations.length === 0 ? "" : 
                        user.conversations.map(conversation => <p key={conversation.id}>
                            {
                                conversation.participants.map(participant => `${participant.name}, `)
                            }
                        </p>)
                    }


                </div>
                <input type="button" value="+" onClick={useCallback(()=> setIsContactVisible(true), [])}/>
            </div>

            <Contacts store={store} user={user} isComponentVisible={isContactVisible}/>







        </div>
    )
}