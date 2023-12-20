import { g as generateRandomString, i as isWithinExpiration } from "./date.js";
import { L as LuciaError } from "./error.js";
import { d as debug } from "./debug.js";
import { prisma } from "@lucia-auth/adapter-prisma";
import { p as prisma$1 } from "./prisma.js";
import { github, google, facebook } from "@lucia-auth/oauth/providers";
import { G as GITHUB_CLIENT_ID, c as GITHUB_CLIENT_SECRET, d as GOOGLE_CLIENT_ID, e as GOOGLE_CLIENT_SECRET, f as GOOGLE_CLIENT_REDIRECTURI, F as FACEBOOK_CLIENT_ID, g as FACEBOOK_CLIENT_SECRET, h as FACEBOOK_CLIENT_REDIRECTURI } from "./private.js";
const parseCookie = (str) => {
  const obj = {};
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (!(key in obj)) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val);
    }
    index = endIdx + 1;
  }
  return obj;
};
const serializeCookie = (name, val, options) => {
  const opt = options ?? {};
  const enc = opt.encode ?? encodeURIComponent;
  const value = enc(val);
  let str = name + "=" + value;
  if (null != opt.maxAge) {
    const maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    const expires = opt.expires;
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
};
const tryDecode = (str) => {
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
};
const DEFAULT_SESSION_COOKIE_NAME = "auth_session";
const createSessionCookie = (session, options) => {
  const getExpiration = () => {
    if (session === null)
      return 0;
    if (options.expires) {
      return session.idlePeriodExpiresAt;
    }
    return (/* @__PURE__ */ new Date()).getTime() + 1e3 * 60 * 60 * 24 * 365;
  };
  return new Cookie(options.name ?? DEFAULT_SESSION_COOKIE_NAME, session?.sessionId ?? "", {
    ...options.attributes,
    httpOnly: true,
    expires: new Date(getExpiration()),
    secure: options.env === "PROD"
  });
};
class Cookie {
  constructor(name, value, options) {
    this.name = name;
    this.value = value;
    this.attributes = options;
  }
  name;
  value;
  attributes;
  serialize = () => {
    return serializeCookie(this.name, this.value, this.attributes);
  };
}
const logError = (message) => {
  console.log("\x1B[31m%s\x1B[31m", `[LUCIA_ERROR] ${message}`);
};
const pbkdf2 = async (password, salt, options) => {
  const pwKey = await crypto.subtle.importKey("raw", password, "PBKDF2", false, ["deriveBits"]);
  const keyBuffer = await crypto.subtle.deriveBits({
    name: "PBKDF2",
    hash: "SHA-256",
    salt,
    iterations: options.c
  }, pwKey, options.dkLen * 8);
  return new Uint8Array(keyBuffer);
};
const u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
const nextTick = async () => {
};
function checkOpts(defaults, opts) {
  const merged = Object.assign(defaults, opts);
  return merged;
}
const asyncLoop = async (iters, tick, cb) => {
  let ts = Date.now();
  for (let i = 0; i < iters; i++) {
    cb(i);
    const diff = Date.now() - ts;
    if (diff >= 0 && diff < tick)
      continue;
    await nextTick();
    ts += diff;
  }
};
const rotl = (a, b) => a << b | a >>> 32 - b;
const XorAndSalsa = (prev, pi, input, ii, out, oi) => {
  const y00 = prev[pi++] ^ input[ii++], y01 = prev[pi++] ^ input[ii++];
  const y02 = prev[pi++] ^ input[ii++], y03 = prev[pi++] ^ input[ii++];
  const y04 = prev[pi++] ^ input[ii++], y05 = prev[pi++] ^ input[ii++];
  const y06 = prev[pi++] ^ input[ii++], y07 = prev[pi++] ^ input[ii++];
  const y08 = prev[pi++] ^ input[ii++], y09 = prev[pi++] ^ input[ii++];
  const y10 = prev[pi++] ^ input[ii++], y11 = prev[pi++] ^ input[ii++];
  const y12 = prev[pi++] ^ input[ii++], y13 = prev[pi++] ^ input[ii++];
  const y14 = prev[pi++] ^ input[ii++], y15 = prev[pi++] ^ input[ii++];
  let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
  for (let i = 0; i < 8; i += 2) {
    x04 ^= rotl(x00 + x12 | 0, 7);
    x08 ^= rotl(x04 + x00 | 0, 9);
    x12 ^= rotl(x08 + x04 | 0, 13);
    x00 ^= rotl(x12 + x08 | 0, 18);
    x09 ^= rotl(x05 + x01 | 0, 7);
    x13 ^= rotl(x09 + x05 | 0, 9);
    x01 ^= rotl(x13 + x09 | 0, 13);
    x05 ^= rotl(x01 + x13 | 0, 18);
    x14 ^= rotl(x10 + x06 | 0, 7);
    x02 ^= rotl(x14 + x10 | 0, 9);
    x06 ^= rotl(x02 + x14 | 0, 13);
    x10 ^= rotl(x06 + x02 | 0, 18);
    x03 ^= rotl(x15 + x11 | 0, 7);
    x07 ^= rotl(x03 + x15 | 0, 9);
    x11 ^= rotl(x07 + x03 | 0, 13);
    x15 ^= rotl(x11 + x07 | 0, 18);
    x01 ^= rotl(x00 + x03 | 0, 7);
    x02 ^= rotl(x01 + x00 | 0, 9);
    x03 ^= rotl(x02 + x01 | 0, 13);
    x00 ^= rotl(x03 + x02 | 0, 18);
    x06 ^= rotl(x05 + x04 | 0, 7);
    x07 ^= rotl(x06 + x05 | 0, 9);
    x04 ^= rotl(x07 + x06 | 0, 13);
    x05 ^= rotl(x04 + x07 | 0, 18);
    x11 ^= rotl(x10 + x09 | 0, 7);
    x08 ^= rotl(x11 + x10 | 0, 9);
    x09 ^= rotl(x08 + x11 | 0, 13);
    x10 ^= rotl(x09 + x08 | 0, 18);
    x12 ^= rotl(x15 + x14 | 0, 7);
    x13 ^= rotl(x12 + x15 | 0, 9);
    x14 ^= rotl(x13 + x12 | 0, 13);
    x15 ^= rotl(x14 + x13 | 0, 18);
  }
  out[oi++] = y00 + x00 | 0;
  out[oi++] = y01 + x01 | 0;
  out[oi++] = y02 + x02 | 0;
  out[oi++] = y03 + x03 | 0;
  out[oi++] = y04 + x04 | 0;
  out[oi++] = y05 + x05 | 0;
  out[oi++] = y06 + x06 | 0;
  out[oi++] = y07 + x07 | 0;
  out[oi++] = y08 + x08 | 0;
  out[oi++] = y09 + x09 | 0;
  out[oi++] = y10 + x10 | 0;
  out[oi++] = y11 + x11 | 0;
  out[oi++] = y12 + x12 | 0;
  out[oi++] = y13 + x13 | 0;
  out[oi++] = y14 + x14 | 0;
  out[oi++] = y15 + x15 | 0;
};
const BlockMix = (input, ii, out, oi, r) => {
  let head = oi + 0;
  let tail = oi + 16 * r;
  for (let i = 0; i < 16; i++)
    out[tail + i] = input[ii + (2 * r - 1) * 16 + i];
  for (let i = 0; i < r; i++, head += 16, ii += 16) {
    XorAndSalsa(out, tail, input, ii, out, head);
    if (i > 0)
      tail += 16;
    XorAndSalsa(out, head, input, ii += 16, out, tail);
  }
};
const scryptInit = async (password, salt, _opts) => {
  const opts = checkOpts({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1024 ** 3 + 1024
  }, _opts);
  const { N, r, p, dkLen, asyncTick, maxmem, onProgress } = opts;
  if (onProgress !== void 0 && typeof onProgress !== "function")
    throw new Error("progressCb should be function");
  const blockSize = 128 * r;
  const blockSize32 = blockSize / 4;
  if (N <= 1 || (N & N - 1) !== 0 || N >= 2 ** (blockSize / 8) || N > 2 ** 32) {
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  }
  if (p < 0 || p > (2 ** 32 - 1) * 32 / blockSize) {
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  }
  if (dkLen < 0 || dkLen > (2 ** 32 - 1) * 32) {
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  }
  const memUsed = blockSize * (N + p);
  if (memUsed > maxmem) {
    throw new Error(`Scrypt: parameters too large, ${memUsed} (128 * r * (N + p)) > ${maxmem} (maxmem)`);
  }
  const B = await pbkdf2(password, salt, { c: 1, dkLen: blockSize * p });
  const B32 = u32(B);
  const V = u32(new Uint8Array(blockSize * N));
  const tmp = u32(new Uint8Array(blockSize));
  let blockMixCb = () => {
  };
  if (onProgress) {
    const totalBlockMix = 2 * N * p;
    const callbackPer = Math.max(Math.floor(totalBlockMix / 1e4), 1);
    let blockMixCnt = 0;
    blockMixCb = () => {
      blockMixCnt++;
      if (onProgress && (!(blockMixCnt % callbackPer) || blockMixCnt === totalBlockMix))
        onProgress(blockMixCnt / totalBlockMix);
    };
  }
  return { N, r, p, dkLen, blockSize32, V, B32, B, tmp, blockMixCb, asyncTick };
};
const scrypt = async (password, salt, opts) => {
  const { N, r, p, dkLen, blockSize32, V, B32, B, tmp, blockMixCb, asyncTick } = await scryptInit(password, salt, opts);
  for (let pi = 0; pi < p; pi++) {
    const Pi = blockSize32 * pi;
    for (let i = 0; i < blockSize32; i++)
      V[i] = B32[Pi + i];
    let pos = 0;
    await asyncLoop(N - 1, asyncTick, (i) => {
      BlockMix(V, pos, V, pos += blockSize32, r);
      blockMixCb();
    });
    BlockMix(V, (N - 1) * blockSize32, B32, Pi, r);
    blockMixCb();
    await asyncLoop(N, asyncTick, (i) => {
      const j = B32[Pi + blockSize32 - 16] % N;
      for (let k = 0; k < blockSize32; k++)
        tmp[k] = B32[Pi + k] ^ V[j * blockSize32 + k];
      BlockMix(tmp, 0, B32, Pi, r);
      blockMixCb();
    });
  }
  const res = await pbkdf2(password, B, { c: 1, dkLen });
  B.fill(0);
  V.fill(0);
  tmp.fill(0);
  return res;
};
const generateScryptHash = async (s) => {
  const salt = generateRandomString(16);
  const key = await hashWithScrypt(s.normalize("NFKC"), salt);
  return `s2:${salt}:${key}`;
};
const hashWithScrypt = async (s, salt, blockSize = 16) => {
  const keyUint8Array = await scrypt(new TextEncoder().encode(s), new TextEncoder().encode(salt), {
    N: 16384,
    r: blockSize,
    p: 1,
    dkLen: 64
  });
  return convertUint8ArrayToHex(keyUint8Array);
};
const validateScryptHash = async (s, hash) => {
  const arr = hash.split(":");
  if (arr.length === 2) {
    const [salt2, key2] = arr;
    const targetKey = await hashWithScrypt(s.normalize("NFKC"), salt2, 8);
    const result = constantTimeEqual(targetKey, key2);
    return result;
  }
  if (arr.length !== 3)
    return false;
  const [version, salt, key] = arr;
  if (version === "s2") {
    const targetKey = await hashWithScrypt(s.normalize("NFKC"), salt);
    const result = constantTimeEqual(targetKey, key);
    return result;
  }
  return false;
};
const constantTimeEqual = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  const aUint8Array = new TextEncoder().encode(a);
  const bUint8Array = new TextEncoder().encode(b);
  let c = 0;
  for (let i = 0; i < a.length; i++) {
    c |= aUint8Array[i] ^ bUint8Array[i];
  }
  return c === 0;
};
const convertUint8ArrayToHex = (arr) => {
  return [...arr].map((x) => x.toString(16).padStart(2, "0")).join("");
};
const isValidDatabaseSession = (databaseSession) => {
  return isWithinExpiration(databaseSession.idle_expires);
};
class AuthRequest {
  auth;
  context;
  constructor(auth2, { context, csrfProtectionEnabled }) {
    debug.request.init(context.request.method, context.request.url);
    this.auth = auth2;
    this.context = context;
    try {
      if (csrfProtectionEnabled) {
        auth2.validateRequestOrigin(context.request);
      }
      this.storedSessionId = context.request.storedSessionCookie ?? auth2.readSessionCookie(context.request.headers.cookie);
    } catch (e) {
      this.storedSessionId = null;
    }
    this.bearerToken = auth2.readBearerToken(context.request.headers.authorization);
  }
  validatePromise = null;
  validateBearerTokenPromise = null;
  storedSessionId;
  bearerToken;
  setSession = (session) => {
    const sessionId = session?.sessionId ?? null;
    if (this.storedSessionId === sessionId)
      return;
    this.validatePromise = null;
    this.setSessionCookie(session);
  };
  setSessionCookie = (session) => {
    const sessionId = session?.sessionId ?? null;
    if (this.storedSessionId === sessionId)
      return;
    this.storedSessionId = sessionId;
    try {
      this.context.setCookie(this.auth.createSessionCookie(session));
      if (session) {
        debug.request.notice("Session cookie stored", session.sessionId);
      } else {
        debug.request.notice("Session cookie deleted");
      }
    } catch (e) {
    }
  };
  validate = async () => {
    if (this.validatePromise) {
      debug.request.info("Using cached result for session validation");
      return this.validatePromise;
    }
    this.validatePromise = new Promise(async (resolve) => {
      if (!this.storedSessionId)
        return resolve(null);
      try {
        const session = await this.auth.validateSession(this.storedSessionId);
        if (session.fresh) {
          this.setSessionCookie(session);
        }
        return resolve(session);
      } catch (e) {
        if (e instanceof LuciaError) {
          this.setSessionCookie(null);
          return resolve(null);
        }
        throw e;
      }
    });
    return await this.validatePromise;
  };
  validateBearerToken = async () => {
    if (this.validateBearerTokenPromise) {
      debug.request.info("Using cached result for bearer token validation");
      return this.validatePromise;
    }
    this.validatePromise = new Promise(async (resolve) => {
      if (!this.bearerToken)
        return resolve(null);
      try {
        const session = await this.auth.getSession(this.bearerToken);
        if (session.state === "idle")
          return resolve(null);
        return resolve(session);
      } catch (e) {
        if (e instanceof LuciaError) {
          return resolve(null);
        }
        throw e;
      }
    });
    return await this.validatePromise;
  };
}
const sveltekit = () => {
  return ({ args, sessionCookieName }) => {
    const [event] = args;
    const requestContext = {
      request: {
        url: event.request.url,
        method: event.request.method,
        headers: {
          origin: event.request.headers.get("Origin"),
          cookie: event.request.headers.get("Cookie"),
          authorization: event.request.headers.get("Authorization")
        },
        storedSessionCookie: event.cookies.get(sessionCookieName) ?? null
      },
      setCookie: (cookie) => {
        event.cookies.set(cookie.name, cookie.value, cookie.attributes);
      }
    };
    return requestContext;
  };
};
const lucia$1 = () => {
  return ({ args }) => args[0];
};
const isAllowedUrl = (incomingUrl, app) => {
  const getHostname = (urlParams) => {
    if (typeof urlParams === "string")
      return new URL(urlParams).hostname;
    return urlParams.hostname;
  };
  const incomingHostname = getHostname(incomingUrl);
  const appHostname = getHostname(app.url);
  const appBaseDomain = getBaseDomain(appHostname);
  if (incomingHostname === appHostname)
    return true;
  if (app.allowedSubdomains === "*") {
    if (incomingHostname.endsWith(`.${appBaseDomain}`))
      return true;
    return false;
  }
  const allowedHosts = app.allowedSubdomains.map((subdomain) => {
    return [subdomain, appBaseDomain].join(".");
  });
  return allowedHosts.includes(incomingHostname);
};
const getBaseDomain = (hostname) => {
  if (hostname === "localhost")
    return "localhost";
  return hostname.split(".").slice(-2).join(".");
};
const createAdapter = (adapter) => {
  if (!("user" in adapter))
    return adapter(LuciaError);
  let userAdapter = adapter.user(LuciaError);
  let sessionAdapter = adapter.session(LuciaError);
  if ("getSessionAndUser" in userAdapter) {
    const { getSessionAndUser: _, ...extractedUserAdapter } = userAdapter;
    userAdapter = extractedUserAdapter;
  }
  if ("getSessionAndUser" in sessionAdapter) {
    const { getSessionAndUser: _, ...extractedSessionAdapter } = sessionAdapter;
    sessionAdapter = extractedSessionAdapter;
  }
  return {
    ...userAdapter,
    ...sessionAdapter
  };
};
const createKeyId = (providerId, providerUserId) => {
  if (providerId.includes(":")) {
    throw new TypeError("Provider id must not include any colons (:)");
  }
  return `${providerId}:${providerUserId}`;
};
const lucia = (config) => {
  return new Auth(config);
};
const validateConfiguration = (config) => {
  const adapterProvided = config.adapter;
  if (!adapterProvided) {
    logError('Adapter is not defined in configuration ("config.adapter")');
    process.exit(1);
  }
};
const defaultSessionCookieAttributes = {
  sameSite: "lax",
  path: "/"
};
class Auth {
  adapter;
  sessionCookie;
  sessionExpiresIn;
  env;
  passwordHash;
  middleware;
  csrfProtectionEnabled;
  allowedSubdomains;
  experimental;
  constructor(config) {
    validateConfiguration(config);
    this.adapter = createAdapter(config.adapter);
    this.env = config.env;
    this.csrfProtectionEnabled = typeof config.csrfProtection === "boolean" ? config.csrfProtection : true;
    this.sessionExpiresIn = {
      activePeriod: config.sessionExpiresIn?.activePeriod ?? 1e3 * 60 * 60 * 24,
      idlePeriod: config.sessionExpiresIn?.idlePeriod ?? 1e3 * 60 * 60 * 24 * 14
    };
    this.getUserAttributes = (databaseUser) => {
      const defaultTransform = () => {
        return {};
      };
      const transform = config.getUserAttributes ?? defaultTransform;
      return transform(databaseUser);
    };
    this.getSessionAttributes = (databaseSession) => {
      const defaultTransform = () => {
        return {};
      };
      const transform = config.getSessionAttributes ?? defaultTransform;
      return transform(databaseSession);
    };
    this.sessionCookie = {
      name: config.sessionCookie?.name ?? DEFAULT_SESSION_COOKIE_NAME,
      attributes: config.sessionCookie?.attributes ?? defaultSessionCookieAttributes,
      expires: config.sessionCookie?.expires ?? true
    };
    this.passwordHash = {
      generate: config.passwordHash?.generate ?? generateScryptHash,
      validate: config.passwordHash?.validate ?? validateScryptHash
    };
    this.middleware = config.middleware ?? lucia$1();
    this.allowedSubdomains = !config.csrfProtection || typeof config.csrfProtection === "boolean" ? [] : config.csrfProtection.allowedSubDomains;
    this.experimental = {
      debugMode: config.experimental?.debugMode ?? false
    };
    debug.init(this.experimental.debugMode);
  }
  getUserAttributes;
  getSessionAttributes;
  transformDatabaseUser = (databaseUser) => {
    const attributes = this.getUserAttributes(databaseUser);
    return {
      ...attributes,
      userId: databaseUser.id
    };
  };
  transformDatabaseKey = (databaseKey) => {
    const [providerId, ...providerUserIdSegments] = databaseKey.id.split(":");
    const providerUserId = providerUserIdSegments.join(":");
    const userId = databaseKey.user_id;
    const isPasswordDefined = !!databaseKey.hashed_password;
    return {
      providerId,
      providerUserId,
      userId,
      passwordDefined: isPasswordDefined
    };
  };
  transformDatabaseSession = (databaseSession, context) => {
    const attributes = this.getSessionAttributes(databaseSession);
    const active = isWithinExpiration(databaseSession.active_expires);
    return {
      ...attributes,
      user: context.user,
      sessionId: databaseSession.id,
      activePeriodExpiresAt: new Date(Number(databaseSession.active_expires)),
      idlePeriodExpiresAt: new Date(Number(databaseSession.idle_expires)),
      state: active ? "active" : "idle",
      fresh: context.fresh
    };
  };
  getDatabaseUser = async (userId) => {
    const databaseUser = await this.adapter.getUser(userId);
    if (!databaseUser) {
      throw new LuciaError("AUTH_INVALID_USER_ID");
    }
    return databaseUser;
  };
  getDatabaseSession = async (sessionId) => {
    const databaseSession = await this.adapter.getSession(sessionId);
    if (!databaseSession) {
      debug.session.fail("Session not found", sessionId);
      throw new LuciaError("AUTH_INVALID_SESSION_ID");
    }
    if (!isValidDatabaseSession(databaseSession)) {
      debug.session.fail(`Session expired at ${new Date(Number(databaseSession.idle_expires))}`, sessionId);
      throw new LuciaError("AUTH_INVALID_SESSION_ID");
    }
    return databaseSession;
  };
  getDatabaseSessionAndUser = async (sessionId) => {
    if (this.adapter.getSessionAndUser) {
      const [databaseSession2, databaseUser2] = await this.adapter.getSessionAndUser(sessionId);
      if (!databaseSession2) {
        debug.session.fail("Session not found", sessionId);
        throw new LuciaError("AUTH_INVALID_SESSION_ID");
      }
      if (!isValidDatabaseSession(databaseSession2)) {
        debug.session.fail(`Session expired at ${new Date(Number(databaseSession2.idle_expires))}`, sessionId);
        throw new LuciaError("AUTH_INVALID_SESSION_ID");
      }
      return [databaseSession2, databaseUser2];
    }
    const databaseSession = await this.getDatabaseSession(sessionId);
    const databaseUser = await this.getDatabaseUser(databaseSession.user_id);
    return [databaseSession, databaseUser];
  };
  validateSessionIdArgument = (sessionId) => {
    if (!sessionId) {
      debug.session.fail("Empty session id");
      throw new LuciaError("AUTH_INVALID_SESSION_ID");
    }
  };
  getNewSessionExpiration = (sessionExpiresIn) => {
    const activePeriodExpiresAt = new Date((/* @__PURE__ */ new Date()).getTime() + (sessionExpiresIn?.activePeriod ?? this.sessionExpiresIn.activePeriod));
    const idlePeriodExpiresAt = new Date(activePeriodExpiresAt.getTime() + (sessionExpiresIn?.idlePeriod ?? this.sessionExpiresIn.idlePeriod));
    return { activePeriodExpiresAt, idlePeriodExpiresAt };
  };
  getUser = async (userId) => {
    const databaseUser = await this.getDatabaseUser(userId);
    const user = this.transformDatabaseUser(databaseUser);
    return user;
  };
  createUser = async (options) => {
    const userId = options.userId ?? generateRandomString(15);
    const userAttributes = options.attributes ?? {};
    const databaseUser = {
      ...userAttributes,
      id: userId
    };
    if (options.key === null) {
      await this.adapter.setUser(databaseUser, null);
      return this.transformDatabaseUser(databaseUser);
    }
    const keyId = createKeyId(options.key.providerId, options.key.providerUserId);
    const password = options.key.password;
    const hashedPassword = password ? await this.passwordHash.generate(password) : null;
    await this.adapter.setUser(databaseUser, {
      id: keyId,
      user_id: userId,
      hashed_password: hashedPassword
    });
    return this.transformDatabaseUser(databaseUser);
  };
  updateUserAttributes = async (userId, attributes) => {
    await this.adapter.updateUser(userId, attributes);
    return await this.getUser(userId);
  };
  deleteUser = async (userId) => {
    await this.adapter.deleteSessionsByUserId(userId);
    await this.adapter.deleteKeysByUserId(userId);
    await this.adapter.deleteUser(userId);
  };
  useKey = async (providerId, providerUserId, password) => {
    const keyId = createKeyId(providerId, providerUserId);
    const databaseKey = await this.adapter.getKey(keyId);
    if (!databaseKey) {
      debug.key.fail("Key not found", keyId);
      throw new LuciaError("AUTH_INVALID_KEY_ID");
    }
    const hashedPassword = databaseKey.hashed_password;
    if (hashedPassword) {
      debug.key.info("Key includes password");
      if (!password) {
        debug.key.fail("Key password not provided", keyId);
        throw new LuciaError("AUTH_INVALID_PASSWORD");
      }
      if (hashedPassword.startsWith("$2a")) {
        throw new LuciaError("AUTH_OUTDATED_PASSWORD");
      }
      const validPassword = await this.passwordHash.validate(password, hashedPassword);
      if (!validPassword) {
        debug.key.fail("Incorrect key password", password);
        throw new LuciaError("AUTH_INVALID_PASSWORD");
      }
      debug.key.notice("Validated key password");
    } else {
      debug.key.info("No password included in key");
    }
    debug.key.success("Validated key", keyId);
    return this.transformDatabaseKey(databaseKey);
  };
  getSession = async (sessionId) => {
    this.validateSessionIdArgument(sessionId);
    const [databaseSession, databaseUser] = await this.getDatabaseSessionAndUser(sessionId);
    const user = this.transformDatabaseUser(databaseUser);
    return this.transformDatabaseSession(databaseSession, {
      user,
      fresh: false
    });
  };
  getAllUserSessions = async (userId) => {
    const [user, databaseSessions] = await Promise.all([
      this.getUser(userId),
      await this.adapter.getSessionsByUserId(userId)
    ]);
    const validStoredUserSessions = databaseSessions.filter((databaseSession) => {
      return isValidDatabaseSession(databaseSession);
    }).map((databaseSession) => {
      return this.transformDatabaseSession(databaseSession, {
        user,
        fresh: false
      });
    });
    return validStoredUserSessions;
  };
  validateSession = async (sessionId) => {
    this.validateSessionIdArgument(sessionId);
    const [databaseSession, databaseUser] = await this.getDatabaseSessionAndUser(sessionId);
    const user = this.transformDatabaseUser(databaseUser);
    const session = this.transformDatabaseSession(databaseSession, {
      user,
      fresh: false
    });
    if (session.state === "active") {
      debug.session.success("Validated session", session.sessionId);
      return session;
    }
    const { activePeriodExpiresAt, idlePeriodExpiresAt } = this.getNewSessionExpiration();
    await this.adapter.updateSession(session.sessionId, {
      active_expires: activePeriodExpiresAt.getTime(),
      idle_expires: idlePeriodExpiresAt.getTime()
    });
    const renewedDatabaseSession = {
      ...session,
      idlePeriodExpiresAt,
      activePeriodExpiresAt,
      fresh: true
    };
    return renewedDatabaseSession;
  };
  createSession = async (options) => {
    const { activePeriodExpiresAt, idlePeriodExpiresAt } = this.getNewSessionExpiration();
    const userId = options.userId;
    const sessionId = options?.sessionId ?? generateRandomString(40);
    const attributes = options.attributes;
    const databaseSession = {
      ...attributes,
      id: sessionId,
      user_id: userId,
      active_expires: activePeriodExpiresAt.getTime(),
      idle_expires: idlePeriodExpiresAt.getTime()
    };
    const [user] = await Promise.all([
      this.getUser(userId),
      this.adapter.setSession(databaseSession)
    ]);
    return this.transformDatabaseSession(databaseSession, {
      user,
      fresh: false
    });
  };
  updateSessionAttributes = async (sessionId, attributes) => {
    this.validateSessionIdArgument(sessionId);
    await this.adapter.updateSession(sessionId, attributes);
    return this.getSession(sessionId);
  };
  invalidateSession = async (sessionId) => {
    this.validateSessionIdArgument(sessionId);
    await this.adapter.deleteSession(sessionId);
    debug.session.notice("Invalidated session", sessionId);
  };
  invalidateAllUserSessions = async (userId) => {
    await this.adapter.deleteSessionsByUserId(userId);
  };
  deleteDeadUserSessions = async (userId) => {
    const databaseSessions = await this.adapter.getSessionsByUserId(userId);
    const deadSessionIds = databaseSessions.filter((databaseSession) => {
      return !isValidDatabaseSession(databaseSession);
    }).map((databaseSession) => databaseSession.id);
    await Promise.all(deadSessionIds.map((deadSessionId) => {
      this.adapter.deleteSession(deadSessionId);
    }));
  };
  validateRequestOrigin = (request) => {
    if (request.method === null) {
      debug.request.fail("Request method unavailable");
      throw new LuciaError("AUTH_INVALID_REQUEST");
    }
    if (request.url === null) {
      debug.request.fail("Request url unavailable");
      throw new LuciaError("AUTH_INVALID_REQUEST");
    }
    if (request.method.toUpperCase() !== "GET" && request.method.toUpperCase() !== "HEAD") {
      const requestOrigin = request.headers.origin;
      if (!requestOrigin) {
        debug.request.fail("No request origin available");
        throw new LuciaError("AUTH_INVALID_REQUEST");
      }
      try {
        const url = new URL(request.url);
        if (!isAllowedUrl(requestOrigin, {
          url,
          allowedSubdomains: this.allowedSubdomains
        })) {
          throw new LuciaError("AUTH_INVALID_REQUEST");
        }
        debug.request.info("Valid request origin", requestOrigin);
      } catch {
        debug.request.fail("Invalid origin string", requestOrigin);
        throw new LuciaError("AUTH_INVALID_REQUEST");
      }
    } else {
      debug.request.notice("Skipping CSRF check");
    }
  };
  readSessionCookie = (cookieHeader) => {
    if (!cookieHeader) {
      debug.request.info("No session cookie found");
      return null;
    }
    const cookies = parseCookie(cookieHeader);
    const sessionId = cookies[this.sessionCookie.name] ?? null;
    if (sessionId) {
      debug.request.info("Found session cookie", sessionId);
    } else {
      debug.request.info("No session cookie found");
    }
    return sessionId;
  };
  readBearerToken = (authorizationHeader) => {
    if (!authorizationHeader) {
      debug.request.info("No token found in authorization header");
      return null;
    }
    const [authScheme, token] = authorizationHeader.split(" ");
    if (authScheme !== "Bearer") {
      debug.request.fail("Invalid authorization header auth scheme", authScheme);
      return null;
    }
    return token ?? null;
  };
  handleRequest = (...args) => {
    const middleware = this.middleware;
    return new AuthRequest(this, {
      context: middleware({
        args,
        env: this.env,
        sessionCookieName: this.sessionCookie.name
      }),
      csrfProtectionEnabled: this.csrfProtectionEnabled
    });
  };
  createSessionCookie = (session) => {
    return createSessionCookie(session, {
      env: this.env,
      ...this.sessionCookie
    });
  };
  createKey = async (options) => {
    const keyId = createKeyId(options.providerId, options.providerUserId);
    let hashedPassword = null;
    if (options.password !== null) {
      hashedPassword = await this.passwordHash.generate(options.password);
    }
    const userId = options.userId;
    await this.adapter.setKey({
      id: keyId,
      user_id: userId,
      hashed_password: hashedPassword
    });
    return {
      providerId: options.providerId,
      providerUserId: options.providerUserId,
      passwordDefined: !!options.password,
      userId
    };
  };
  deleteKey = async (providerId, providerUserId) => {
    const keyId = createKeyId(providerId, providerUserId);
    await this.adapter.deleteKey(keyId);
  };
  getKey = async (providerId, providerUserId) => {
    const keyId = createKeyId(providerId, providerUserId);
    const databaseKey = await this.adapter.getKey(keyId);
    if (!databaseKey) {
      throw new LuciaError("AUTH_INVALID_KEY_ID");
    }
    const key = this.transformDatabaseKey(databaseKey);
    return key;
  };
  getAllUserKeys = async (userId) => {
    const [databaseKeys] = await Promise.all([
      await this.adapter.getKeysByUserId(userId),
      this.getUser(userId)
    ]);
    return databaseKeys.map((databaseKey) => this.transformDatabaseKey(databaseKey));
  };
  updateKeyPassword = async (providerId, providerUserId, password) => {
    const keyId = createKeyId(providerId, providerUserId);
    const hashedPassword = password === null ? null : await this.passwordHash.generate(password);
    await this.adapter.updateKey(keyId, {
      hashed_password: hashedPassword
    });
    await this.getKey(providerId, providerUserId);
  };
}
const auth = lucia({
  adapter: prisma(prisma$1, {
    user: "user",
    // model User {}
    key: "key",
    // model Key {}
    session: "session"
    // model Session {}
  }),
  env: "PROD",
  middleware: sveltekit(),
  getUserAttributes: (data) => {
    return {
      username: data.username,
      email: data.email,
      emailVerified: Boolean(data.email_verified),
      name: data.name,
      avatar: data.avatar
    };
  }
});
const githubAuth = github(auth, {
  clientId: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET
});
const googleAuth = google(auth, {
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUri: GOOGLE_CLIENT_REDIRECTURI,
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
});
const facebookAuth = facebook(auth, {
  clientId: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  redirectUri: FACEBOOK_CLIENT_REDIRECTURI
  // scope: ['https://www.googleapis.com/auth/userinfo.profile']
});
export {
  auth as a,
  googleAuth as b,
  facebookAuth as f,
  githubAuth as g
};
