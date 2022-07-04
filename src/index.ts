import { test } from './js/test'
import "./style/input.css";
import img from './images/webpack-icon.png'

function Component(){
    const element = document.createElement('div');

    const docFragment = document.createDocumentFragment();
    docFragment.appendChild(element)

    const image = document.createElement('img')
    image.id = 'webpack-logo'
    image.src = img
    
    element.append(['Hello', 'webpack', test, 'hello again!!!!'].join(' '))
    element.appendChild(image)

    return element;
}

document.body.append(Component());