import { user, someFunction } from './js/constants'
import "./style/input.css";
import img from './images/webpack-icon.png'

function Component(){
    const docFragment = document.createDocumentFragment();

    const element = document.createElement('div');
    const logo = document.createElement('div')
    const image = document.createElement('img')
    
    logo.className = 'logo'
    image.src = img
    image.style.cssText = 'width: 100%; height:100%;'
    logo.appendChild(image)


    docFragment.appendChild(element)

    element.append(['Hello', user].join(' '))
    element.appendChild(logo)

    return element;
}

document.body.append(Component());