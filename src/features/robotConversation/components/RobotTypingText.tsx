import { useEffect, useState } from "react";

type RobotTypingTextProps = {
  speed?: number;
  text: string;
};

export const RobotTypingText = ({ speed = 12, text }: RobotTypingTextProps) => {
  const [visibleText, setVisibleText] = useState(text);

  useEffect(() => {
    setVisibleText("");

    if (!text) {
      return;
    }

    let currentIndex = 0;
    const intervalId = window.setInterval(() => {
      currentIndex += 1;
      setVisibleText(text.slice(0, currentIndex));

      if (currentIndex >= text.length) {
        window.clearInterval(intervalId);
      }
    }, speed);

    return () => window.clearInterval(intervalId);
  }, [speed, text]);

  return <>{visibleText}</>;
};
