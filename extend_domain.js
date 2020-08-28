
function add_margin(inarray){

    let max_value = Math.max.apply(null, inarray.map(Math.abs));
    
    if (inarray[0]==0 && inarray[1]>0){
        inarray[0] = inarray[0] - (max_value*0.01);
        inarray[1] = inarray[1] + (max_value*0.01);
        console.log(1);
        return inarray;
    }

    if (inarray[0]==0 && inarray[1]<0){
        inarray[0] = inarray[0] + (max_value*0.01);
        inarray[1] = inarray[1] - (max_value*0.01);
        console.log(2);
        return inarray;
    }

    if (inarray[1]==0 && inarray[0]>0){
        inarray[1] = inarray[1] - (max_value*0.01);
        inarray[0] = inarray[0] + (max_value*0.01);
        console.log(3);
        return inarray;
    }

    if (inarray[1]==0 && inarray[0]<0){
        inarray[1] = inarray[1] + (max_value*0.01);
        inarray[0] = inarray[0] - (max_value*0.01);
        console.log(4);
        return inarray;
    }

    if (inarray[0]>0 && inarray[1]>0){
        if (inarray[0] < inarray[1] ) {
            inarray[0] = inarray[0] - (max_value*0.01)
            inarray[1] = inarray[1] + (max_value*0.01)
            console.log(5);
            return inarray;
        }
    }

    if (inarray[0]<0 && inarray[1]<0){
        if  (inarray[0] > inarray[1]){
            inarray[0] = inarray[0] + (max_value*0.01)
            inarray[1] = inarray[1] - (max_value*0.01)
            console.log(6);
            return inarray;
        }

    }

    if (inarray[0]<0 && inarray[1]>0){
        
        inarray[0] = inarray[0] - (max_value*0.01)
        inarray[1] = inarray[1] + (max_value*0.01)
        console.log(61);
        return inarray;
        

    }

    if (inarray[0]>0 && inarray[1]<0){
        
        inarray[0] = inarray[0] + (max_value*0.01)
        inarray[1] = inarray[1] - (max_value*0.01)
        console.log(71);
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