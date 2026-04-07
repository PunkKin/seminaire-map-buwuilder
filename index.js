const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d");

context.beginPath();
context.moveTo(75,50);
context.lineTo(100,75);
context.lineTo(100,25);
context.closePath();
context.fillStyle = "rgb(0,128,255)";
context.fill();
context.strokeStyle = "rgb(255,0,0)";
context.lineWidth = 5;
context.stroke();