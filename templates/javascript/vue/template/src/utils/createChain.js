const createChain = () => {
  const EXEC_STATE = {
    pending: 0,
    fulfilled: 1,
    rejected: 2
  };

  let state = EXEC_STATE.fulfilled;
  let exec = true;

  const rejected = () => {
    state = EXEC_STATE.rejected;
    return this;
  };

  const fulfilled = (handler) => {
    state = EXEC_STATE.fulfilled;
    exec = handler();
    return this;
  };

  const Chain = function () {
    return this;
  };

  Chain.prototype = {
    invoke: function (handler) {
      if (state === EXEC_STATE.pending && exec !== true) {
        return rejected.call(this);
      }
      return fulfilled.call(this, handler);
    },
    or: function () {
      state = EXEC_STATE.pending;
      return this;
    },
    and: function () {
      if (state === EXEC_STATE.rejected) {
        exec = true;
      }
      return this.or();
    }
  };

  return {
    instance: new Chain(),
    Chain: Chain
  };
};

export default createChain;
