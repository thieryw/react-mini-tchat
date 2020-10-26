import {Evt, NonPostableEvt, ToPostableEvt} from "evt";





type Message = {
    description: string;
    direction: "incoming" | "outgoing";
    receiver: User;
    emitter: User;

}

type conversation = {
    messages: Message[];
    participants: User[];
}



type User = {
    name: String;
    messages: Message[];
    interlocutor: User | undefined;
    id: number;
}
export type Store = {
    users: User[];
    sendMessage: (params: {user: User; description: string}) => Promise<void>;
    changeInterlocutor: (params: {user: User; newInterlocutor: User}) => Promise<void>;

    evtMessageSent: NonPostableEvt<Parameters<Store["sendMessage"]>[0]>;
    evtInterlocutorChanged: NonPostableEvt<Parameters<Store["changeInterlocutor"]>[0]>;

}

export async function getStore(): Promise<Store>{

    const simulateNetworkDelay = (delay: number)=>{
        return new Promise<void>(resolve => setTimeout(resolve, delay));
    };


    const users: User[] = (()=>{
        const out:User[] = [];

        for(let i = 0; i < 3; i++){
            out.push({
                "id": i,
                "messages": [],
                "name": `user ${i+1}`,
                "interlocutor": undefined
            })
        }

        return out;

    })(); 

    const store: ToPostableEvt<Store> = {
        "evtMessageSent": new Evt(),
        "evtInterlocutorChanged": new Evt(),

        "sendMessage": async params => {
            await simulateNetworkDelay(300);

            const {user, description} = params;
            if(user.interlocutor === undefined){
                return;
            }

            user.messages.push({
                description, 
                "direction": "outgoing", 
                "receiver": user.interlocutor,
                "emitter": user
            });
            user.interlocutor.messages.push({
                description, 
                "direction": "incoming", 
                "receiver": user.interlocutor,
                "emitter": user
            });


            store.evtMessageSent.post(params);

        },

        "changeInterlocutor": async params => {
            const {user, newInterlocutor} = params;

            await simulateNetworkDelay(300);

            user.interlocutor = newInterlocutor;

            store.evtInterlocutorChanged.post(params);

        },

        users
    }

    await simulateNetworkDelay(1500);

    return store;



}



