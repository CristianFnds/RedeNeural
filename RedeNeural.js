/*
Notações:
 o -> output
 i -> input
 i_nodes -> input nodes
 o_nodes -> output nodes
 ih -> input to hidden
 ho -> hidden to output
*/

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function dsigmoid(x) {
    return x * (1 - x);
}

class RedeNeural {
    constructor(i_nodes, h_nodes, o_nodes) {
        this.i_nodes = i_nodes;
        this.h_nodes = h_nodes;
        this.o_nodes = o_nodes;

        this.bias_ih = new Matriz(this.h_nodes, 1);
        this.bias_ih.randomize();

        this.bias_ho = new Matriz(this.o_nodes, 1);
        this.bias_ho.randomize();

        this.weigths_ih = new Matriz(this.h_nodes, this.i_nodes)
        this.weigths_ih.randomize();

        this.weigths_ho = new Matriz(this.o_nodes, this.h_nodes)
        this.weigths_ho.randomize();

        this.learning_rate = 0.1;
    }

    train(arr, target) {

        //input -> hidden
        let input = Matriz.arrayToMatriz(arr);
        let hidden = Matriz.multiply(this.weigths_ih, input);
        hidden = Matriz.add(hidden, this.bias_ih);

        hidden.map(sigmoid)

        // hidden -> output
        let output = Matriz.multiply(this.weigths_ho, hidden)
        output = Matriz.add(output, this.bias_ho)
        output.map(sigmoid);

        //BackPropagation

        //Output -> hidden
        let expected = Matriz.arrayToMatriz(target);
        let output_error = Matriz.subtract(expected, output);
        let d_output = Matriz.map(output, dsigmoid);
        let hidden_T = Matriz.transpose(hidden);

        let gradient = Matriz.hadamard(d_output,output_error );
        gradient = Matriz.escalar_multiply(gradient, this.learning_rate);

        //Ajuste Bais ocuto para outoput
        this.bias_ho = Matriz.add(this.bias_ho,gradient);

        let weigth_ho_deltas = Matriz.multiply(gradient, hidden_T);
        this.weigths_ho = Matriz.add(this.weigths_ho, weigth_ho_deltas)

        //hidden -> input
        let weigths_ho_T = Matriz.transpose(this.weigths_ho);
        let hidden_error = Matriz.multiply(weigths_ho_T, output_error);
        let d_hidden = Matriz.map(hidden, dsigmoid);
        let input_T = Matriz.transpose(input);

        let gradient_H = Matriz.hadamard(d_hidden,hidden_error);
        gradient_H = Matriz.escalar_multiply(gradient_H, this.learning_rate);

        //Ajuste Bais entrada para oculto
        this.bias_ih = Matriz.add(this.bias_ih,gradient_H);

        let weigth_ih_deltas = Matriz.multiply(gradient_H, input_T);
        this.weigths_ih = Matriz.add(this.weigths_ih, weigth_ih_deltas);
    }


    predict(arr){
         //input -> hidden
         let input = Matriz.arrayToMatriz(arr);
         let hidden = Matriz.multiply(this.weigths_ih, input);
         hidden = Matriz.add(hidden, this.bias_ih);
 
         hidden.map(sigmoid)
 
         // hidden -> output
         let output = Matriz.multiply(this.weigths_ho, hidden)
         output = Matriz.add(output, this.bias_ho)
         output.map(sigmoid);
         output = Matriz.matrizToArray(output);

        return output;
    }
}