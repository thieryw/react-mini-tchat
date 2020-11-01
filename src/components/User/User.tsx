import React, {useState, useCallback} from "react";
import {Store} from "../../logic";
import {useEvt} from "evt/hooks";
import {same} from "evt/tools/inDepth";
import {Contacts} from "./Contacts";
import {Conversation} from "./Conversation";
import {Evt} from "evt";
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
        

        Evt.merge(ctx, [store.evtConversationStarted, store.evtInterlocutorsEmptied]).attach(
            _user => same(_user, user),
            () => setIsContactVisible(false)
        );

        

        store.evtConversationUnselected.attach(
            _user => same(user, _user),
            ctx,
            () => setIsConversationVisible(false)
        );

        store.evtConversationSelected.attach(
            data => same(data.user, user),
            ctx,
            () => setIsConversationVisible(true)
        );



    },[store, user]);


    const selectConversation = useCallback((conversation: Store["users"][number]["conversations"][number])=>{



        store.selectConversation({
            conversation,
            user
        });




    },[store, user])

    const conversationsStyle = {
        display: isContactVisible || isConversationVisible ? "none" : "flex"

    }



    return(
        <div className={isUserVisible ? "User" : "hidden"}>
            <div className="conversation-wrapper" style={conversationsStyle}>
                <header>
                    <div>
                        <h2>{user.name}</h2>
                    </div>


                    <input type="button" value="+" onClick={useCallback(()=> setIsContactVisible(true), [])}/>

                </header>

                <div className="conversations">

                    {
                        user.conversations.length === 0 ? "" : 
                        user.conversations.map((conversation, index) => 
                            <div 
                                className="conversation-li"
                                key={index}
                                onClick={()=> selectConversation(conversation)}
                            >
                            {
                                <p>
                                    {
                                        conversation.participants.map(participant => `${participant.name}, `)
                                    }
                                </p>
                            }
                            </div>
                        )
                    }


                </div>
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