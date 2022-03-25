import * as React from "react";

import "../styles/input.css";

type Props = {
  userInput: string;
  setUserInput: Function;
};

const Input = (props: Props) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setUserInput(e.target.value);
  };

  return (
    <div className="Input">
      <input
        className="pixel-border"
        type="text"
        name="text"
        placeholder="..."
        value={props.userInput}
        onChange={handleInput}
      />
    </div>
  );
};

export default Input;
