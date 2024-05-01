import React, { Component } from "react";
import { ClipLoader } from "react-spinners";

export default class Loader extends Component {
      render() {
        return (
          <div className="loader-div">
            <ClipLoader />
          </div>
        )
      }
}