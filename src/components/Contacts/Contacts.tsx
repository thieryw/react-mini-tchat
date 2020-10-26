import React, {useCallback} from "react";
import {Store} from "../../logic";
import {UseAsyncReturn} from "react-async-hook";




export const Contacts: React.FunctionComponent<{
    contacts: Store["users"];
    user: Store["users"][number];
    asyncChangeInterlocutor: UseAsyncReturn<void, [{
        user: Store["users"][number];
        newInterlocutor: Store["users"][number];
    }]>;    
}> = (props)=>{
    
    const {contacts, user, asyncChangeInterlocutor} = props;





    return(
        <ul>

            {
                contacts.map(
                    contact => 
                    <li 
                        key={contact.id}
                        onClick={() => asyncChangeInterlocutor.execute({user,  "newInterlocutor": contact})}
                    >
                        {contact.name}
                    </li>
                )
            }

        </ul>
    )
}