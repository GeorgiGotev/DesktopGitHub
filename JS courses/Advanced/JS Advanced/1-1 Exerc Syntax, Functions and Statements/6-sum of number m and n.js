function solve(n,m){
    let sum=0;
    for(let i=Number(n);i<=Number(m);i++){
        sum+=i;
    }
    return sum;
}
solve('1', '5' );