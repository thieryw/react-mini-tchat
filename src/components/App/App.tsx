import React, {useState, useCallback} from "react";
import {Store} from "../../logic";
import {User} from "../User/User";



export const App: React.FunctionComponent<{store: Store}> = (props)=>{

    const {store} = props;
    const [userIndex, setUserIndex] = useState(0);



    (window as any).changeUser = function(index: number){
        if(index >= store.users.length || index < 0){
            return;
        }

        setUserIndex(index);
    }
  

    


    return(
        <div className="App">

            {
                store.users.map(
                    (user, index) => <User user={user} isUserVisible={userIndex === index} store={store} key={index}/>
                )
            }


        </div>
    )
}