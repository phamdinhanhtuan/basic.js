const readline = require("readline");

class Contact {
  constructor(id, name, phone, email) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
}

class ContactManager {
  constructor() {
    this.contacts = [];
  }

  addContact(contact) {
    if (this.contacts.some((c) => c.id === contact.id)) {
      throw new Error(`Liên hệ với ID ${contact.id} đã tồn tại.`);
    }
    this.contacts.push(contact);
    console.log(`Đã thêm liên hệ: ${contact.name}`);
  }

  removeContact(id) {
    const index = this.contacts.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Không tìm thấy liên hệ với ID ${id}.`);
    }
    const [removed] = this.contacts.splice(index, 1);
    console.log(`Đã xoá liên hệ: ${removed.name}`);
  }

  updateContact(id, newInfo) {
    const contact = this.contacts.find((c) => c.id === id);
    if (!contact) throw new Error(`Không tìm thấy liên hệ với ID ${id}.`);
    Object.assign(contact, newInfo);
    console.log(`Đã cập nhật liên hệ: ${contact.name}`);
  }

  searchContacts(keyword) {
    const lower = keyword.toLowerCase();
    return this.contacts.filter(
      (c) => c.name.toLowerCase().includes(lower) || c.phone.includes(keyword)
    );
  }

  listContacts() {
    if (this.contacts.length === 0) {
      console.log("Danh bạ trống.");
      return;
    }
    this.contacts.forEach((c) => {
      console.log(
        `ID: ${c.id} | ${c.name} | ĐT: ${c.phone} | Email: ${c.email}`
      );
    });
  }
}

const manager = new ContactManager();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log("\n--- QUẢN LÝ DANH BẠ ---");
  console.log("1. Thêm liên hệ");
  console.log("2. Xoá liên hệ");
  console.log("3. Sửa liên hệ");
  console.log("4. Tìm kiếm liên hệ");
  console.log("5. Hiển thị danh bạ");
  console.log("0. Thoát");
  rl.question("Chọn chức năng: ", handleMenu);
}

function handleMenu(choice) {
  switch (choice.trim()) {
    case "1":
      addContactFlow();
      break;
    case "2":
      removeContactFlow();
      break;
    case "3":
      updateContactFlow();
      break;
    case "4":
      searchContactFlow();
      break;
    case "5":
      manager.listContacts();
      showMenu();
      break;
    case "0":
      rl.close();
      break;
    default:
      console.log("Lựa chọn không hợp lệ.");
      showMenu();
  }
}

function addContactFlow() {
  rl.question("Nhập ID: ", (id) => {
    rl.question("Nhập tên: ", (name) => {
      rl.question("Nhập số điện thoại: ", (phone) => {
        rl.question("Nhập email: ", (email) => {
          try {
            manager.addContact(new Contact(Number(id), name, phone, email));
          } catch (e) {
            console.error(e.message);
          }
          showMenu();
        });
      });
    });
  });
}

function removeContactFlow() {
  rl.question("Nhập ID liên hệ cần xoá: ", (id) => {
    try {
      manager.removeContact(Number(id));
    } catch (e) {
      console.error(e.message);
    }
    showMenu();
  });
}

function updateContactFlow() {
  rl.question("Nhập ID liên hệ cần sửa: ", (id) => {
    rl.question("Nhập tên mới (bỏ qua nếu không đổi): ", (name) => {
      rl.question(
        "Nhập số điện thoại mới (bỏ qua nếu không đổi): ",
        (phone) => {
          rl.question("Nhập email mới (bỏ qua nếu không đổi): ", (email) => {
            const newInfo = {};
            if (name) newInfo.name = name;
            if (phone) newInfo.phone = phone;
            if (email) newInfo.email = email;
            try {
              manager.updateContact(Number(id), newInfo);
            } catch (e) {
              console.error(e.message);
            }
            showMenu();
          });
        }
      );
    });
  });
}

function searchContactFlow() {
  rl.question("Nhập từ khoá tìm kiếm: ", (keyword) => {
    const found = manager.searchContacts(keyword);
    if (found.length === 0) {
      console.log("Không tìm thấy liên hệ nào.");
    } else {
      found.forEach((c) => {
        console.log(
          `ID: ${c.id} | ${c.name} | ĐT: ${c.phone} | Email: ${c.email}`
        );
      });
    }
    showMenu();
  });
}

rl.on("close", () => {
  console.log("Đã thoát chương trình.");
  process.exit(0);
});

showMenu();
