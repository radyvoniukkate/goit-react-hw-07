
import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import {
  selectLoading,
  selectError,
  selectFilteredContacts, 
} from "/src/redux/contactsSlice.js";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts); 
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);


  if (loading) {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul className="list">
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </ul>
  );
};

export default ContactList;
