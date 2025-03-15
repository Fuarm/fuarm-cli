const createChain = () => {
  const EXEC_STATE = {
    pending: 0,
    fulfilled: 1,
    rejected: 2,
  };

  let state = EXEC_STATE.fulfilled;
  let exec = true;
  // 拒绝次数
  let rejectedCount = 0;

  const formatExecAndSetState = () => {
    exec = exec ?? true;
    state = exec === false ? EXEC_STATE.rejected : EXEC_STATE.pending;
  };

  const Chain = function () {
    return this;
  };

  Chain.prototype = {
    invoke: async function (handler) {
      if (exec instanceof Promise) {
        exec = await exec;
      }
      if (typeof exec !== "boolean") {
        return this;
      }

      switch (state) {
        case EXEC_STATE.pending:
          exec = handler();
          formatExecAndSetState();
          break;
        case EXEC_STATE.fulfilled:
          break;
        case EXEC_STATE.rejected:
          rejectedCount++;
      }

      return this;
    },
    and: function () {
      if (state === EXEC_STATE.rejected && rejectedCount > 0) {
        state = EXEC_STATE.pending;
        rejectedCount = 0;
      }
      return this;
    },
    end: function () {
      state = EXEC_STATE.fulfilled;
      return exec;
    },
    start: function () {
      exec = true;
      state = EXEC_STATE.pending;
      rejectedCount = 0;

      return this;
    },
  };

  return {
    instance: new Chain(),
    Chain: Chain,
  };
};