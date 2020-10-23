import React from "react";
import {Store} from "../../logic";


export const Message: React.FunctionComponent<{

    message: Store["users"][number]["messages"][number];

}> = (props)=>{

    const {message} = props;

    return(
        <div className={message.direction}>
            <em>
                {message.direction === "incoming" ? "received" : "sent"}
            </em>

            <p>{message.description}</p>
        </div>

    )

}