import "./App.css";
import { Fragment, useEffect, useState } from "react";
import "./styles.css";

function App() {
    const [questions, setQuestions] = useState([]);

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
            return <button className="answerBtn">{elem}</button>;
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
                <p>Введите ваш ответ</p>
                <input type="text" />
            </>
        );
    }

    return (
        <Fragment>
            <div className="MainSection">
                <div className="questionSection">{data}</div>
            </div>
        </Fragment>
    );
}

export default App;
