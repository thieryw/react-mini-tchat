import React from "react";
import {Store} from "../../logic";



export const Conversation: React.FunctionComponent<{
    user: Store["users"][number];
    isComponentVisible: boolean;
    
}> = (props)=>{
    const {user, isComponentVisible} = props;


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
                            return <p key={index} className={message.emitter === user ? "outgoing" : "incoming"}>
                                {
                                    message.description
                                }
                            </p>
                        }
                    )
                }
            </div>
                




        </div>

    )
}