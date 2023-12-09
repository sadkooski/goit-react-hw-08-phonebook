import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import css from '../ContactForm/ContactForm.module.css';

export const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <ul className={css.list}>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} {contact.number}
            <button
              onClick={() => {
                console.log('Id kontaktu do usunięcia:', contact.id);
                dispatch(deleteContact(contact.id));
              }}
              name={contact.name}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
