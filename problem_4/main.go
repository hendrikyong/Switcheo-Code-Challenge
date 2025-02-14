package main
import "fmt"

func sum_to_n_a(n int) int {
	//first way is using loop
	sum := 0
	for i := 1; i <= n; i++ {
		sum += i
	}
	return sum
}

func sum_to_n_b(n int) int {
	//second way is to use recursive
	//define base case 
	if n == 0 {
		return 0
	}
	return n + sum_to_n_b(n-1)
}

func sum_to_n_c(n int) int {
	//last way is to use maths
	//for sum from 1 to n, 1 + n = to 2 + n-1
	sum := n * (n+1) /2
	return sum
}

func main() {
	//test cases 
	fmt.Println("sum_to_n_a")
	fmt.Println(sum_to_n_a(2))
	fmt.Println(sum_to_n_a(5))
	fmt.Println(sum_to_n_a(10))

	fmt.Println("")
	fmt.Println("sum_to_n_b")
	fmt.Println(sum_to_n_b(2))
	fmt.Println(sum_to_n_b(5))
	fmt.Println(sum_to_n_b(10))

	fmt.Println("")
	fmt.Println("sum_to_n_c")
	fmt.Println(sum_to_n_c(2))
	fmt.Println(sum_to_n_c(5))
	fmt.Println(sum_to_n_c(10))
}