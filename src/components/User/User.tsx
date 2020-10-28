import React from "react";
import {Store} from "../../logic";



export const User: React.FunctionComponent<{
    user: Store["users"][number];
    store: Omit<Store,
        "users"
    >;
}> = (props)=>{

    const {user, store} = props;



    return(
        <div className="User">
            <div className="conversations-wrapper">
                <h2>Conversations</h2>

                <div className="conversations">

                    {
                        user.conversations.length === 0 ? "" : 
                        user.conversations.map(conversation => <p>
                            {
                                conversation.participants.map(participant => `${participant.name}, `)
                            }
                        </p>)
                    }


                </div>



            </div>



        </div>
    )
}