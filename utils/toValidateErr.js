function toValidateErr(validationResult) {
  if (Object.keys(validationResult).length == 0) {
    return null;
  }
  const validateErr = { ...validationResult };
  for (const key in validateErr) {
    validateErr[key] = validateErr[key]?.msg;
  }
  return validateErr;
}

module.exports = toValidateErr;
