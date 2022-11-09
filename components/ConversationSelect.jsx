

const ConversationSelect = ({id, conversationUsers, selectedRecipientEmail, handleRecipientEmailClick}) => {
  const {recipientData, recipientEmail} = useRecipient(conversationUsers);

  console.log(recipientData, recipientEmail)
  console.log()
  return (
    <div
      selected={selectedRecipientEmail === id}
      onClick={(event) => handleRecipientEmailClick(event, id)}
    >
      Hello
    </div>

  )
}