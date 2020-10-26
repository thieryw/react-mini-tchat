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
    conversations: Conversation[];
    id: number;

}

export type Store = {
    users: User[];
    selectContact: (params: {user: User; contact: User}) => Promise<void>;
    sendMessage: (params: {user: User; contact: User}) => Promise<void>;

    evtContactSelected: NonPostableEvt<Parameters<Store["selectContact"]>[0]>;
    evtMessageSent: NonPostableEvt<Parameters<Store["sendMessage"]>[0]>;
}






