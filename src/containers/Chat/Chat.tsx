import UserForm from '../../components/UserForm/UserForm.tsx';
import { Messages } from '../../types';
import { useEffect, useState } from 'react';
import UserMessages from '../../components/UserMessages/UserMessages.tsx';

const url = 'http://146.185.154.90:8000/messages'

const formatDate = (date: string): string => {
  const dateTime = new Date(date);
  let month = (dateTime.getMonth() + 1).toString(),
    day = dateTime.getDate().toString(),
    hours = dateTime.getHours().toString(),
    minutes = dateTime.getMinutes().toString(),
    seconds = dateTime.getSeconds().toString();
  const year = dateTime.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if (hours.length < 2) hours = '0' + hours;
  if (minutes.length < 2) minutes = '0' + minutes;
  if (seconds.length < 2) seconds = '0' + seconds;

  return `${day}.${month}.${year} at ${hours}:${minutes}:${seconds}`;
};

const Chat = () => {
  const [userMessages, setUserMessages] = useState<Messages[]>([]);
  const [lastDateTimeOfMessage, setLastDateTimeOfMessage] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchUrl = lastDateTimeOfMessage ?
          `http://146.185.154.90:8000/messages?datetime=${lastDateTimeOfMessage}` : url

        const response = await fetch(fetchUrl);
        if (response.ok) {
          const posts = await response.json() as Messages[];
          if (posts.length > 0) {
            const responseMessages = posts.map(post => {
              return {
                _id: post._id,
                author: post.author,
                message: post.message,
                datetime: formatDate(post.datetime)
              };
            });
            responseMessages.reverse();
            setLastDateTimeOfMessage(posts[posts.length - 1].datetime);
            setUserMessages(prevState => [...responseMessages, ...prevState]);
          }
        }
      } catch (e) {
        console.error("Error", e);
      }
    };

    void fetchData()

    const interval = setInterval(async () => {
      void fetchData()
    }, 3000);
    return () => clearInterval(interval);
  }, [lastDateTimeOfMessage]);

  return (
    <div>
      <UserForm/>
      {userMessages.length > 0 ?
        <>
          <UserMessages userMessages={userMessages}/>
        </>
        :
        <p className="w-75 mx-auto">No Messages</p>
      }
    </div>
  );
};

export default Chat;