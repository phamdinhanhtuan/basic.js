
console.log("\n=== Bài 3: Xử lý chuỗi ===");

const fullName = "   pham quynh huong   ";

// Chuẩn hóa tên: viết hoa chữ cái đầu, xóa khoảng trắng thừa
function formatName(name) {
    //Xóa khoảng trắng đầu và cuối
    let trimmed = name.trim();
    
    //Tách thành mảng các từ
    let words = trimmed.split(" ");
    
    //Viết hoa chữ cái đầu của mỗi từ
    let capitalizedWords = words.map(word => {
        if (word.length > 0) {
            return word[0].toUpperCase() + word.slice(1).toLowerCase();
        }
        return word;
    });
    
    //Nối lại thành chuỗi
    return capitalizedWords.join(" ");
}

console.log("Tên ban đầu:", fullName);
console.log("Tên sau khi chuẩn hóa:", formatName(fullName));
