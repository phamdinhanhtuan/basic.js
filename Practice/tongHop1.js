/*
Bài tập cơ bản về ngôn ngữ lập trình C
----------------------------------------
*/

#include <stdio.h>

// Bài 1: In "Hello World"
void hello_world() {
    printf("Hello World!\n");
}

// Bài 2: Tính tổng hai số
int add_numbers(int a, int b) {
    return a + b;
}

// Bài 3: Kiểm tra số chẵn lẻ
void check_even_odd(int num) {
    if(num % 2 == 0) {
        printf("%d là số chẵn\n", num);
    } else {
        printf("%d là số lẻ\n", num);
    }
}

// Bài 4: Tính giai thừa của một số
int factorial(int n) {
    if(n == 0 || n == 1) return 1;
    return n * factorial(n - 1);
}

// Bài 5: In dãy Fibonacci
void fibonacci(int n) {
    int t1 = 0, t2 = 1, nextTerm;
    printf("Dãy Fibonacci %d số: ", n);
    
    for(int i = 1; i <= n; i++) {
        printf("%d ", t1);
        nextTerm = t1 + t2;
        t1 = t2;
        t2 = nextTerm;
    }
    printf("\n");
}

int main() {
    // Test bài 1
    printf("\nBài 1: Hello World\n");
    hello_world();
    
    // Test bài 2
    printf("\nBài 2: Tính tổng\n");
    int sum = add_numbers(5, 3);
    printf("Tổng của 5 và 3 là: %d\n", sum);
    
    // Test bài 3
    printf("\nBài 3: Kiểm tra chẵn lẻ\n");
    check_even_odd(7);
    check_even_odd(10);
    
    // Test bài 4
    printf("\nBài 4: Tính giai thừa\n");
    printf("Giai thừa của 5 là: %d\n", factorial(5));
    
    // Test bài 5
    printf("\nBài 5: Dãy Fibonacci\n");
    fibonacci(10);
    
    return 0;
} 
