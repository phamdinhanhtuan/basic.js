// Ứng dụng tạo danh sách công thức nấu ăn (Recipe Book)
// Thêm công thức với nguyên liệu, hướng dẫn nấu.
// Tìm kiếm công thức theo tên hoặc nguyên liệu.

const readline = require('readline');

// 1. Định nghĩa class Công thức
class Recipe {
  constructor(id, name, ingredients, instructions, cookingTime, difficulty, category) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients; // Array of ingredients
    this.instructions = instructions; // Array of steps
    this.cookingTime = cookingTime; // in minutes
    this.difficulty = difficulty; // 'Dễ', 'Trung bình', 'Khó'
    this.category = category; // 'Món chính', 'Món phụ', 'Tráng miệng', 'Đồ uống'
    this.createdDate = new Date().toLocaleDateString('vi-VN');
    this.rating = 0;
    this.reviews = [];
  }

  // Thêm đánh giá
  addReview(reviewer, rating, comment) {
    if (rating < 1 || rating > 5) {
      throw new Error('Đánh giá phải từ 1-5 sao.');
    }
    
    this.reviews.push({
      reviewer,
      rating,
      comment,
      date: new Date().toLocaleDateString('vi-VN')
    });
    
    // Cập nhật điểm trung bình
    this.rating = this.reviews.reduce((sum, review) => sum + review.rating, 0) / this.reviews.length;
    console.log(`Đã thêm đánh giá từ ${reviewer}: ${rating} sao`);
  }

  // Hiển thị chi tiết công thức
  displayDetails() {
    console.log('\n🍳 CHI TIẾT CÔNG THỨC 🍳');
    console.log('─'.repeat(60));
    console.log(`📝 Tên: ${this.name}`);
    console.log(`⏱️  Thời gian nấu: ${this.cookingTime} phút`);
    console.log(`📊 Độ khó: ${this.difficulty}`);
    console.log(`📂 Danh mục: ${this.category}`);
    console.log(`⭐ Đánh giá: ${this.rating.toFixed(1)}/5 (${this.reviews.length} đánh giá)`);
    console.log(`📅 Ngày tạo: ${this.createdDate}`);
    
    console.log('\n🥕 NGUYÊN LIỆU:');
    this.ingredients.forEach((ingredient, index) => {
      console.log(`  ${index + 1}. ${ingredient}`);
    });
    
    console.log('\n👨‍🍳 HƯỚNG DẪN NẤU:');
    this.instructions.forEach((step, index) => {
      console.log(`  Bước ${index + 1}: ${step}`);
    });
    
    if (this.reviews.length > 0) {
      console.log('\n💬 ĐÁNH GIÁ:');
      this.reviews.forEach(review => {
        const stars = '⭐'.repeat(review.rating);
        console.log(`  ${stars} ${review.reviewer}: ${review.comment} (${review.date})`);
      });
    }
    console.log('─'.repeat(60));
  }
}

// 2. Quản lý sách công thức
class RecipeBook {
  constructor() {
    this.recipes = [];
    this.nextId = 1;
  }

  // Thêm công thức mới
  addRecipe(name, ingredients, instructions, cookingTime, difficulty, category) {
    if (!name || name.trim() === '') {
      throw new Error('Tên công thức không được để trống.');
    }
    if (!ingredients || ingredients.length === 0) {
      throw new Error('Công thức phải có ít nhất một nguyên liệu.');
    }
    if (!instructions || instructions.length === 0) {
      throw new Error('Công thức phải có hướng dẫn nấu.');
    }
    if (cookingTime <= 0) {
      throw new Error('Thời gian nấu phải lớn hơn 0.');
    }

    const recipe = new Recipe(
      this.nextId++,
      name.trim(),
      ingredients,
      instructions,
      cookingTime,
      difficulty,
      category
    );
    
    this.recipes.push(recipe);
    console.log(`✅ Đã thêm công thức: ${recipe.name}`);
  }

