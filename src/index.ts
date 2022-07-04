import { test } from './js/test'
import "./style/input.css";

function Component(){
    const element = document.createElement('div');
    element.innerHTML = ['Hello', 'webpack', test, 'hello again!!!!'].join(' ');
    return element;
}

document.body.appendChild(Component());