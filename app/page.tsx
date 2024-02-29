"use client";

import { useRef, useState } from "react";

export default function Home() {
  const inputText = useRef<HTMLTextAreaElement>(null);

  const [returnedDataOne, setreturnedDataOne] = useState([]);
  const [returnedDataTwo, setreturnedDataTwo] = useState([]);
  const [returnedDataThree, setreturnedDataThree] = useState([]);
  const [returnedDataFour, setreturnedDataFour] = useState([]);
  const [returnedDataFive, setreturnedDataFive] = useState([]);
  const [returnedDataSix, setreturnedDataSix] = useState([]);

  async function analyzeTextHandler(enteredText: any) {
    console.log(enteredText);

    const requestBody = {
      test: enteredText,
    };

    const response = await fetch("https://hsk-analyser-api.onrender.com", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    setreturnedDataOne(data.one);
    setreturnedDataTwo(data.two);
    setreturnedDataThree(data.three);
    setreturnedDataFour(data.four);
    setreturnedDataFive(data.five);
    setreturnedDataSix(data.six);
  }

  function sendText(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredText = (inputText.current!.value + "").replace(
      /[^\u4e00-\u9fff，。《》“”·？]/g,
      ""
    );

    inputText.current!.value = enteredText;

    analyzeTextHandler(enteredText);
  }

  return (
    <div className="text-center">
      <section className="mx-auto">
        <h1>HSK Vocab Analyzer</h1>
        <div>
          <form onSubmit={sendText}>
            <textarea rows={7} ref={inputText} />
            <button className="block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
              Analyze Text
            </button>
          </form>
        </div>
      </section>

      <table className="mx-auto mt-1">
        <tbody>
          <tr>
            <td className="border-2 border-sky-500">HSK 1 words:</td>
            <td className="border-2 border-sky-500">
              {returnedDataOne.map((item, index) => (
                <span key={item}>{(index ? "，" : "") + item}</span>
              ))}
            </td>
          </tr>
          <tr>
            <td className="border-2 border-sky-500">HSK 2 words:</td>
            <td className="border-2 border-sky-500">
              {returnedDataTwo.map((item, index) => (
                <span key={item}>{(index ? "，" : "") + item}</span>
              ))}
            </td>
          </tr>
          <tr>
            <td className="border-2 border-sky-500">HSK 3 words:</td>
            <td className="border-2 border-sky-500">
              {returnedDataThree.map((item, index) => (
                <span key={item}>{(index ? "，" : "") + item}</span>
              ))}
            </td>
          </tr>
          <tr>
            <td className="border-2 border-sky-500">HSK 4 words:</td>
            <td className="border-2 border-sky-500">
              {returnedDataFour.map((item, index) => (
                <span key={item}>{(index ? "，" : "") + item}</span>
              ))}
            </td>
          </tr>
          <tr>
            <td className="border-2 border-sky-500">HSK 5 words:</td>
            <td className="border-2 border-sky-500">
              {returnedDataFive.map((item, index) => (
                <span key={item}>{(index ? "，" : "") + item}</span>
              ))}
            </td>
          </tr>
          <tr>
            <td className="border-2 border-sky-500">HSK 6 words:</td>
            <td className="border-2 border-sky-500">
              {returnedDataSix.map((item, index) => (
                <span key={item}>{(index ? "，" : "") + item}</span>
              ))}
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="mt-2">How does it work?</h2>
      <div className="inline-block text-left">
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
          the HSK 6 word <br /> 爱不释手 will return the HSK 6 word - 爱不释手
          as well as two HSK 1 words - 爱，不
        </p>
      </div>
    </div>
  );
}