  // Tìm kiếm công thức theo tên
  searchByName(keyword) {
    const lower = keyword.toLowerCase();
    return this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(lower)
    );
  }

  // Tìm kiếm công thức theo nguyên liệu
  searchByIngredient(ingredient) {
    const lower = ingredient.toLowerCase();
    return this.recipes.filter(recipe =>
      recipe.ingredients.some(ing => 
        ing.toLowerCase().includes(lower)
      )
    );
  }

  // Tìm kiếm tổng hợp (tên hoặc nguyên liệu)
  searchRecipes(keyword) {
    const lower = keyword.toLowerCase();
    return this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(lower) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(lower)) ||
      recipe.category.toLowerCase().includes(lower)
    );
  }

  // Hiển thị tất cả công thức
  listAllRecipes() {
    if (this.recipes.length === 0) {
      console.log('📚 Sách công thức trống.');
      return;
    }

    console.log('\n📚 DANH SÁCH CÔNG THỨC 📚');
    console.log('─'.repeat(80));
    console.log('ID | Tên công thức'.padEnd(30) + '| Thời gian'.padEnd(12) + '| Độ khó'.padEnd(10) + '| Danh mục'.padEnd(15) + '| Đánh giá');
    console.log('─'.repeat(80));

    this.recipes.forEach(recipe => {
      const name = recipe.name.padEnd(25);
      const time = `${recipe.cookingTime}p`.padEnd(10);
      const difficulty = recipe.difficulty.padEnd(8);
      const category = recipe.category.padEnd(13);
      const rating = `${recipe.rating.toFixed(1)}⭐`;
      console.log(`${recipe.id.toString().padEnd(3)} | ${name} | ${time} | ${difficulty} | ${category} | ${rating}`);
    });
    console.log('─'.repeat(80));
  }

  // Xem chi tiết công thức
  viewRecipe(id) {
    const recipe = this.recipes.find(r => r.id === id);
    if (!recipe) {
      throw new Error(`Không tìm thấy công thức với ID ${id}.`);
    }
    recipe.displayDetails();
  }

  // Xóa công thức
  removeRecipe(id) {
    const index = this.recipes.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error(`Không tìm thấy công thức với ID ${id}.`);
    }
    const [removed] = this.recipes.splice(index, 1);
    console.log(`🗑️  Đã xóa công thức: ${removed.name}`);
  }

  // Sắp xếp theo thời gian nấu
  sortByCookingTime() {
    this.recipes.sort((a, b) => a.cookingTime - b.cookingTime);
    console.log('🕐 Đã sắp xếp theo thời gian nấu (tăng dần).');
  }

  // Sắp xếp theo đánh giá
  sortByRating() {
    this.recipes.sort((a, b) => b.rating - a.rating);
    console.log('⭐ Đã sắp xếp theo đánh giá (cao nhất trước).');
  }

  // Lọc theo danh mục
  filterByCategory(category) {
    return this.recipes.filter(recipe => 
      recipe.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Lọc theo độ khó
  filterByDifficulty(difficulty) {
    return this.recipes.filter(recipe => 
      recipe.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  }

  // Thống kê
  getStats() {
    if (this.recipes.length === 0) {
      console.log('📊 Chưa có dữ liệu thống kê.');
      return;
    }

    const totalRecipes = this.recipes.length;
    const avgRating = this.recipes.reduce((sum, r) => sum + r.rating, 0) / totalRecipes;
    const avgCookingTime = this.recipes.reduce((sum, r) => sum + r.cookingTime, 0) / totalRecipes;
    
    const categories = {};
    const difficulties = {};
    
    this.recipes.forEach(recipe => {
      categories[recipe.category] = (categories[recipe.category] || 0) + 1;
      difficulties[recipe.difficulty] = (difficulties[recipe.difficulty] || 0) + 1;
    });

    console.log('\n📊 THỐNG KÊ SÁCH CÔNG THỨC');
    console.log(`📝 Tổng số công thức: ${totalRecipes}`);
    console.log(`⭐ Đánh giá trung bình: ${avgRating.toFixed(1)}/5`);
    console.log(`⏱️  Thời gian nấu trung bình: ${avgCookingTime.toFixed(0)} phút`);
    
    console.log('\n📂 Theo danh mục:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} công thức`);
    });
    
    console.log('\n📊 Theo độ khó:');
    Object.entries(difficulties).forEach(([difficulty, count]) => {
      console.log(`  ${difficulty}: ${count} công thức`);
    });
  }
}

// 3. Demo dữ liệu mẫu
const recipeBook = new RecipeBook();

// Thêm một số công thức mẫu
try {
  recipeBook.addRecipe(
    'Cơm rang thập cẩm',
    ['Gạo nấu chín', 'Trứng gà', 'Thịt bò', 'Rau cải', 'Hành lá', 'Dầu ăn', 'Nước mắm'],
    [
      'Đánh trứng và chiên chín, để riêng',
      'Xào thịt bò với dầu ăn',
      'Thêm gạo và đảo đều',
      'Cho rau cải và trứng vào',
      'Nêm nước mắm vừa ăn',
      'Rắc hành lá và tắt bếp'
    ],
    20,
    'Trung bình',
    'Món chính'
  );

  recipeBook.addRecipe(
    'Canh chua cá lóc',
    ['Cá lóc', 'Dứa', 'Cà chua', 'Đậu bắp', 'Bạc hà', 'Nước dừa', 'Me'],
    [
      'Làm sạch cá và cắt khúc',
      'Nấu nước dừa với me',
      'Cho cá vào nấu chín',
      'Thêm dứa, cà chua, đậu bắp',
      'Nêm gia vị vừa ăn',
      'Thêm bạc hà và tắt bếp'
    ],
    30,
    'Dễ',
    'Món chính'
  );

  recipeBook.addRecipe(
    'Bánh flan',
    ['Trứng gà', 'Sữa tươi', 'Đường', 'Vanilla'],
    [
      'Đánh tan trứng với đường',
      'Đun sữa với vanilla',
      'Trộn hỗn hợp trứng và sữa',
      'Lọc qua rây',
      'Đổ vào khuôn và hấp 20 phút'
    ],
    25,
    'Dễ',
    'Tráng miệng'
  );

} catch (e) {
  console.error(e.message);
}

// 4. Giao diện người dùng
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('\n🍳 SÁCH CÔNG THỨC NẤU ĂN 🍳');
  console.log('1. Thêm công thức mới');
  console.log('2. Xem tất cả công thức');
  console.log('3. Tìm kiếm công thức');
  console.log('4. Xem chi tiết công thức');
  console.log('5. Xóa công thức');
  console.log('6. Sắp xếp công thức');
  console.log('7. Lọc công thức');
  console.log('8. Thêm đánh giá');
  console.log('9. Thống kê');
  console.log('0. Thoát');
  rl.question('Chọn chức năng: ', handleMenu);
}

