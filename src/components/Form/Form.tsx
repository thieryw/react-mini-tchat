import React, {useState, useCallback} from "react";
import {Store} from "../../logic";
import {useAsyncCallback} from "react-async-hook";



export const Form: React.FunctionComponent<{
    store: Pick<Store,
       "sendMessage" 
    >;
    user: Store["users"][number];

}> = (props)=>{

    const {store, user} = props;
    const [textInput, setTextInput] = useState("");

    const asyncSendMessage = useAsyncCallback(store.sendMessage)

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>)=>{

        e.preventDefault();

        if(textInput === "") return;

        asyncSendMessage.execute(
            {
                user,
                "description": textInput
            }
        );

        setTextInput("");


    },[textInput, asyncSendMessage, user]);

    return(
        <form onSubmit={handleSubmit}>
            <textarea 
                value={textInput}
                onChange={useCallback(({target}) => setTextInput(target.value),[])}
            />

            <input disabled={user.interlocutor === undefined} type="submit" value="send message"/>
        </form>

    )
}