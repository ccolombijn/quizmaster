const quiz = (function() {
  model.data["questions"] = [
    // questions data
    {
      id: 1,
      question: "What color are often the domes of churches in Russia?",
      anwsers: ["Gold", "Silver", "Bronze"],
      right: 0
    },
    {
      id: 2,
      question: "Which Italian artist painted the Birth of Venus?",
      anwsers: ["Leonardo Da Vinci", "	Botticelli", "Carvaggio"],
      right: 1
    },
    {
      id: 3,
      question: "How many oscars did the Titanic movie got?",
      anwsers: ["10", "11", "12", "13"],
      right: 1
    },
    {
      id: 4,
      question: "Who was the second president of the United States?",
      anwsers: [
        "Benjamin Franklin",
        "George Whasington",
        "John Quincy Adams",
        "John Adams"
      ],
      right: 3
    }
  ];
  model.data["players"] = [];
  model.data["game"] = { score: 0 };

  //...........................................................................

  const questionsAsked = [],

  //...........................................................................

    start = () => {
      console.log("Quiz started");
      askQuestion();
    },

//...........................................................................

    end = () => {
      console.log("Quiz has ended");
      view.set(
        "quiz",
        `Quiz has finished with a score of ${model.data.game.score} out of ${
          model.data.questions.length
        } (${(model.data.game.score / model.data.questions.length) * 100}%)`
      );
    },

  //...........................................................................

    anwserQuestion = function(event) {

      event.target.checked = true;
      const id = event.target.id.replace("anwser_", ""),
        question = getQuestion(
          event.target.parentElement.id.replace("anwsers_", "")
        ),
        label = document.getElementById(`label_${id}`),
        anwser = parseInt(id) === question.right ? "right" : "wrong";
      event.target.removeEventListener("click", this);
      if (anwser === "right") model.data.game.score++;
      view.attr(label, { class: anwser });
      console.log(`Anwser to question #${questionsAsked.length} is ${anwser}`);
      setTimeout(askQuestion, 3000);
    },

//...........................................................................

    askQuestion = function() {
      view.set("quiz", "");
      if (questionsAsked.length === model.data.questions.length) return end(); // end if all questions are asked
      let question = getQuestion();
      view.add(
        "quiz",
        "h3",
        `Question ${questionsAsked.length}/${model.data.questions.length}`
      );
      const questionElement = view.add("quiz", "div", question.question);
      const anwsersElement = view.add("quiz", "form", {
        id: `anwsers_${question.id}`
      });

      for (let anwser in question.anwsers) {
        controller.add(
          view.add(anwsersElement, "input", {
            type: "radio",
            id: `anwser_${anwser}`,
            name: "anwsers"
          }),
          "click", anwserQuestion

        );
        //controller.add(
        view.add(
          anwsersElement,
          "label",
          { id: `label_${anwser}`, for: `anwser_${anwser}` },
          question.anwsers[anwser]
        );
        //, 'click', anwserQuestion )
      }
    },

//...........................................................................

    getQuestion = function(questionId) {
      const selectId = questionId
        ? parseInt(questionId)
        : getRandomInt(1, model.data.questions.length);
      if (!questionId) {
        if (questionsAsked.includes(selectId)) return getQuestion();
      }
      for (let question of model.data.questions) {
        if (question.id === selectId) {
          if (!questionId) questionsAsked.push(question.id);
          return question;
        }
      }
    },

//...........................................................................

    addPlayer = function() {
      view.set("quiz", "");
      view.add("quiz", "h3", "Add player");
      const addPlayerForm = view.add("quiz", "form");
      const playerName = view.add(addPlayerForm, "input", {
        id: "player_name"
      });
      view.add(addPlayerForm, "button", "Add Player");
      playerId = model.data.players.length + 1;
      controller.add(addPlayerForm, "submit", function() {
        model.data.game["playerId"] = playerId;
        model.data.players.push({
          id: playerId,
          name: playerName.value,
          score: 0
        });
        console.log(`Player ${getPlayer(playerId).name} added`);
        start();
      });
    },

//...........................................................................

    getPlayer = function(playerId) {
      for (let player of model.data.players) {
        if (player.id === playerId) return player;
      }
    },

//...........................................................................

    getRandomInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

//...........................................................................

    init = () =>
      controller.add(
        view.add(
        "quiz", "button", "New Game"),
        "click",
        addPlayer
      );

    return{ init : init, questionsAsked : questionsAsked }
})();
//quiz.init();
