"use client";

import { useRef, useState } from "react";

import Image from "next/image";

import { Bungee_Shade } from "next/font/google";
const bungee = Bungee_Shade({ weight: "400", subsets: ["latin"] });


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
    <div className="text-center font-sans">
      <section className="mx-auto">
        <h1 className={`${bungee.className} text-4xl p-2`}>HSK Text Analyser</h1>
        <div>
          <form onSubmit={sendText}>
            <textarea rows={7} ref={inputText} />
            <p className="text-xs mt-2 max-w-prose mx-auto">*We are using the free tier on Render to host the API, so please wait a minute and try again if it takes a while to respond.</p>
            <button className="block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded transition duration-300 ease-in-out">
              Analyse Text
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

      <div className="inline-block text-left max-w-prose m-2 border-2 border-slate-700 p-4 bg-amber-50">
        <p>
          Simply enter your Chinese (Mandarin) text above and analyse.
          <br />
          Get a list of words distributed by HSK level.
          <br />
          Common punctuation marks like 。，“” 《》· ？help split the text into
          sections but everything else is ignored.
        </p>
        <p>
          <span className="font-black">Please Note!</span> There is no inference
          of meaning with regards to context. For example, the HSK 6 word
          爱不释手 will return the HSK 6 word 爱不释手 as well as the two HSK 1
          words 爱 and 不.
        </p>
      </div>

      <a
        href={"https://github.com/ThanosDodd/hsk-text-analyser"}
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src={"/github_icon.png"}
          width={40}
          height={40}
          alt={`github icon`}
          className="mx-auto mb-4 hover:cursor-pointer mt-10"
        />
      </a>

      <footer className="w-full text-center text-sm text-gray-500 bg-slate-300">
      Made with ❤️ by{" "}
      <a
        href="https://www.thanosdodd.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Thanos Dodd
      </a>
    </footer>
    </div>
  );
}