function handleMenu(choice) {
  switch (choice.trim()) {
    case '1':
      addRecipeFlow();
      break;
    case '2':
      recipeBook.listAllRecipes();
      showMenu();
      break;
    case '3':
      searchRecipeFlow();
      break;
    case '4':
      viewRecipeFlow();
      break;
    case '5':
      removeRecipeFlow();
      break;
    case '6':
      sortRecipeFlow();
      break;
    case '7':
      filterRecipeFlow();
      break;
    case '8':
      addReviewFlow();
      break;
    case '9':
      recipeBook.getStats();
      showMenu();
      break;
    case '0':
      rl.close();
      break;
    default:
      console.log('❌ Lựa chọn không hợp lệ.');
      showMenu();
  }
}

function addRecipeFlow() {
  rl.question('Nhập tên công thức: ', (name) => {
    rl.question('Nhập thời gian nấu (phút): ', (cookingTime) => {
      rl.question('Nhập độ khó (Dễ/Trung bình/Khó): ', (difficulty) => {
        rl.question('Nhập danh mục (Món chính/Món phụ/Tráng miệng/Đồ uống): ', (category) => {
          console.log('Nhập nguyên liệu (mỗi dòng một nguyên liệu, nhập "done" để kết thúc):');
          const ingredients = [];
          
          function addIngredient() {
            rl.question('', (ingredient) => {
              if (ingredient.toLowerCase() === 'done') {
                console.log('Nhập hướng dẫn nấu (mỗi dòng một bước, nhập "done" để kết thúc):');
                const instructions = [];
                
                function addInstruction() {
                  rl.question('', (instruction) => {
                    if (instruction.toLowerCase() === 'done') {
                      try {
                        recipeBook.addRecipe(
                          name,
                          ingredients,
                          instructions,
                          Number(cookingTime),
                          difficulty,
                          category
                        );
                      } catch (e) {
                        console.error('❌ Lỗi:', e.message);
                      }
                      showMenu();
                    } else {
                      instructions.push(instruction);
                      addInstruction();
                    }
                  });
                }
                addInstruction();
              } else {
                ingredients.push(ingredient);
                addIngredient();
              }
            });
          }
          addIngredient();
        });
      });
    });
  });
}

