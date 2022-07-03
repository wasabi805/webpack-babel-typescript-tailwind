import { user } from "./js/test";

function Component(){
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack', user.name], ' ');
    return element;
}

document.body.appendChild(Component());