import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { addDoc, collection, query, where } from "firebase/firestore";
import ConversationSelect from './ConversationSelect'
import { auth, db } from "../config/firebase";
import { useRouter } from "next/router";

import LoadingPage from './LoadingPage'

function Sidebar() {
  const [loggedInUser, _loading, _error] = useAuthState(auth);
  if(_loading) return <LoadingPage />
  
  console.log("da dang nhap", loggedInUser);


  // const [recipientEmail, setRecipientEmail] = useState('')

  // Check the conversation already exist in Firebase
  // const queryGetConversationsForCurrentUser = query(collection(db,'conversations'), where('users', 'array-contains', loggedInUser.email))
  
  // const [conversationsSnapshot] = useCollection(queryGetConversationsForCurrentUser)
  
  // const isConversationAlreadyExisted = (recipientEmail) => {
  //     return conversationsSnapshot?.docs.find(conversation => (conversation.data().users.includes(recipientEmail)))
  // }

  // const createConversation = async () => {
  //   if (!recipientEmail) return

  //   const isInvitingSelf = recipientEmail === loggedInUser?.email;
    
  //   if (recipientEmail && !isInvitingSelf && !isConversationAlreadyExisted(recipientEmail)){
  //     // Add conversation to Firebase ("conversation collection")
  //     await addDoc(collection(db, 'conversations'), {
  //       users: [loggedInUser?.email, recipientEmail]
  //     })
  //   }
  // };



  return (
    <div>
      Hello
    </div>
  )
}

export default Sidebar