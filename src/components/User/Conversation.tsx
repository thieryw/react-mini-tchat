import React, {useState, useCallback, useReducer, useRef, useEffect} from "react";
import {Store} from "../../logic";
import {useAsyncCallback} from "react-async-hook";
import {useEvt} from "evt/hooks";
import {same} from "evt/tools/inDepth";
import "./Conversation.scss";


export const Conversation: React.FunctionComponent<{
    store: Pick<Store,
        "sendMessage" |
        "evtMessageSent" |
        "evtConversationSelected" |
        "unselectConversation" |
        "evtConversationUnselected"
    >;
    user: Store["users"][number];
    isComponentVisible: boolean;
    
}> = (props)=>{
    const {user, isComponentVisible, store} = props;
    const [textInput, setTextInput] = useState("");
    const [, forceUpdate] = useReducer(x=>x+1, 0);
    const messagesRef = useRef<HTMLDivElement>(null);

    const asyncSendMessage = useAsyncCallback(store.sendMessage);
    const asyncUnselectConversation = useAsyncCallback(store.unselectConversation);




    const handleSubmit = useCallback(()=>{

        asyncSendMessage.execute({
            "description": textInput,
            "emitter": user
        });


        

        setTextInput("");



    },[textInput, asyncSendMessage, user]);

    useEvt(ctx =>{
        store.evtMessageSent.attach(
            data => same(
                data.emitter.currentConversation?.participants,
                user.currentConversation?.participants
            ),
            ctx,
            ()=> forceUpdate()
        );


        store.evtConversationSelected.attach(
            data => same(data.user, user),
            ctx,
            ()=> forceUpdate()
        );
        

    },[store, user]);

    useEffect(()=>{
        
        if(!messagesRef || !messagesRef.current){
            return;
        }

        messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);



    });

    



    return(

        <div 
            className="Conversation"
            style={
                {
                    height: isComponentVisible 
                    && !asyncUnselectConversation.loading ? "100%" : "0%"
                }
            }
        >
            <header>
                <h3>
                    {
                        user.currentConversation?.participants.map(
                            participant => `${participant.name}, `
                        )
                    }
                </h3>
                <input 
                    type="button"
                    value="<"
                    onClick={
                        useCallback(()=>{

                            asyncUnselectConversation.execute(user);

                        }, [user, asyncUnselectConversation])
                    }
                />
            </header>


            <div ref={messagesRef} className="messages">
                {
                    user.currentConversation?.messages.map(
                        (message, index) => 
                            <Message 
                                key={index} 
                                message={message}
                                user={user}
                            />
                    )
                }
            </div>

            <form>
                <textarea 
                    onChange={useCallback(({target}) => setTextInput(target.value), [])} 
                    value={textInput}
                />

                <input 
                    type="submit" 
                    value={asyncSendMessage.loading ? "..." : ">"}
                    disabled={asyncSendMessage.loading}
                    onClick={handleSubmit}
                />

            </form>
                




        </div>

    )
}

const Message: React.FunctionComponent<{
    message: Store["users"][number]["conversations"][number]["messages"][number];
    user: Store["users"][number];

}> = (props)=>{

    const {message, user} = props

    const messageRef = useRef<HTMLDivElement>(null);



    const adjustWidth = useCallback(async ()=>{

        await new Promise<void>(resolve => setTimeout(resolve, 1));

        if(!messageRef || !messageRef.current){
                return;
        }

        messageRef.current.style.width = "100%";

    },[user, message.emitter]);

    useEffect(()=>{

        adjustWidth();


    },[adjustWidth]);







    return(
        <div 
            ref={messageRef}
            className={message.emitter === user ? "outgoing" : "incoming"}
            style={
                {
                    width: "50%"

                }
            }
        >
            <div>
                <em>{message.emitter.name}</em>
                <p>{
                    message.description
                }</p>
            </div>

        </div>
    )
}