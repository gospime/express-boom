const Boom = require('@hapi/boom');

module.exports = () => (request, response, next) => {
  const boom = {};

  const mapper = key => {
    if (typeof Boom[key] !== 'function') return;
    boom[key] = function() {
      throw Boom[key].apply(Boom, arguments);
    };
  };

  Object.getOwnPropertyNames(Boom).map(mapper);

  response.boom = boom;

  next();
};
