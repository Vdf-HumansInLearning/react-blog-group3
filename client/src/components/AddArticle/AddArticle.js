import React from "react";
import { Component } from "react/cjs/react.production.min";
import "./AddArticle.css";

class AddArticle extends Component {
  constructor(props) {
    super(props);
    props = this.props;
  }
  render() {
    return (
      <div className="add-article-button">
        <div className="add__container">
          <button
            className="button open-modal fas fa-plus"
            onClick={() => this.props.openModal("add")}
          >
            Add Article
          </button>
        </div>
      </div>
    );
  }
}
export default AddArticle;
