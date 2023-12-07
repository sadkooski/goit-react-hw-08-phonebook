import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
export const ContactForm = () => {
  const contacts = useSelector(state => state.contacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const onChange = evt => {
    const { name, value } = evt.target;

    if (name === 'name') {
      setName(value);
    } else {
      setNumber(value);
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (!name || !number) {
      alert('Name and number are required fields.');
      return;
    }

    const existingContact = contacts.find(contact => contact.name === name);

    if (existingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact(name, number));
  };

  return (
    <form onSubmit={handleSubmit}>
      <span>Name</span>
      <input
        id="inputs"
        onChange={onChange}
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <span>Number</span>
      <input
        id="inputs"
        onChange={onChange}
        type="tel"
        name="number"
        value={number}
        pattern="\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
};
