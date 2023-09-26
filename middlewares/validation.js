export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", code: 400, message: error.message });
  }
};

export const validateParams = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.params);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", code: 400, message: error.message });
  }
};
