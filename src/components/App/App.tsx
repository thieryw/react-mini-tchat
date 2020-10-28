import React from "react";
import {Store} from "../../logic";
import {User} from "../User/User";



export const App: React.FunctionComponent<{store: Store}> = (props)=>{

    const {store} = props;

    return(
        <div>
            <User user={store.users[0]} store={store} />


        </div>
    )
}