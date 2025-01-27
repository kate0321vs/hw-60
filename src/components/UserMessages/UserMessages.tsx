import { Messages } from '../../types';
import MessageItem from './MessageItem/MessageItem.tsx';


interface Props {
  userMessages: Messages[];
}

const UserMessages: React.FC<Props> = ({userMessages}) => {
  return (
    <>
      {userMessages.map((message) => (
         <MessageItem key={message._id}
                      author={message.author}
                      message={message.message}
                      datetime={message.datetime}
         />
        )
      )}
    </>
  );
};

export default UserMessages;