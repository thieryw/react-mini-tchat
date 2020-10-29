import React, {useState, useCallback} from "react";
import {Store} from "../../logic";
import {User} from "../User/User";



export const App: React.FunctionComponent<{store: Store}> = (props)=>{

    const {store} = props;
    const [userIndex, setUserIndex] = useState(0);

    const toggleUser = useCallback(()=>{
        if(store.users.length - 1 === userIndex){
            setUserIndex(0);
            return;
        }

        setUserIndex(userIndex + 1);
    },[store, userIndex]);


    return(
        <div>

            {
                store.users.map(
                    (user, index) => <User user={user} isUserVisible={userIndex === index} store={store} key={index}/>
                )
            }

            <input type="button" value="toggle User" onClick={toggleUser}/>

        </div>
    )
}