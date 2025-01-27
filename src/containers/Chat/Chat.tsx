import UserForm from '../../components/UserForm/UserForm.tsx';
import { Messages } from '../../types';
import { useEffect, useState } from 'react';
import UserMessages from '../../components/UserMessages/UserMessages.tsx';

const url = 'http://146.185.154.90:8000/messages'

const Chat = () => {
  const [userMessages, setUserMessages] = useState<Messages[]>([]);

  const formatDate = (date: string): string => {
    const dateTime = new Date(date);
    let month = (dateTime.getMonth() + 1).toString(),
      day = dateTime.getDate().toString(),
      hours = dateTime.getHours().toString(),
      minutes = dateTime.getMinutes().toString(),
      seconds = dateTime.getSeconds().toString(),
      year = dateTime.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;

    return `${day}.${month}.${year} at ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const fetchData = async () => {

      const response = await fetch(url);
      if (response.ok) {
        const posts = await response.json() as Messages[];
        console.log('posts', posts);
        const formattedPosts = posts.map(post => {
          return {
            _id: post._id,
            author: post.author,
            message: post.message,
            datetime: formatDate(post.datetime)
          };

        });
        console.log('formattedPosts', formattedPosts)
        setUserMessages(formattedPosts);
      }
    };
    void fetchData();
  }, []);
  console.log('messages', userMessages);

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