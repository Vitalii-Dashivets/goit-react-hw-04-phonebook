import PropTypes from 'prop-types';
import { ContactStyle, ButtonStyle } from './Contact.styled';

export function Contact({ contact, onDelItem }) {
  const { name, number } = contact;
  return (
    <ContactStyle>
      <p>
        {name} : {number}
      </p>
      <ButtonStyle type="button" onClick={onDelItem}>
        Delete
      </ButtonStyle>
    </ContactStyle>
  );
}

Contact.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.string,
  }),
  onDelItem: PropTypes.func,
};
