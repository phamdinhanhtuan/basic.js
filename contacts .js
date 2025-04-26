let contacts = [];

function addContact(name, phone) {
  contacts.push({ name, phone });
}

function removeContact(name) {
  contacts = contacts.filter((contact) => contact.name !== name);
}

function displayContacts() {
  contacts.forEach((contact) => {
    console.log(`Name: ${contact.name}, Phone: ${contact.phone}`);
  });
}

// Gọi hàm để thêm và hiển thị liên lạc
addContact("Quynh", "123-456-7890");
addContact("Huong", "098-765-4321");
displayContacts();
