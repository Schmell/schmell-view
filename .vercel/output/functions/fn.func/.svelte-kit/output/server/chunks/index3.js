import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function from(url) {
  const from2 = url.searchParams.get("from");
  if (from2) {
    return from2;
  }
  return "";
}
function getHref(website) {
  if (!website)
    return null;
  if (isUrl(website))
    ;
  return `http://${website}`;
}
const themes = [
  "dark",
  "light",
  "cupcake",
  "bumblebee",
  "emerald",
  "coporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter"
];
const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;
function isUrl(string) {
  if (typeof string !== "string") {
    return false;
  }
  const match = string.match(protocolAndDomainRE);
  if (!match) {
    return false;
  }
  const everythingAfterProtocol = match[1];
  if (!everythingAfterProtocol) {
    return false;
  }
  if (localhostDomainRE.test(everythingAfterProtocol) || nonLocalhostDomainRE.test(everythingAfterProtocol)) {
    return true;
  }
  return false;
}
export {
  cn as a,
  capitalizeFirstLetter as c,
  from as f,
  getHref as g,
  isUrl as i,
  themes as t
};