function searchRecipeFlow() {
  console.log('\n🔍 TÌM KIẾM CÔNG THỨC');
  console.log('1. Tìm theo tên');
  console.log('2. Tìm theo nguyên liệu');
  console.log('3. Tìm tổng hợp');
  rl.question('Chọn loại tìm kiếm: ', (choice) => {
    rl.question('Nhập từ khóa tìm kiếm: ', (keyword) => {
      let results = [];
      
      switch (choice.trim()) {
        case '1':
          results = recipeBook.searchByName(keyword);
          break;
        case '2':
          results = recipeBook.searchByIngredient(keyword);
          break;
        case '3':
          results = recipeBook.searchRecipes(keyword);
          break;
        default:
          console.log('❌ Lựa chọn không hợp lệ.');
          showMenu();
          return;
      }
      
      if (results.length === 0) {
        console.log('🔍 Không tìm thấy công thức nào.');
      } else {
        console.log(`🔍 Tìm thấy ${results.length} công thức:`);
        results.forEach(recipe => {
          console.log(`  ${recipe.id}. ${recipe.name} (${recipe.cookingTime}p - ${recipe.difficulty})`);
        });
      }
      showMenu();
    });
  });
}

function viewRecipeFlow() {
  rl.question('Nhập ID công thức cần xem: ', (id) => {
    try {
      recipeBook.viewRecipe(Number(id));
    } catch (e) {
      console.error('❌ Lỗi:', e.message);
    }
    showMenu();
  });
}

function removeRecipeFlow() {
  rl.question('Nhập ID công thức cần xóa: ', (id) => {
    try {
      recipeBook.removeRecipe(Number(id));
    } catch (e) {
      console.error('❌ Lỗi:', e.message);
    }
    showMenu();
  });
}

function sortRecipeFlow() {
  console.log('\n🔄 SẮP XẾP CÔNG THỨC');
  console.log('1. Theo thời gian nấu');
  console.log('2. Theo đánh giá');
  rl.question('Chọn cách sắp xếp: ', (choice) => {
    switch (choice.trim()) {
      case '1':
        recipeBook.sortByCookingTime();
        recipeBook.listAllRecipes();
        break;
      case '2':
        recipeBook.sortByRating();
        recipeBook.listAllRecipes();
        break;
      default:
        console.log('❌ Lựa chọn không hợp lệ.');
    }
    showMenu();
  });
}

function filterRecipeFlow() {
  console.log('\n🔍 LỌC CÔNG THỨC');
  console.log('1. Theo danh mục');
  console.log('2. Theo độ khó');
  rl.question('Chọn cách lọc: ', (choice) => {
    switch (choice.trim()) {
      case '1':
        rl.question('Nhập danh mục (Món chính/Món phụ/Tráng miệng/Đồ uống): ', (category) => {
          const results = recipeBook.filterByCategory(category);
          if (results.length === 0) {
            console.log('🔍 Không tìm thấy công thức nào trong danh mục này.');
          } else {
            console.log(`🔍 Tìm thấy ${results.length} công thức trong danh mục "${category}":`);
            results.forEach(recipe => {
              console.log(`  ${recipe.id}. ${recipe.name} (${recipe.cookingTime}p)`);
            });
          }
          showMenu();
        });
        break;
      case '2':
        rl.question('Nhập độ khó (Dễ/Trung bình/Khó): ', (difficulty) => {
          const results = recipeBook.filterByDifficulty(difficulty);
          if (results.length === 0) {
            console.log('🔍 Không tìm thấy công thức nào với độ khó này.');
          } else {
            console.log(`🔍 Tìm thấy ${results.length} công thức với độ khó "${difficulty}":`);
            results.forEach(recipe => {
              console.log(`  ${recipe.id}. ${recipe.name} (${recipe.cookingTime}p)`);
            });
          }
          showMenu();
        });
        break;
      default:
        console.log('❌ Lựa chọn không hợp lệ.');
        showMenu();
    }
  });
}

function addReviewFlow() {
  rl.question('Nhập ID công thức cần đánh giá: ', (id) => {
    const recipe = recipeBook.recipes.find(r => r.id === Number(id));
    if (!recipe) {
      console.log('❌ Không tìm thấy công thức với ID này.');
      showMenu();
      return;
    }
    
    rl.question('Nhập tên người đánh giá: ', (reviewer) => {
      rl.question('Nhập điểm đánh giá (1-5): ', (rating) => {
        rl.question('Nhập nhận xét: ', (comment) => {
          try {
            recipe.addReview(reviewer, Number(rating), comment);
          } catch (e) {
            console.error('❌ Lỗi:', e.message);
          }
          showMenu();
        });
      });
    });
  });
}

rl.on('close', () => {
  console.log('👋 Cảm ơn bạn đã sử dụng Sách công thức nấu ăn!');
  process.exit(0);
});

// Bắt đầu ứng dụng
console.log('🍳 CHÀO MỪNG ĐẾN VỚI SÁCH CÔNG THỨC NẤU ĂN 🍳');
showMenu();
