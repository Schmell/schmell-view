import { f as fail } from "./index.js";
import { L as LuciaError } from "./error.js";
import "./debug.js";
function luciaErrors(error) {
  if (error instanceof LuciaError) {
    console.error("LuciaError: ", error.message);
    throw fail(500, { messgage: error.message });
  }
  throw fail(500, { messgage: `Unkown Lucia Error: ${error.message}` });
}
export {
  luciaErrors as l
};
