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
    const [numberOfMessagesToDisplay, setNumberOfMessagesToDisplay] = useState(10);
    const [currentScrollHeight, setCurrentScrollHeight] = useState(0);

   
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
            ()=> {
               forceUpdate(); 
               scrollToBottom();

               if(!messagesRef || !messagesRef.current){
                   return;
               }

               setCurrentScrollHeight(messagesRef.current.scrollHeight);
            }
        );


        store.evtConversationSelected.attach(
            data => same(data.user, user),
            ctx,
            ()=> {
                forceUpdate();
                setNumberOfMessagesToDisplay(10);
                scrollToBottom();
                if(!messagesRef || !messagesRef.current){
                    return;
                }
                setCurrentScrollHeight(messagesRef.current.scrollHeight);
            }
        );
        

    },[store, user]);


    const scrollToBottom = useCallback(()=>{
        if(!messagesRef || !messagesRef.current){
            return;
        }

        messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);

    },[])

    
    const handleScroll = useCallback( async ()=>{



        if(!messagesRef || !messagesRef.current){
            return;
        }

        if(messagesRef.current.scrollTop !== 0){
            return;
        }

        await new Promise<void>(resolve =>{
            if(user.currentConversation === undefined
                || user.currentConversation.messages.length === numberOfMessagesToDisplay
            ){
                return;
            }


            if(numberOfMessagesToDisplay + 5 > user.currentConversation.messages.length){
                setNumberOfMessagesToDisplay(user.currentConversation.messages.length);
                resolve();
            }

            setNumberOfMessagesToDisplay(numberOfMessagesToDisplay + 5);
            resolve();
            
        })
        

        messagesRef.current.scrollTo(
            0, messagesRef.current.scrollHeight - currentScrollHeight
        );

        setCurrentScrollHeight(messagesRef.current.scrollHeight);

    },[numberOfMessagesToDisplay, user.currentConversation, currentScrollHeight]);

    

    



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


            <div onScroll={handleScroll} ref={messagesRef} className="messages">

                {
                    user.currentConversation?.messages.map(
                        (message, index) => 
                            user.currentConversation === undefined ? "" : 
                            index < user.currentConversation.messages.length - numberOfMessagesToDisplay ? "" :
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
                    className="text-input"
                    onChange={useCallback(({target}) => setTextInput(target.value), [])} 
                    value={textInput}
                />

                <input 
                    className="submit"
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

    },[messageRef]);

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