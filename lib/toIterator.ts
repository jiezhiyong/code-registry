export const toIterator = (obj: any) => {
  return {
    ...obj,
    [Symbol.iterator]: function () {
      const keys = Object.keys(this);
      let index = 0;

      return {
        next: () => {
          if (index >= keys.length) {
            return { done: true };
          }
          const key = keys[index];
          const value = this[key];

          index++;

          return { value: { key, value }, done: false };
        },
      };
    },
  };
};