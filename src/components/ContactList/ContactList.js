import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/actions';

export const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} {contact.number}
            <button
              onClick={() => dispatch(deleteContact(contact.id))}
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
