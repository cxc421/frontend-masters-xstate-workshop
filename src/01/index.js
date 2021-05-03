const elBox = document.querySelector("#box");

const boxMachine = {
  initial: "inactive",
  states: {
    inactive: {
      on: {
        CLICK: "active",
      },
    },
    active: {
      on: {
        CLICK: "inactive",
      },
    },
  },
};

const createInterpreter = (machine) => {
  let currentState = machine.initial;

  return {
    send(event) {
      currentState =
        boxMachine.states[currentState]?.on?.[event] || currentState;
      return currentState;
    },
  };
};

const boxIntepreter = createInterpreter(boxMachine);

elBox.addEventListener("click", () => {
  // send a click event
  elBox.dataset.state = boxIntepreter.send("CLICK");
});
