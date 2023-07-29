import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { AppSection, TitleOne } from './APP.styled';

const LS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LS_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = useMemo(() => {
    if (contacts === []) {
      return;
    }
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter, 0);
    });
  }, [filter, contacts]);

  const formSubmitSearchHandler = data => {
    if (contacts) {
      const searchResult = contacts.find(contact => contact.name === data.name);
      if (!searchResult) {
        setContacts([{ id: nanoid(), ...data }, ...contacts]);
        return true;
      } else {
        alert(`${data.name} is already in contacts`);
        return false;
      }
    }
  };

  const deleteItem = contactId => {
    setContacts(contacts.filter(item => item.id !== contactId));
  };

  return (
    <AppSection>
      <TitleOne>Phonebook</TitleOne>
      <ContactForm onSubmitHandler={formSubmitSearchHandler} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={setFilter} />
      <ContactList list={visibleContacts} onDeleteItem={deleteItem} />
    </AppSection>
  );
};
