import React, {useState, useCallback} from "react";
import {Store} from "../../logic";
import {useAsyncCallback} from "react-async-hook";



export const Form: React.FunctionComponent<{
    store: Pick<Store,
       "sendMessage" 
    >;
    emitter: Store["users"][number];
    receiver: Store["users"][number];

}> = (props)=>{

    const {store, receiver, emitter} = props;
    const [textInput, setTextInput] = useState("");

    const asyncSendMessage = useAsyncCallback(store.sendMessage)

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>)=>{

        e.preventDefault();

        if(textInput === "") return;

        asyncSendMessage.execute(
            {
                emitter, 
                receiver, 
                "description": textInput
            }
        );

        setTextInput("");


    },[textInput, asyncSendMessage, emitter, receiver]);

    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={textInput}
                onChange={useCallback(({target}) => setTextInput(target.value),[])}
            />

            <input type="submit" value="send message"/>
        </form>

    )
}