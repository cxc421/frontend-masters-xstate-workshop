import { createMachine, interpret, assign } from "xstate";

const elOutput = document.querySelector("#output");

function output(object) {
  elOutput.innerHTML = JSON.stringify(object, null, 2);
}

console.log("Welcome to the XState workshop!");

const user = {
  name: "David Khourshid",
  company: "Microsoft",
  interests: ["piano", "state machines"],
};

output(user);

//

const feedbackMachine = createMachine({
  initial: "question",
  context: {
    number: 0,
  },
  states: {
    question: {
      entry: assign({
        number: () => Math.random() * 1000,
      }),
      on: {
        CLICK_GOOD: {
          target: "thanks",
        },
        CLICK_BAD: {
          target: "form",
        },
      },
    },
    form: {
      on: {
        SUBMIT: "thanks",
      },
    },
    thanks: {
      entry: assign({
        number: () => Math.random() * 1000,
      }),
      on: {
        CLOSE: "closed",
      },
    },
    closed: {
      type: "final",
    },
  },
});

const feedbackService = interpret(feedbackMachine);

feedbackService.onTransition((state) => {
  console.log(state);
});

feedbackService.start();

feedbackService.send("CLICK_GOOD");

// feedbackService.stop();
