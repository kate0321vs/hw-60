import { useState } from 'react';
import { Data } from '../../types';

const url = 'http://146.185.154.90:8000/messages'

const UserForm = () => {
  const [form, setForm] = useState<Data>({
    author: '',
    message: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value, name} = e.target;
    setForm(prevForm => ({...prevForm, [name]: value}));
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new URLSearchParams();
    data.set('message', form.message);
    data.set('author', form.author);

    await fetch(`${url}`, {
      method: 'POST',
      body: data,
    });
    setForm(prevState => ({...prevState, author: '', message: ''}));
  }

  return (
    <form className="w-75 mx-auto my-4" onSubmit={onSubmit}>
      <label htmlFor="author">Your Name</label>
      <input name="author"
             value={form.author}
             onChange={inputChangeHandler}
             className="form-control mb-3"
             type="text"
             id="author"
             required/>
      <label htmlFor="message">Your Message</label>
      <textarea name="message"
                value={form.message}
                onChange={inputChangeHandler}
                className="form-control mb-3"
                id="message"
                required></textarea>
      <button type="submit" className="btn btn-primary">Send</button>
    </form>
  );
};

export default UserForm;