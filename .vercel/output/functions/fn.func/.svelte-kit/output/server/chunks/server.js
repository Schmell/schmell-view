import { r as redirect$1 } from "./index.js";
const decode = decodeURIComponent;
const pairSplitRegExp = /; */;
function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  let obj = {};
  let opt = options || {};
  let pairs = str.split(pairSplitRegExp);
  let dec = opt.decode || decode;
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i];
    let eq_idx = pair.indexOf("=");
    if (eq_idx < 0) {
      continue;
    }
    let key = pair.substr(0, eq_idx).trim();
    let val = pair.substr(++eq_idx, pair.length).trim();
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }
    if (void 0 == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }
  return obj;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e) {
    return str;
  }
}
const cookieName = "flash";
const flashCookieOptions = {
  path: "/",
  maxAge: 120,
  httpOnly: false,
  sameSite: "strict"
};
function loadFlash(cb) {
  return async (event) => {
    const flash = _loadFlash(event).flash;
    const loadFunction = await cb(event);
    return { flash, ...loadFunction };
  };
}
function _loadFlash(event) {
  const header = event.request.headers.get("cookie") || "";
  if (!header.includes(cookieName + "=")) {
    return { [cookieName]: void 0 };
  }
  const cookies = parse(header);
  const dataString = cookies[cookieName];
  let data = void 0;
  if (dataString) {
    const setFetchDest = event.request.headers.get("sec-fetch-dest");
    const accept = event.request.headers.get("accept");
    if (event.isDataRequest || setFetchDest == "empty" || accept == "*/*" || accept?.includes("application/json"))
      ;
    else {
      event.cookies.delete(cookieName, { path: flashCookieOptions.path });
    }
    try {
      data = JSON.parse(dataString);
    } catch (e) {
    }
  }
  return {
    [cookieName]: data
  };
}
function redirect(status, location, message, event) {
  switch (arguments.length) {
    case 2:
      if (typeof status === "number") {
        return realRedirect(status, `${location}`);
      } else {
        const message2 = status;
        const event2 = location;
        const redirectUrl = new URL(event2.url);
        for (const [key] of redirectUrl.searchParams) {
          if (key.startsWith("/")) {
            redirectUrl.searchParams.delete(key);
          }
          break;
        }
        return realRedirect(303, redirectUrl, message2, event2);
      }
    case 3:
      return realRedirect(303, status, location, message);
    case 4:
      return realRedirect(status, location, message, event);
    default:
      throw new Error("Invalid redirect arguments");
  }
}
function realRedirect(status, location, message, event) {
  if (!message)
    return redirect$1(status, location.toString());
  if (!event)
    throw new Error("RequestEvent is required for redirecting with flash message");
  event.cookies.set(cookieName, JSON.stringify(message), flashCookieOptions);
  return redirect$1(status, location.toString());
}
function setFlash(message, event) {
  const cookies = "cookies" in event ? event.cookies : event;
  cookies.set(cookieName, JSON.stringify(message), flashCookieOptions);
}
export {
  loadFlash as l,
  redirect as r,
  setFlash as s
};
