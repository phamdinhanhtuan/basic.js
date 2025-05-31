   function countCharacters(str) {
       const count = {};
       for (const char of str) {
           count[char] = (count[char] || 0) + 1;
       }
       return count;
   }
