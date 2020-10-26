import React, {useState, useCallback} from "react";
import {Store} from "../../logic";
import {UseAsyncReturn} from "react-async-hook";



export const Form: React.FunctionComponent<{
    
    asyncSendMessage: UseAsyncReturn<void, [{
        user: Store["users"][number];
        description: string;
    }]>;
    user: Store["users"][number];

}> = (props)=>{

    const {asyncSendMessage, user} = props;
    const [textInput, setTextInput] = useState("");


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