import { pack, someFunction } from "./js/constants";
import "./style/input.scss";
import img from "./images/webpack-icon.png";

function Component() {
  const docFragment = document.createDocumentFragment();

  const wrapper = document.createElement("div");
  const header = document.createElement("h1");
  const headerText = document.createTextNode(["Web", pack].join(""));
  const logo = document.createElement("div");
  const image = document.createElement("img");

  const subTitle = document.createElement("h2");
  const subtitleText = document.createTextNode("A MUST HAVE TOOL");
  subTitle.append(subtitleText);
  subTitle.className = "from-a-different-sass-file";

  wrapper.className = "wrapper";
  header.className = "header";
  header.appendChild(headerText);
  logo.className = "logo";
  image.src = img;
  logo.appendChild(image);

  docFragment.appendChild(wrapper);

  wrapper.append(header);
  wrapper.appendChild(subTitle);
  wrapper.appendChild(logo);

  return wrapper;
}

document.body.append(Component());

export default Component