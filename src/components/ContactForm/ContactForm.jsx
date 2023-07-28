import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormStyle,
  InputStyle,
  ButtonStyle,
  Label,
} from './ContactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  inputChangeValue = evt => {
    const newName = evt.target.value;
    const key = evt.target.name;
    return this.setState({ [key]: newName });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.props.onSubmitHandler(this.state)) {
      this.setState({ name: '', number: '' });
    }
  };

  render() {
    const { name, number } = this.state;

    return (
      <FormStyle onSubmit={this.handleSubmit}>
        <Label htmlFor="inputName">Name</Label>
        <InputStyle
          type="text"
          name="name"
          value={name}
          id="inputName"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.inputChangeValue}
        />
        <Label htmlFor="inputNumber">Number</Label>
        <InputStyle
          type="tel"
          name="number"
          value={number}
          id="inputNumber"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.inputChangeValue}
        />
        <ButtonStyle type="submit">Add contact</ButtonStyle>
      </FormStyle>
    );
  }
}

ContactForm.propTypes = {
  onAlert: PropTypes.func,
};
