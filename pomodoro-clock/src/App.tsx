import React, { useEffect, useRef, useState } from "react";

const App: React.FC = () => {
  const [timer, setTimer] = useState(3);
  const [session, setSession] = useState<"作業セッション" | "休憩セッション">("作業セッション");
  // const [timeoutId, setTimeoutId] = useState<NodeJS.Timer>();
  let timeoutId = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (timer === 0) {
      clearInterval(timeoutId.current);
    }
  }, [timer]);

  function onClickHandler() {
    // timerStart();
    countdown();
  }

  // function timerStart() {
  //   setTimeout(() => {
  //     changeTimer();
  //   }, timer);
  // }

  function countdown() {
    timeoutId.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  }

  function changeTimer() {
    console.log("changeTimer");
    // セッションを変更する
    // タイマーを切り替える
  }

  function pause() {
    // タイマーを一時停止する
  }

  function reset() {
    setSession("作業セッション");
  }
  return (
    <>
      <p>タイマー：{timer}</p>
      <p>現在のセッション:{session}</p>
      <button onClick={() => onClickHandler()}>開始｜停止</button>
      <button onClick={() => reset()}>リセット</button>
    </>
  );
};

export default App;
