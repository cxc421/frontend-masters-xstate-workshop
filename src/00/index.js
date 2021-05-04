import { createMachine, interpret } from "xstate";

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
  states: {
    question: {
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
  console.log(state.value);
});

feedbackService.start();

feedbackService.send("CLICK_GOOD");

feedbackService.stop();
