function isBuffer(obj: any) {
  return obj && obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
}

function keyIdentity(key: string) {
  return key;
}

export function flatten(
  target: Record<string, any>,
  opts: { delimiter?: string; maxDepth?: number; transformKey?: (key: string) => string; safe?: boolean },
): Record<string, any> {
  const { delimiter = ".", maxDepth = Infinity, transformKey = keyIdentity, safe = false } = opts || {};
  const output: Record<string, any> = {};

  function step(object: Record<string, any>, prev: string = "", currentDepth: number = 1) {
    Object.keys(object).forEach(function (key) {
      const value = object[key];
      const isarray = safe && Array.isArray(value);
      const type = Object.prototype.toString.call(value);
      const isbuffer = isBuffer(value);
      const isobject = type === "[object Object]" || type === "[object Array]";

      const newKey = prev ? prev + delimiter + transformKey(key) : transformKey(key);

      if (!isarray && !isbuffer && isobject && Object.keys(value).length && (!maxDepth || currentDepth < maxDepth)) {
        return step(value, newKey, currentDepth + 1);
      }

      output[newKey] = value;
    });
  }

  step(target);

  return output;
}
