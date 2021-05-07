module.exports = isArray;

function isArray (value) {
  return (
    Array.isArray(value) ||
    (!!value &&
      typeof value === "object" &&
      value.hasOwnProperty("length") && 
      typeof value.length === "number" && 
      value.length > 0 && 
      (value.length - 1) in value
    )
);
}