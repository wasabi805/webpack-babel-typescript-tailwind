
import { test } from './js/test'

function Component(){
    const element = document.createElement('div');
    element.innerHTML = ['Hello', 'webpack', test, 'hello again!!!!'].join(' ');
    return element;
}

document.body.appendChild(Component());