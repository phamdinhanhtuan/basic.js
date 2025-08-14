   function secondLargest(arr) {
       const uniqueArr = [...new Set(arr)];
       uniqueArr.sort((a, b) => b - a);
       return uniqueArr[1] !== undefined ? uniqueArr[1] : null;
   }
