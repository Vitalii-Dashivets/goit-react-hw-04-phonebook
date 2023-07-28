import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { AppSection, TitleOne } from './APP.styled';

const LS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],

    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem(LS_KEY);
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  inputChangeValue = evt => {
    return this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  formSubmitHandler = data => {
    return this.setState(prevValue => ({
      contacts: [{ id: nanoid(), ...data }, ...prevValue.contacts],
    }));
  };

  calculateFilteredContacts = () => {
    const { contacts } = this.state;
    const normalizedFilter = this.state.filter.toLowerCase();
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter, 0);
    });
  };

  formSubmitSearchHandler = data => {
    const searchResult = this.state.contacts.find(
      contact => contact.name === data.name
    );
    if (!searchResult) {
      this.formSubmitHandler(data);
      return true;
    } else {
      alert(`${data.name} is already in contacts`);
      return false;
    }
  };

  deleteItem = contactId => {
    this.setState(prevValue => ({
      contacts: prevValue.contacts.filter(item => item.id !== contactId),
    }));
  };

  render() {
    const visibleContacts = this.calculateFilteredContacts();
    return (
      <AppSection>
        <TitleOne>Phonebook</TitleOne>
        <ContactForm onSubmitHandler={this.formSubmitSearchHandler} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onChange={this.inputChangeValue} />
        <ContactList list={visibleContacts} onDeleteItem={this.deleteItem} />
      </AppSection>
    );
  }
}
