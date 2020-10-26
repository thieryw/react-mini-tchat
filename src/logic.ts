import {Evt, NonPostableEvt, ToPostableEvt} from "evt";


type Message = {
    description: string;
    direction: "incoming" | "outgoing";
    id: number;
}

type Conversation = {
    interlocutor: User;
    messages: Message[];
    id: number;
}
type User = {
    name: string;
    contacts: User[];
    interlocutor: User | undefined;
    conversations: Conversation[];
    id: number;

}

export type Store = {
    users: User[];
    selectContact: (params: {user: User; contact: User}) => Promise<void>;
    sendMessage: (params: {emitter: User; receiver: User; description: string}) => Promise<void>;

    evtContactSelected: NonPostableEvt<Parameters<Store["selectContact"]>[0]>;
    evtMessageSent: NonPostableEvt<Parameters<Store["sendMessage"]>[0]>;
}


export async function getStore(): Promise<Store>{

    const simulateNetworkDelay = (ms: number)=>{
        return new Promise<void>(resolve => setTimeout(resolve, ms));
    }

    const users: User[] = (()=>{
        const out: User[] = [];
        for(let i = 0; i < 3; i++){
            out.push({
                "contacts": [],
                "conversations": [],
                "id": i,
                "interlocutor": undefined,
                "name": `User ${i+1}`
            })
        }

        out.forEach((user, index)=>{
            out.forEach((_user, _index)=>{
                if(index === _index){
                    return;
                }

                user.contacts.push(_user);
            });
        });


        return out;

    })();


    const store: ToPostableEvt<Store> = {
       users,
       "evtContactSelected": new Evt(),
       "evtMessageSent": new Evt(),
       "selectContact": async params =>{

       },

       "sendMessage": async params =>{

       }

    }


    await simulateNetworkDelay(1500);


    return store;



}





