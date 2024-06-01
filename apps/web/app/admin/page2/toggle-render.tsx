import { Button, Radio } from "antd";
import { useState } from "react";

export const ToggleRender = ({ children }: { children: any }) => {
  const [show, setShow] = useState(true);

  return (
    <div>
      <div className=" min-h-10 border-orange-600 border">
        {show && children}
      </div>
      <Button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</Button>
    </div>
  );
};
