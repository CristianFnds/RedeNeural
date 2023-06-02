class Matriz {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];

        for (let i = 0; i < rows; i++) {
            let arr = [];
            for (let j = 0; j < cols; j++) {
                arr.push(0)
            }
            this.data.push(arr);
        }
    }

    static arrayToMatriz(arr) {
        let matrix = new Matriz(arr.length, 1);
        matrix.map((elm, i, j) => {
            return arr[i];
        })

        return matrix;
    }

    static matrizToArray(obj){
        let arr = [];
        obj.map((elm,i,j)=>{
          arr.push(elm)  
        })

        return arr;
    }

    print() {
        console.table(this.data);
    }

    randomize() {
        this.map((elm, i, j) => {
           return Math.random() * 2 - 1;
        })
    }

    static map(A, func) {
        let matrix = new Matriz(A.rows, A.cols)

        matrix.data = A.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j);
            })
        })

        return matrix;
    }

    map(func) {
        this.data = this.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j);
            })
        })
        return this;
    }

    static transpose(A){
      
        var matriz = new Matriz(A.cols, A.rows);
        matriz.map((num,i,j)=>{
            return A.data[j][i];
        } )
        
        return matriz;
    }

    static escalar_multiply(A, escalar) {
      
        var matriz = new Matriz(A.rows, A.cols);
        matriz.map((num, i, j) => {
            return A.data[i][j] * escalar;
        });
        return matriz;
    }

    static hadamard(A, B) {

        var matriz = new Matriz(A.rows, A.cols);
        matriz.map((num, i, j) => {
            return A.data[i][j] * B.data[i][j]
        });
        return matriz;
    }

    static subtract(A, B) {

        var matriz = new Matriz(A.rows, A.cols);
        matriz.map((num, i, j) => {
            return A.data[i][j] - B.data[i][j]
        });
        return matriz;
    }


    static add(A, B) {

        var matriz = new Matriz(A.rows, A.cols);
        matriz.map((num, i, j) => {
            return A.data[i][j] + B.data[i][j]
        });
        return matriz;
    }

    static multiply(A, B) {
        var matriz = new Matriz(A.rows, B.cols);

        matriz.map((num, i, j) => {
            let sum = 0;
            for (let k = 0; k < A.cols; k++) {
                let elm1 = A.data[i][k];
                let elm2 = B.data[k][j];
                sum += elm1 * elm2;
            }
            return sum;
        })

        return matriz;
    }
}