import React, {useCallback} from "react";
import {Store} from "../../logic";




export const Contacts: React.FunctionComponent<{
    contacts: Store["users"];
    user: Store["users"][number];
    store: Pick<Store,
        "changeInterlocutor"
    >
}> = (props)=>{
    
    const {contacts, user, store} = props;



    return(
        <ul>

            {
                contacts.map(
                    contact => 
                    <li 
                        key={contact.id}
                        onClick={()=> store.changeInterlocutor({user, "newInterlocutor": contact})}
                    >
                        {contact.name}
                    </li>
                )
            }

        </ul>
    )
}