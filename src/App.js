import "./App.css";
import { Fragment, useEffect, useState } from "react";
import "./styles.css";

function App() {
    const [questions, setQuestions] = useState([]);
    const [isDone, setIsDone] = useState(false)
    let windowPosition = 0;
    function nextQuestion() {
        let quizWindow = document.querySelector(".questionSection");
        windowPosition -= 460;
        quizWindow.style.top = windowPosition + "px";
        if (windowPosition <= -1800) {
            quizWindow.style.top = "0px";
            windowPosition = 0;
            setIsDone(true)
        }
    }

    useEffect(() => {
        (async function fetchMyAPI() {
            let response = await fetch(
                "https://api.jsonbin.io/b/621265851b38ee4b33c23ba0/4"
            );
            response = await response.json();
            setQuestions(response);
        })();
    }, []);

    const data = questions.map((elem) => {
        return (
            <div className="questionMainWindow" key={elem.question}>
                {elem.type === "test" ? (
                    <TestModule props={elem} />
                ) : (
                    <QuestionModule props={elem} />
                )}
            </div>
        );
    });


    function TestModule({ props }) {
        let answers = props.options;
        let answerButtons = answers.map((elem) => {
            return (
                <button disabled={isDone} onClick={nextQuestion} className="answerBtn">
                    {elem}
                </button>
            );
        });

        return (
            <>
                <h1>{props.question}</h1>
                {props.image ? (
                    <div className="testDivImg">
                        <img
                            alt="pic"
                            className="testImg"
                            width="400px"
                            height="150px"
                            src={props.image}
                        />{" "}
                    </div>
                ) : null}
                <div className="answerBtnBlock">{answerButtons}</div>
            </>
        );
    }

    function QuestionModule({ props }) {
        return (
            <>
                <h1>{props.question}</h1>
                {props.image ? (
                    <div className="testDivImg">
                        <img
                            alt="pic"
                            className="testImg"
                            width="400px"
                            height="150px"
                            src={props.image}
                        />{" "}
                    </div>
                ) : null}
                <input type="text" />
                <button disabled={isDone} className="questionSbmtBtn" onClick={nextQuestion}>
                    Sumbit
                </button>
            </>
        );
    }

    return (
        <Fragment>
            <div className="MainSection">
                <div className="questionWindow">
                    <div className="questionSection">{data}</div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
