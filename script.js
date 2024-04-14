function fibonaci(n){
    if(n==0 | n==1)return n;
    return fibonaci(n-1)+fibonaci(n-2);
}
function factorial(n){
    if(n==0)return 1;
    return n*factorial(n-1);
}
function power(n,k){
    if(k==0)return 1;
    if(k%2==0){
        var p=power(n,k/2);
        return p*p;
    }else{
        var p=power(n,Math.floor(k/2));
        return n*p*p;
    }
}
function print(n){
    if(n<0)return;
    print(n-1);
    console.log(power(2,n));
}
function line(x1,y1,x2,y2){
    brush.beginPath();
    brush.moveTo(x1,y1);
    brush.lineTo(x2,y2);
    brush.lineWidth=1;
    brush.lineCap="round";
    brush.strokeStyle='#00ef7f';
    brush.stroke();
}
function printTree(x1,y1,x2,y2,n){
    if(n<0)return;

    line(x1,y1,x2,y2);

    var vx=x2-x1;
    var vy=y2-y1;
    var ugao=Math.atan2(vy,vx);
    var length=n*4;
    var offset=Math.PI/8;
    ugao-=offset;
    printTree(x2,y2,x2+Math.cos(ugao)*length,y2+Math.sin(ugao)*length,n-1);
    ugao+=2*offset;
    printTree(x2,y2,x2+Math.cos(ugao)*length,y2+Math.sin(ugao)*length,n-1);
}

var canvas=document.getElementsByTagName('canvas')[0];
var brush=canvas.getContext('2d');

canvas.width=500;
canvas.height=500;

function kvadrat(width,height,n){
    if(n<0)return;
    brush.beginPath();
    brush.fillStyle=`rgb(0,${n/5*255},0)`;
    brush.rect(100,100,width,height);
    brush.fill();
    kvadrat(width*0.9,height*0.9,n-1);
}
kvadrat(400,400,5)
