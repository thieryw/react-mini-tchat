import {Evt, NonPostableEvt, ToPostableEvt} from "evt";


type Message = {
    description: string;
    emitter: User;
    receivers: User[];
}

type Conversation = {
    participants: User[];
    messages: Message[];
    id: number;
}
type User = {
    name: string;
    contacts: User[];
    interlocutors: User[];
    conversations: Conversation[];
    currentConversation: Conversation | undefined;
    id: number;

}

export type Store = {
    users: User[];
    selectInterlocutor: (params: {user: User; contact: User}) => Promise<void>;
    unselectInterlocutor: (params: {user: User; contact: User}) => Promise<void>;
    emptyInterlocutors: (user: User) => Promise<void>;
    selectConversation: (params: {user: User; conversation: Conversation})=> Promise<void>;
    unselectConversation: (user: User)=> Promise<void>;
    sendMessage: (params: {emitter: User; description: string}) => Promise<void>;
    newConversation: (user: User)=> Promise<void>;

    evtInterlocutorSelected: NonPostableEvt<Parameters<Store["selectInterlocutor"]>[0]>;
    evtInterlocutorUnselected: NonPostableEvt<Parameters<Store["unselectInterlocutor"]>[0]>;
    evtInterlocutorsEmptied: NonPostableEvt<User>;
    evtMessageSent: NonPostableEvt<Parameters<Store["sendMessage"]>[0]>;
    evtConversationSelected: NonPostableEvt<Parameters<Store["selectConversation"]>[0]>;
    evtConversationUnselected: NonPostableEvt<User>;
    evtConversationStarted: NonPostableEvt<Parameters<Store["newConversation"]>[0]>;
}


export async function getStore(): Promise<Store>{

    const simulateNetworkDelay = (ms: number)=>{
        return new Promise<void>(resolve => setTimeout(resolve, ms));
    }

    const users: User[] = (()=>{
        const out: User[] = [];
        for(let i = 0; i < 30; i++){
            out.push({
                "contacts": [],
                "name": `User ${i+1}`,
                "interlocutors": [],
                "conversations": [],
                "currentConversation": undefined,
                "id": i
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

    let conversationId: 0;


    const store: ToPostableEvt<Store> = {
       users,
       "evtInterlocutorSelected": new Evt(),
       "evtInterlocutorUnselected": new Evt(),
       "evtInterlocutorsEmptied": new Evt(),
       "evtMessageSent": new Evt(),
       "evtConversationStarted": new Evt(),
       "evtConversationSelected": new Evt(),
       "evtConversationUnselected": new Evt(),

       "selectInterlocutor": async params =>{
           const {contact, user} = params;

           await simulateNetworkDelay(300);

           user.interlocutors.push(contact);

           store.evtInterlocutorSelected.post(params);

       },

       "unselectInterlocutor": async params =>{
           const {contact, user} = params;

           await simulateNetworkDelay(300);


           user.interlocutors.splice(
               user.interlocutors.indexOf(contact),
               1
           );

           store.evtInterlocutorUnselected.post(params);

       },

       "emptyInterlocutors": async user =>{
           await simulateNetworkDelay(300);

           user.interlocutors = [];

           store.evtInterlocutorsEmptied.post(user);
       },

       "selectConversation": async params =>{
           const {conversation, user} = params;

           await simulateNetworkDelay(300);

           user.currentConversation = conversation;

           store.evtConversationSelected.post(params);

       },

       "unselectConversation": async user =>{

           await simulateNetworkDelay(300);

           user.currentConversation = undefined;

           store.evtConversationUnselected.post(user);

       },

       "newConversation": async user =>{
           await simulateNetworkDelay(300);

           try{
               if(user.interlocutors.length === 0){
                   throw new Error("Error! No interlocutors selected");
               }

           }catch(err){
                console.log(err);
                return;
           }

           const newConversation: Conversation = {
               "id": conversationId++,
               "messages": [],
               "participants": (()=>{
                   const out: User[] = [];

                   out.push(user);

                   user.interlocutors.forEach(user =>{
                       out.push(user);
                   });

                   return out;
               })()

           }

           user.conversations.push(newConversation);

           user.interlocutors.forEach(interlocutor => interlocutor.conversations.push(newConversation));

           user.interlocutors = [];

           store.evtConversationStarted.post(user);
       },

       "sendMessage": async params =>{
           const {emitter, description} = params;

           await simulateNetworkDelay(300);

           emitter.currentConversation?.messages.push({
               description,
               emitter,
               "receivers": (()=>{

                   const out: User[] = [];

                   emitter.currentConversation.participants.forEach(participant =>{
                       if(participant === emitter){
                           return;
                       }

                       out.push(participant);
                   })

                   return out;
               })()
           });


           store.evtMessageSent.post(params);


       }

    }


    await simulateNetworkDelay(1500);


    return store;



}





