import Head from "next/head";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const inputText = useRef();

  const [returnedDataOne, setreturnedDataOne] = useState([]);
  const [returnedDataTwo, setreturnedDataTwo] = useState([]);
  const [returnedDataThree, setreturnedDataThree] = useState([]);
  const [returnedDataFour, setreturnedDataFour] = useState([]);
  const [returnedDataFive, setreturnedDataFive] = useState([]);
  const [returnedDataSix, setreturnedDataSix] = useState([]);

  async function analyzeTextHandler(enteredText) {
    const response = await fetch("/api/analyze-text", {
      method: "POST",
      body: JSON.stringify(enteredText),
      headers: {
        "Contect-type": "application/json",
      },
    });

    const data = await response.json();

    setreturnedDataOne(data.message.one);
    setreturnedDataTwo(data.message.two);
    setreturnedDataThree(data.message.three);
    setreturnedDataFour(data.message.four);
    setreturnedDataFive(data.message.five);
    setreturnedDataSix(data.message.six);
  }

  function sendText(event) {
    event.preventDefault();

    const enteredText = (inputText.current.value + "").replace(
      /[^\u4e00-\u9fff，。《》“”·？]/g,
      ""
    );

    inputText.current.value = enteredText;

    analyzeTextHandler(enteredText);
  }

  return (
    <div className={styles.container}>
      <h1>HSK Vocab Analyzer</h1>
      <div>
        <form className={styles.textForm} onSubmit={sendText}>
          <textarea rows={7} ref={inputText} />
          <button>Analyze Text</button>
        </form>
      </div>

      <div className={styles.resultsContainer}>
        <div>
          <p className={styles.titles}>HSK 1 words:</p>
        </div>
        <div>
          {returnedDataOne.map((item, index) => (
            <span key={item}>{(index ? "，" : "") + item}</span>
          ))}
        </div>
        <div>
          <p className={styles.titles}>HSK 2 words:</p>
        </div>
        <div>
          {returnedDataTwo.map((item, index) => (
            <span key={item}>{(index ? "，" : "") + item}</span>
          ))}
        </div>
        <div>
          <p className={styles.titles}>HSK 3 words:</p>
        </div>
        <div>
          {returnedDataThree.map((item, index) => (
            <span key={item}>{(index ? "，" : "") + item}</span>
          ))}
        </div>
        <div>
          <p className={styles.titles}>HSK 4 words:</p>
        </div>
        <div>
          {returnedDataFour.map((item, index) => (
            <span key={item}>{(index ? "，" : "") + item}</span>
          ))}
        </div>
        <div>
          <p className={styles.titles}>HSK 5 words:</p>
        </div>
        <div>
          {returnedDataFive.map((item, index) => (
            <span key={item}>{(index ? "，" : "") + item}</span>
          ))}
        </div>
        <div>
          <p className={styles.titles}>HSK 6 words:</p>
        </div>
        <div>
          {returnedDataSix.map((item, index) => (
            <span key={item}>{(index ? "，" : "") + item}</span>
          ))}
        </div>
      </div>

      <h2>How does it work?</h2>
      <p>
        Simply enter your Chinese (Mandarin) text above and analyze
        <br />
        Get a list of words distributed by HSK level
        <br />
        Common punctuation marks like 。，“” 《》· ？help split the text into
        sections but everything else is ignored
      </p>
      <h3>Please Note!</h3>
      <p>
        There is no inference of meaning with regards to context. For example,
        the HSK 6 word <br /> 爱不释手 will return the HSK 6 word - 爱不释手 as
        well as two HSK 1 words - 爱，不
      </p>
      <p></p>
    </div>
  );
}
