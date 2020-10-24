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
            <h1>Tchat App</h1>
            <input type="button" value="Toggle User" onClick={toggleUser}/>



            {
                store.users.map((user, index) => 
                        <div 
                            key={index} 
                            className={index === currentUserIndex ? "current" : ""}
                        >
                            <User 
                                store={store}
                                user={user}

                            />
                        </div>

                    )

            }




        </div>
    )
}