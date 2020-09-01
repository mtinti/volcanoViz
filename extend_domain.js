
function add_margin(inarray) {
    //find the greatest absolute number
    let max_value = Math.max.apply(null, inarray.map(Math.abs));
    //and increase 1% margins
    console.log('adjusting margins');
    //
    if (inarray[0] == 0 && inarray[1] > 0) {
        inarray[0] = inarray[0] - (max_value * 0.01);
        inarray[1] = inarray[1] + (max_value * 0.01);
        console.log('first item 0, second item >0');
        return inarray;
    }

    if (inarray[0] == 0 && inarray[1] < 0) {
        inarray[0] = inarray[0] + (max_value * 0.01);
        inarray[1] = inarray[1] - (max_value * 0.01);
        console.log('first item 0, second item <0');
        return inarray;
    }

    if (inarray[1] == 0 && inarray[0] > 0) {
        inarray[1] = inarray[1] - (max_value * 0.01);
        inarray[0] = inarray[0] + (max_value * 0.01);
        console.log('second item 0, first item <0');
        return inarray;
    }

    if (inarray[1] == 0 && inarray[0] < 0) {
        inarray[1] = inarray[1] + (max_value * 0.01);
        inarray[0] = inarray[0] - (max_value * 0.01);
        console.log('second item 0, first item <0');
        return inarray;
    }

    if (inarray[0] > 0 && inarray[1] > 0) {
        if (inarray[0] < inarray[1]) {
            inarray[0] = inarray[0] - (max_value * 0.01)
            inarray[1] = inarray[1] + (max_value * 0.01)
            console.log('both > 0');
            return inarray;
        }
    }

    if (inarray[0] < 0 && inarray[1] < 0) {
        if (inarray[0] > inarray[1]) {
            inarray[0] = inarray[0] + (max_value * 0.01)
            inarray[1] = inarray[1] - (max_value * 0.01)
            console.log('both < 0');
            return inarray;
        }

    }

    if (inarray[0] < 0 && inarray[1] > 0) {

        inarray[0] = inarray[0] - (max_value * 0.01)
        inarray[1] = inarray[1] + (max_value * 0.01)
        console.log('second item >0, first item <0');
        return inarray;


    }

    if (inarray[0] > 0 && inarray[1] < 0) {

        inarray[0] = inarray[0] + (max_value * 0.01)
        inarray[1] = inarray[1] - (max_value * 0.01)
        console.log('second item <0, first item >0');
        return inarray;


    }

}

function test_extend(){
var domain = [0, 100];
console.log(add_margin(domain));
var domain = [0, -100];
console.log(add_margin(domain));
var domain = [100, 0];
console.log(add_margin(domain));
var domain = [-100, -0];
console.log(add_margin(domain));
var domain = [0.1, 10];
console.log(add_margin(domain));
var domain = [10, 0.1];
console.log(add_margin(domain));
var domain = [-0.1, -10];
console.log(add_margin(domain));
var domain = [-10, -0.1];
console.log(add_margin(domain));
var domain = [-10, 10];
console.log(add_margin(domain));
var domain = [10, -10];
console.log(add_margin(domain));
}





test_extend()