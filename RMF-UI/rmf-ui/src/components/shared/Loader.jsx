import * as React from "react";
import { ColorRing } from "react-loader-spinner";

export default function CircularIndeterminate(props) {
  return (
    <ColorRing
      visible={props.visible}
      height="500"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    />
  );
}
