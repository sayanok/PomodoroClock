import React, { useEffect, useRef, useState } from "react";
import sound from "./alert.mp3";

const App: React.FC = () => {
  const [timer, setTimer] = useState(1500);
  const [session, setSession] = useState<"作業セッション" | "休憩セッション">("作業セッション");
  const [timerStatus, setTimerStatus] = useState<"開始" | "一時停止">("開始");
  let timeoutId = useRef<NodeJS.Timer>();
  const alert = new Audio(sound);

  useEffect(() => {
    if (timer === 0) {
      alert.play();
    } else if (timer === -1) {
      clearInterval(timeoutId.current);
      changeTimer();
    }
  }, [timer]);

  function onClickHandler() {
    if (timerStatus === "開始") {
      countdown();
      setTimerStatus("一時停止");
    } else {
      clearInterval(timeoutId.current);
      setTimerStatus("開始");
    }
  }

  function countdown() {
    timeoutId.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  }

  function changeTimer() {
    setTimer(session === "作業セッション" ? 300 : 1500);
    setSession(session === "作業セッション" ? "休憩セッション" : "作業セッション");
    countdown();
  }

  function reset() {
    clearInterval(timeoutId.current);
    setSession("作業セッション");
    setTimer(1500);
    setTimerStatus("開始");
  }
  return (
    <>
      <p>
        タイマー：{Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" + (timer % 60) : timer % 60}
      </p>
      <p>現在のセッション:{session}</p>
      <button onClick={() => onClickHandler()}>{timerStatus === "開始" ? "開始" : "一時停止"}</button>
      <button onClick={() => reset()}>リセット</button>
    </>
  );
};

export default App;
