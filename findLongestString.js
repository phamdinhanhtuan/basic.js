   function findLongestString(arr) {
       let longest = '';
       for (const str of arr) {
           if (str.length > longest.length) {
               longest = str;
           }
       }
       return longest;
   }
