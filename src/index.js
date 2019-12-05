import img from './assets/imgs/vscode插件.png';
import './assets/css/mycss.css'

let image = new Image();

image.src = img;

document.body.appendChild(image);
console.log('Hello Webpack!');
document.getElementById('root').innerHTML = '<h1>hello222</h1>';

