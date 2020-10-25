import React, {useState, useCallback} from "react";
import {Store} from "../../logic";
import {User} from "../User/User";
import "./App.scss";





export const App:React.FunctionComponent<{
    store: Store;
}> = (props)=>{

    const {store} = props;
    const [currentUserIndex, setCurrentUserIndex] = useState(0);

    const toggleUser = useCallback(()=>{
        if(currentUserIndex === store.users.length - 1){
            setCurrentUserIndex(0);
            return;
        }

        setCurrentUserIndex(currentUserIndex + 1);

    }, [currentUserIndex, store.users.length]);


    return(
        <div className="App">
            <header>
                <h1>{store.users[currentUserIndex].name}</h1>
                <input type="button" value="Toggle User" onClick={toggleUser}/>
            </header>




            {
                store.users.map((user, index) => 
                            <User 
                                store={store}
                                user={user}
                                key={index}
                                isCurrentUser={
                                    currentUserIndex === index ? true : false
                                }

                            />

                    )

            }




        </div>
    )
}