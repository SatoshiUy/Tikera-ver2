import { useEffect, useState } from 'react'
import ConversationSelect from "./ConversationSelect.component";


import { useRouter } from 'next/router';

import Image from 'next/image'
import styled from 'styled-components';

const StyledEmptyChats = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 76px);
  color: white;
  > h3 {
    font-size: 1.25rem;
    margin-bottom: 5px;
  }
  > span {
    font-size: 0.875rem;
    color: #aaa;
  }
`

const ListOfConversation = ({conversationsSnapshot}) => {
  const [selectedRecipientEmail, setSelectedRecipientEmail] = useState(null);

  console.log(conversationsSnapshot?.docs.length)
  const router = useRouter();
  const conversationId = router.query.id;

  const handleRecipientEmailClick = (event, id) => {
    setSelectedRecipientEmail(id);
    if(id == undefined){
      router.push('/')
    }
    else router.push(`/conversations/${id}`)
  };
  useEffect(() =>  {
    return handleRecipientEmailClick(event, conversationId);
  },[conversationId])

  return (
    <div>
      {conversationsSnapshot?.docs.map(conversation => {
        return <ConversationSelect
          key={conversation.id} 
          id={conversation.id} 
          conversationUsers = {conversation.data().users}
          selectedRecipientEmail = {selectedRecipientEmail}
          handleRecipientEmailClick = {handleRecipientEmailClick}
          />
      })}
    </div>
  )
}

export default ListOfConversation