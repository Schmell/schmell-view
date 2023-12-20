import * as nodemailer from "nodemailer";
import { google } from "googleapis";
import { C as CLIENT_ID, a as CLIENT_SECRET, R as REFRESH_TOKEN, U as USER_EMAIL, b as CALLBACK_HOST } from "./private.js";
import { e as error } from "./index.js";
import { d as dev } from "./environment.js";
import { convert } from "html-to-text";
import pretty from "pretty";
import { c as create_ssr_component, h as compute_rest_props, i as spread, j as escape_object, p as escape_attribute_value, b as add_attribute, e as escape, v as validate_component } from "./ssr.js";
const OAuth2 = google.auth.OAuth2;
const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );
    oauth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN
    });
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log("*ERR: ", err.response?.data);
          reject();
        }
        resolve(token);
      });
    });
    const transporter = nodemailer.createTransport({
      // not sure why im not getting proper types from nodemailer
      // @ts-ignore
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: USER_EMAIL,
        accessToken,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN
      }
    });
    return transporter;
  } catch (err) {
    console.log("createTranspporter err: ", err);
    throw error(500, "transporter error");
  }
};
const pxToPt = (px) => isNaN(Number(px)) ? null : parseInt(px, 10) * 3 / 4;
const styleToString = (style) => {
  return Object.keys(style).reduce((acc, key) => acc + key.split(/(?=[A-Z])/).join("-").toLowerCase() + ":" + style[key] + ";", "");
};
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "style", "pX", "pY", "target"]);
  let { href = "" } = $$props;
  let { style = {} } = $$props;
  let { pX = 0 } = $$props;
  let { pY = 0 } = $$props;
  let { target = "_blank" } = $$props;
  const y = pY * 2;
  const textRaise = pxToPt(y.toString());
  const buttonStyle = (style2) => {
    const paddingY = style2?.pY || 0;
    const paddingX = style2?.pX || 0;
    return {
      ...style2,
      lineHeight: "100%",
      textDecoration: "none",
      display: "inline-block",
      maxWidth: "100%",
      padding: `${paddingY}px ${paddingX}px`
    };
  };
  const buttonTextStyle = (style2) => {
    const paddingY = style2?.pY || 0;
    return {
      ...style2,
      maxWidth: "100%",
      display: "inline-block",
      lineHeight: "120%",
      textDecoration: "none",
      textTransform: "none",
      msoPaddingAlt: "0px",
      msoTextRaise: pxToPt(paddingY.toString())
    };
  };
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.pX === void 0 && $$bindings.pX && pX !== void 0)
    $$bindings.pX(pX);
  if ($$props.pY === void 0 && $$bindings.pY && pY !== void 0)
    $$bindings.pY(pY);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  return `<a${spread(
    [
      escape_object($$restProps),
      { href: escape_attribute_value(href) },
      { target: escape_attribute_value(target) },
      {
        style: escape_attribute_value(styleToString(buttonStyle({ ...style, pX, pY })))
      }
    ],
    {}
  )}><span><!-- HTML_TAG_START -->${`<!--[if mso]><i style="letter-spacing: ${pX}px;mso-font-width:-100%;mso-text-raise:${textRaise}" hidden>&nbsp;</i><![endif]-->`}<!-- HTML_TAG_END --></span> <span${add_attribute("style", styleToString(buttonTextStyle({ ...style, pX, pY })), 0)}>${slots.default ? slots.default({}) : ``}</span> <span><!-- HTML_TAG_START -->${`<!--[if mso]><i style="letter-spacing: ${pX}px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`}<!-- HTML_TAG_END --></span></a>`;
});
const Container = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["style"]);
  let { style = {} } = $$props;
  const styles = { maxWidth: "37.5em", ...style };
  const inlineStyle = styleToString(styles);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  return `<div><!-- HTML_TAG_START -->${`<!--[if mso | IE]>
          <table role="presentation" width="100%" align="center" style="${inlineStyle}"><tr><td></td><td style="width:37.5em;background:#ffffff">
        <![endif]-->`}<!-- HTML_TAG_END --></div> <div${spread(
    [
      escape_object($$restProps),
      {
        style: escape_attribute_value(inlineStyle)
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div> <div><!-- HTML_TAG_START -->${`<!--[if mso | IE]>
          </td><td></td></tr></table>
          <![endif]-->`}<!-- HTML_TAG_END --></div>`;
});
const Head = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<head${spread([escape_object($$restProps)], {})}><meta httpequiv="Content-Type" content="text/html; charset=UTF-8"> ${slots.default ? slots.default({}) : ``}</head>`;
});
const Hr = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["style"]);
  let { style = {} } = $$props;
  const styleDefault = {
    width: "100%",
    border: "none",
    borderTop: "1px solid #eaeaea",
    ...style
  };
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  return `<hr${spread(
    [
      {
        style: escape_attribute_value(styleToString(styleDefault))
      },
      escape_object($$restProps)
    ],
    {}
  )}>`;
});
const Html = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["lang"]);
  let { lang = "en" } = $$props;
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0)
    $$bindings.lang(lang);
  return `<html${spread(
    [
      escape_object($$restProps),
      { id: "__svelte-email" },
      { lang: escape_attribute_value(lang) }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</html>`;
});
const Img = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["style", "alt", "src", "width", "height"]);
  let { style = {} } = $$props;
  let { alt = "" } = $$props;
  let { src = "" } = $$props;
  let { width = "0" } = $$props;
  let { height = "0" } = $$props;
  const styleDefault = {
    display: "block",
    outline: "none",
    border: "none",
    textDecoration: "none",
    ...style
  };
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<img${spread(
    [
      { alt: escape_attribute_value(alt) },
      { src: escape_attribute_value(src) },
      { width: escape_attribute_value(width) },
      { height: escape_attribute_value(height) },
      {
        style: escape_attribute_value(styleToString(styleDefault))
      },
      escape_object($$restProps)
    ],
    {}
  )}>`;
});
const Preview = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["preview"]);
  let { preview = "" } = $$props;
  const renderWhiteSpace = (text) => {
    const whiteSpaceCodes = " ‌​‍‎‏\uFEFF";
    return whiteSpaceCodes.repeat(150 - text.length);
  };
  if ($$props.preview === void 0 && $$bindings.preview && preview !== void 0)
    $$bindings.preview(preview);
  return `<div${spread(
    [
      { id: "__svelte-email-preview" },
      {
        style: escape_attribute_value(styleToString({
          display: "none",
          overflow: "hidden",
          lineHeight: "1px",
          opacity: 0,
          maxHeight: 0,
          maxWidth: 0
        }))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${escape(preview)} <div>${escape(renderWhiteSpace(preview))}</div></div>`;
});
const Section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["style"]);
  let { style = {} } = $$props;
  const styleDefaultTable = { width: "100%", ...style };
  const styleDefaultTr = {
    display: "grid",
    gridAutoColumns: "minmax(0, 1fr)",
    gridAutoFlow: "column"
  };
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  return `<table${spread(
    [
      {
        style: escape_attribute_value(styleToString(styleDefaultTable))
      },
      { align: "center" },
      { border: escape_attribute_value(0) },
      { cellpadding: escape_attribute_value(0) },
      { cellspacing: escape_attribute_value(0) },
      { role: "presentation" },
      escape_object($$restProps)
    ],
    {}
  )}><tbody><tr${add_attribute("style", styleToString(styleDefaultTr), 0)}>${slots.default ? slots.default({}) : ``}</tr></tbody></table>`;
});
const Text = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["style"]);
  let { style = {} } = $$props;
  const styleDefault = {
    fontSize: "14px",
    lineHeight: "24px",
    margin: "16px 0",
    ...style
  };
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  return `<p${spread(
    [
      {
        style: escape_attribute_value(styleToString(styleDefault))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</p>`;
});
const render = ({ template, props, options }) => {
  const { html } = (
    // @ts-ignore
    template.render(props)
  );
  if (options?.plainText) {
    return renderAsPlainText(html);
  }
  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
  const markup = html;
  const document = `${doctype}${markup}`;
  if (options?.pretty) {
    return pretty(document);
  }
  return document;
};
const renderAsPlainText = (markup) => {
  return convert(markup, {
    selectors: [
      { selector: "img", format: "skip" },
      { selector: "#__svelte-email-preview", format: "skip" }
    ]
  });
};
const fontFamily$2 = 'Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI",Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
const RequestMerge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type = "Venue" } = $$props;
  let { requesterEmail = "" } = $$props;
  let { allowUrl = "" } = $$props;
  let { cancelUrl = "" } = $$props;
  const main = { backgroundColor: "#ffffff" };
  const container = { margin: "0 auto", padding: "20px 0 48px" };
  const logo = { margin: "0 auto" };
  const paragraph = {
    fontFamily: fontFamily$2,
    fontSize: "16px",
    lineHeight: "26px"
  };
  const button = {
    fontFamily: fontFamily$2,
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    margin: "0 4px"
  };
  const hr = { borderColor: "#cccccc", margin: "20px 0" };
  const footer = {
    fontFamily: fontFamily$2,
    color: "#8898aa",
    fontSize: "12px"
  };
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.requesterEmail === void 0 && $$bindings.requesterEmail && requesterEmail !== void 0)
    $$bindings.requesterEmail(requesterEmail);
  if ($$props.allowUrl === void 0 && $$bindings.allowUrl && allowUrl !== void 0)
    $$bindings.allowUrl(allowUrl);
  if ($$props.cancelUrl === void 0 && $$bindings.cancelUrl && cancelUrl !== void 0)
    $$bindings.cancelUrl(cancelUrl);
  return `${validate_component(Html, "Html").$$render($$result, { lang: "en" }, {}, {
    default: () => {
      return `${validate_component(Head, "Head").$$render($$result, {}, {}, {})} ${validate_component(Preview, "Preview").$$render($$result, { preview: "A request to merge " + type }, {}, {})} ${validate_component(Section, "Section").$$render($$result, { style: main }, {}, {
        default: () => {
          return `${validate_component(Container, "Container").$$render($$result, { style: container }, {}, {
            default: () => {
              return `${validate_component(Img, "Img").$$render(
                $$result,
                {
                  src: "https://svelte.dev/svelte-logo-horizontal.svg",
                  alt: "Svelte logo",
                  style: logo,
                  width: "200",
                  height: "50"
                },
                {},
                {}
              )} ${validate_component(Text, "Text").$$render($$result, { style: paragraph }, {}, {
                default: () => {
                  return `DO NOT REPLY`;
                }
              })} ${validate_component(Text, "Text").$$render($$result, { style: paragraph }, {}, {
                default: () => {
                  return `A request from <a href="${"mailto:" + escape(requesterEmail, true)}">${escape(requesterEmail)}</a>`;
                }
              })} ${validate_component(Text, "Text").$$render($$result, { style: paragraph }, {}, {
                default: () => {
                  return `This is a request to merge a ${escape(type)} with a ${escape(type)} that you have published`;
                }
              })} ${validate_component(Text, "Text").$$render($$result, { style: paragraph }, {}, {
                default: () => {
                  return `This operation will simply connect any Series, Events, Comments, Likes and or Follows from
				their ${escape(type)}
				and will not effect any of the details you have provided`;
                }
              })} ${validate_component(Text, "Text").$$render($$result, { style: paragraph }, {}, {
                default: () => {
                  return `You should contact <a href="${"mailto:" + escape(requesterEmail, true)}">${escape(requesterEmail)}</a> directly if you have
				any questions about this request`;
                }
              })} ${validate_component(Button, "Button").$$render(
                $$result,
                {
                  pX: 12,
                  pY: 12,
                  style: button,
                  href: allowUrl
                },
                {},
                {
                  default: () => {
                    return `Allow`;
                  }
                }
              )} ${validate_component(Button, "Button").$$render(
                $$result,
                {
                  pX: 12,
                  pY: 12,
                  style: button,
                  href: cancelUrl
                },
                {},
                {
                  default: () => {
                    return `Deny`;
                  }
                }
              )} ${validate_component(Text, "Text").$$render($$result, { style: paragraph }, {}, {
                default: () => {
                  return `Thank you!`;
                }
              })} ${validate_component(Hr, "Hr").$$render($$result, { style: hr }, {}, {})} ${validate_component(Text, "Text").$$render($$result, { style: footer }, {}, {
                default: () => {
                  return `Vite Sail`;
                }
              })}`;
            }
          })}`;
        }
      })}`;
    }
  })}`;
});
const fontFamily$1 = 'Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI",Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
const DenialEmail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type = "Item" } = $$props;
  let { publisherEmail = "" } = $$props;
  const main = { backgroundColor: "#ffffff" };
  const container = { margin: "0 auto", padding: "20px 0 48px" };
  const paragraph = {
    fontFamily: fontFamily$1,
    fontSize: "16px",
    lineHeight: "26px"
  };
  const hr = { borderColor: "#cccccc", margin: "20px 0" };
  const footer = {
    fontFamily: fontFamily$1,
    color: "#8898aa",
    fontSize: "12px"
  };
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.publisherEmail === void 0 && $$bindings.publisherEmail && publisherEmail !== void 0)
    $$bindings.publisherEmail(publisherEmail);
  return `${validate_component(Html, "Html").$$render($$result, { lang: "en" }, {}, {
    default: () => {
      return `${validate_component(Head, "Head").$$render($$result, {}, {}, {})} ${validate_component(Preview, "Preview").$$render(
        $$result,
        {
          preview: "Denied Request to merge " + type
        },
        {},
        {}
      )} ${validate_component(Section, "Section").$$render($$result, { style: main }, {}, {
        default: () => {
          return `${validate_component(Container, "Container").$$render($$result, { style: container }, {}, {
            default: () => {
              return `${validate_component(Text, "Text").$$render($$result, { style: paragraph }, {}, {
                default: () => {
                  return `DO NOT REPLY`;
                }
              })} ${validate_component(Text, "Text").$$render($$result, { style: paragraph }, {}, {
                default: () => {
                  return `We are sorry to report`;
                }
              })} ${validate_component(Text, "Text").$$render($$result, { style: paragraph }, {}, {
                default: () => {
                  return `Your request to merge a ${escape(type)} has been denied by
				<a href="${"mailto:" + escape(publisherEmail, true)}">${escape(publisherEmail)}</a>`;
                }
              })} ${validate_component(Text, "Text").$$render($$result, { style: paragraph }, {}, {
                default: () => {
                  return `Thank you!`;
                }
              })} ${validate_component(Hr, "Hr").$$render($$result, { style: hr }, {}, {})} ${validate_component(Text, "Text").$$render($$result, { style: footer }, {}, {
                default: () => {
                  return `Vite Sail`;
                }
              })}`;
            }
          })}`;
        }
      })}`;
    }
  })}`;
});
const fontFamily = 'Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI",Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
const ClaimCompEmail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { requesterEmail = "" } = $$props;
  let { compName = "" } = $$props;
  let { allowUrl = "" } = $$props;
  let { cancelUrl = "" } = $$props;
  const main = { backgroundColor: "#ffffff" };
  const container = { margin: "0 auto", padding: "20px 0 48px" };
  const paragraph = {
    fontFamily,
    fontSize: "16px",
    lineHeight: "26px"
  };
  const button = {
    fontFamily,
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    margin: "0 4px"
  };
  const hr = { borderColor: "#cccccc", margin: "20px 0" };
  const footer = {
    fontFamily,
    color: "#8898aa",
    fontSize: "12px"
  };
  if ($$props.requesterEmail === void 0 && $$bindings.requesterEmail && requesterEmail !== void 0)
    $$bindings.requesterEmail(requesterEmail);
  if ($$props.compName === void 0 && $$bindings.compName && compName !== void 0)
    $$bindings.compName(compName);
  if ($$props.allowUrl === void 0 && $$bindings.allowUrl && allowUrl !== void 0)
    $$bindings.allowUrl(allowUrl);
  if ($$props.cancelUrl === void 0 && $$bindings.cancelUrl && cancelUrl !== void 0)
    $$bindings.cancelUrl(cancelUrl);
  return `${validate_component(Html, "Html").$$render($$result, { lang: "en" }, {}, {
    default: () => {
      return `${validate_component(Head, "Head").$$render($$result, {}, {}, {})} ${validate_component(Preview, "Preview").$$render(
        $$result,
        {
          preview: "A request to claim a Competitor"
        },
        {},
        {}
      )} ${validate_component(Section, "Section").$$render($$result, { style: main }, {}, {
        default: () => {
          return `${validate_component(Container, "Container").$$render($$result, { style: container }, {}, {
            default: () => {
              return `${validate_component(Text, "Text").$$render($$result, { style: paragraph }, {}, {
                default: () => {
                  return `DO NOT REPLY`;
                }
              })} ${validate_component(Text, "Text").$$render($$result, { style: paragraph }, {}, {
                default: () => {
                  return `The User <a href="${"mailto:" + escape(requesterEmail, true)}">${escape(requesterEmail)}</a> would like to lay claim to
				the competitor named ${escape(compName)}`;
                }
              })} ${validate_component(Button, "Button").$$render(
                $$result,
                {
                  pX: 12,
                  pY: 12,
                  style: button,
                  href: allowUrl
                },
                {},
                {
                  default: () => {
                    return `Allow`;
                  }
                }
              )} ${validate_component(Button, "Button").$$render(
                $$result,
                {
                  pX: 12,
                  pY: 12,
                  style: button,
                  href: cancelUrl
                },
                {},
                {
                  default: () => {
                    return `Deny`;
                  }
                }
              )} ${validate_component(Text, "Text").$$render($$result, { style: paragraph }, {}, {
                default: () => {
                  return `Thank you!`;
                }
              })} ${validate_component(Hr, "Hr").$$render($$result, { style: hr }, {}, {})} ${validate_component(Text, "Text").$$render($$result, { style: footer }, {}, {
                default: () => {
                  return `Vite Sail`;
                }
              })}`;
            }
          })}`;
        }
      })}`;
    }
  })}`;
});
async function sendEmail(emailOptions) {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
}
async function sendClaimCompEmail({
  publisherEmail,
  requesterEmail,
  toMergeId,
  userId,
  compName
}) {
  const allowUrl = `${CALLBACK_HOST}/comps/${toMergeId}/merge?allow=true&userId=${userId} `;
  const cancelUrl = `${CALLBACK_HOST}/comps/${toMergeId}/merge?allow=false&pe=${publisherEmail}&re=${requesterEmail}`;
  const emailHtml = render({
    template: ClaimCompEmail,
    props: {
      requesterEmail,
      allowUrl,
      cancelUrl,
      compName
    }
  });
  const options = {
    from: "do_not_reply@vitesail.com",
    to: publisherEmail,
    subject: `Vite Sail - A User wants to claim Competitor`,
    html: emailHtml
  };
  try {
    sendEmail(options);
    return { status: "ok" };
  } catch (error2) {
    console.log("send Merge request error: ", error2);
    return { status: "error" };
  }
}
async function sendDenialEmail({ type, publisherEmail, requesterEmail }) {
  const emailHtml = render({
    template: DenialEmail,
    props: {
      type,
      publisherEmail
    }
  });
  const options = {
    from: "do_not_reply@vitesail.com",
    to: requesterEmail,
    subject: `Vite Sail - Your request to merge ${type} was denied`,
    html: emailHtml
  };
  try {
    sendEmail(options);
    return { status: "ok" };
  } catch (error2) {
    console.log("send Merge request error: ", error2);
    return { status: "error" };
  }
}
async function sendMergeRequest({
  publisherEmail,
  requesterEmail,
  venueId,
  toMergeId,
  type
}) {
  const allowUrl = `${CALLBACK_HOST}/venue/${toMergeId}/merge?allow=true&toMergeId=${venueId} `;
  const cancelUrl = `${CALLBACK_HOST}/venue/${toMergeId}/merge?allow=false&pe=${publisherEmail}&re=${requesterEmail}`;
  const emailHtml = render({
    template: RequestMerge,
    props: {
      type,
      allowUrl,
      cancelUrl,
      requesterEmail
    }
  });
  const options = {
    from: "do_not_reply@vitesail.com",
    to: publisherEmail,
    subject: `Vite Sail - A request to merge with your ${type}`,
    html: emailHtml
  };
  try {
    sendEmail(options);
    return { status: "ok" };
  } catch (error2) {
    console.log("send Merge request error: ", error2);
    return { status: "error" };
  }
}
async function sendEmailVerificationLink(email, token) {
  const url = `${CALLBACK_HOST}/auth/email-verification/${token} `;
  const message = {
    from: "sheldon.street@gmail.com",
    to: email,
    subject: "Verify your password",
    text: "Svelte-way would like you to verify the password you just used",
    html: `<p>Verify your account by clicking the link below</p> <a href=${url}>${url}</a>`
  };
  try {
    sendEmail(message);
  } catch (error2) {
    console.log("sendEmailVerificationLink error: ", error2);
  }
}
async function sendPasswordResetLink(email, token) {
  const url = `${CALLBACK_HOST}/auth/password-reset/${token}`;
  const message = {
    from: "",
    to: email,
    subject: "Reset your password",
    text: "You have requested to reset your password for the svelte-way app",
    html: `<p>Verify your account by clicking the link below</p> <a href=${url}>${url}</a>`
  };
  try {
    sendEmail(message);
    if (dev)
      ;
    return {
      success: true,
      message: ""
    };
  } catch (error2) {
    console.log("error: ", error2);
    return {
      success: false,
      message: error2
    };
  }
}
export {
  sendEmailVerificationLink as a,
  sendPasswordResetLink as b,
  sendDenialEmail as c,
  sendMergeRequest as d,
  sendClaimCompEmail as s
};
