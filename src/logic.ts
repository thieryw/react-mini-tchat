import {Evt, NonPostableEvt, ToPostableEvt} from "evt";





type Message = {
    description: string;
    direction: "incoming" | "outgoing";

}

type User = {
    name: String;
    messages: Message[];
    id: number;
}
export type Store = {
    users: User[];
    sendMessage: (params: {emitter: User; receiver: User; description: string}) => Promise<void>;

    evtMessageSent: NonPostableEvt<Parameters<Store["sendMessage"]>[0]>;

}

export async function getStore(): Promise<Store>{

    const simulateNetworkDelay = (delay: number)=>{
        return new Promise<void>(resolve => setTimeout(resolve, delay));
    };


    const users: User[] = [
        {
            "messages": [],
            "name": "User 1",
            "id": 0
        },
        {
            "name": "User 2",
            "messages": [],
            "id": 1
        }
    ];

    const store: ToPostableEvt<Store> = {
        "evtMessageSent": new Evt(),

        "sendMessage": async params => {
            await simulateNetworkDelay(300);

            const {emitter, receiver, description} = params;

            emitter.messages.push({description, "direction": "outgoing"});
            receiver.messages.push({description, "direction": "incoming"})

            store.evtMessageSent.post(params);

        },

        users
    }

    await simulateNetworkDelay(1500);

    return store;



}



