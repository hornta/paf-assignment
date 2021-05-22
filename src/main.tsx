import { render } from "react-dom";
import { App } from "./app/app";
import "./main.css";

const appRoot = document.querySelector("#root");
render(<App />, appRoot);
