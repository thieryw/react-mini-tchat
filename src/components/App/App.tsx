import React, {useState, useCallback} from "react";
import {Store} from "../../logic";
import {User} from "../User/User";
import {Form} from "../Form/Form";





export const App:React.FunctionComponent<{
    store: Store;
}> = (props)=>{

    const {store} = props;
    const [emitter, setEmitter] = useState(store.users[0]);


    return(
        <div>
            <h1>Tchat App</h1>

            <input 
                type="button" 
                value="toggle user" 
                onClick={useCallback(()=>setEmitter(
                    emitter === store.users[0] ? store.users[1] : store.users[0]
                ),[store, emitter])}
            />

            <div className="users">
                <User store={store} user={store.users[0]}/>
                <User store={store} user={store.users[1]}/>
            </div>

            <Form 
                emitter={emitter} 
                receiver={emitter === store.users[0] ? store.users[1] : store.users[0]}
                store={store}
                
            />


        </div>
    )
}