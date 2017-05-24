import axios from "axios";

const cancelledPromise = () => (
  {
    then: function(...args) { return this; },
    catch: function(...args) { return this; },
  }
)

const cancelablePromise = (promise, source) => (
  {
    ...promise,
    cancel: function(reason) {
      source.cancel(reason);
    },
    then: function(...args) {
      return cancelablePromise(promise.then(...args), source);
    },
    catch: function(...args) {
      return cancelablePromise(promise.catch(...args), source);
    },
  }
);

export const cancelable = (api) => {
  let x = {
    ...api,
    request: function(config) {
      let source = axios.CancelToken.source();
      return cancelablePromise(api.request.bind(this)({ ...config, cancelToken: source.token }), source).catch(
        (thrown) => {
          if (!axios.isCancel(thrown)) {
            throw thrown;
          }

          return cancelledPromise();
        }
      );
    },
  };

  ["delete", "get", "head", "options"].forEach((method) => {
    x[method] = function(url, config) {
      return this.request({ ...config, url, config, method });
    };
  });

  ["put", "post", "patch"].forEach((method) => {
    x[method] = function(url, data, config) {
      return this.request({ ...config, url, config, data, method });
    };
  });

  return x;
};
