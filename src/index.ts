import { pack, someFunction } from './js/constants'
import "./style/input.css";
import img from './images/webpack-icon.png'

function Component(){
    const docFragment = document.createDocumentFragment();

    const wrapper = document.createElement('div');
    const header = document.createElement('h1')
    const headerText = document.createTextNode(['Web', pack].join(''))
    const logo = document.createElement('div')
    const image = document.createElement('img')
    
    wrapper.className='wrapper'
    header.className='header'
    header.appendChild(headerText)
    logo.className = 'logo'
    image.src = img
    logo.appendChild(image)
    console.log('hi')

    docFragment.appendChild(wrapper)

    wrapper.append(header)
    wrapper.appendChild(logo)

    return wrapper;
}

document.body.append(Component());