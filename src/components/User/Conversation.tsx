import React, {useState, useCallback, useReducer} from "react";
import {Store} from "../../logic";
import {useAsyncCallback} from "react-async-hook";
import {useEvt} from "evt/hooks";
import {same} from "evt/tools/inDepth";


export const Conversation: React.FunctionComponent<{
    store: Pick<Store,
        "sendMessage" |
        "evtMessageSent" |
        "evtConversationSelected"
    >;
    user: Store["users"][number];
    isComponentVisible: boolean;
    
}> = (props)=>{
    const {user, isComponentVisible, store} = props;
    const [textInput, setTextInput] = useState("");
    const [, forceUpdate] = useReducer(x=>x+1, 0);

    const asyncSendMessage = useAsyncCallback(store.sendMessage);



    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        asyncSendMessage.execute({
            "description": textInput,
            "emitter": user
        });

        console.log(textInput);

        

        setTextInput("");



    },[user, textInput]);

    useEvt(ctx =>{
        store.evtMessageSent.attach(
            data => data.emitter.currentConversation?.id === user.currentConversation?.id,
            ctx,
            ()=> forceUpdate()
        );

        store.evtConversationSelected.attach(
            data => same(data.user, user),
            ctx,
            ()=> forceUpdate()
        )

    },[store, user])

    


    return(

        <div className={`Conversation ${isComponentVisible ? "" : "hidden"}`}>
            <h3>
                {
                    user.currentConversation?.participants.map(
                        participant => `${participant.name}, `
                    )
                }
            </h3>

            <div className="messages">
                {
                    user.currentConversation?.messages.map(
                        (message, index) =>{
                            return <div key={index} className={message.emitter === user ? "outgoing" : "incoming"}>
                                <em>{message.emitter.name}</em>
                                <p>{
                                    message.description
                                    
                                }</p>
                            </div>
                        }
                    )
                }
            </div>

            <form onSubmit={handleSubmit}>
                <textarea onChange={useCallback(({target}) => setTextInput(target.value), [user])} value={textInput}/>

                <input type="submit"/>

            </form>
                




        </div>

    )
}