const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function getAllContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  contacts = await readContacts();

  const contact = contacts.find((contact) => contact.id === contactId);

  return contact;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    console.log("contact not found");
    return null;
  }

  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];

  await writeContacts(newContacts);

  return contacts[index];
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();

  const newConatct = {
    name: name,
    email: email,
    phone: phone,
    id: crypto.randomUUID(),
  };

  contacts.push(newConatct);

  return newConatct;
}

async function updateContact(contactId, updateContactData) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    console.log("contact not found");
    return null;
  }

  const updatedContact = { ...updateContactData, id: contactId };
  contacts[index] = updatedContact;

  return updatedContact;
}

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
