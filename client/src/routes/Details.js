import React from "react";
import { Component } from "react/cjs/react.production.min";
import Navbar from "../components/Navbar/Navbar";
import ArticleDetails from "./../components/ArticleDetails/ArticleDetails";
import FooterLinks from "./../components/FooterLinks/FooterLinks";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {
        id: "",
        title: "",
        tag: "",
        author: "",
        date: "",
        imgUrl: "",
        imgAlt: "",
        content: "",
        saying: "",
      },
    };
  }

  componentDidMount() {
    const self = this;
    const { id } = this.props.params;

    fetch("http://localhost:3007/articles/" + id)
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          self.props.navigate("/*", { replace: true });
          return;
        }
        // Examine the text in the response
        response.json().then(function (data) {
          self.setState({ article: data });
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  render() {
    const { article } = this.state;

    return (
      <>
        {!this.state.article.id ? (
            <Loader />
        ) : (
          <>
            <Navbar />
            <ArticleDetails article={article} key={article.id} />
            <FooterLinks
              route="details"
              previousArticle={this.state.article.prevId}
              nextArticle={this.state.article.nextId}
            />
          </>
        )}
      </>
    );
  }
}

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const navigate = useNavigate();

  return <WrappedComponent {...props} params={params} navigate={navigate} />;
};
export default withRouter(Details);
