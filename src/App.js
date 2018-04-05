import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import logo from "./logo.png";
import "./App.css";

const domains = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.ca",
  "yahoo.com"
];

//look up domain suggestions using substring after "@" symbol
function getSuggestions(value) {
  let domainValue = value.split("@")[1];
  const regex = new RegExp("^" + domainValue, "i");
  return domains.filter(domain => regex.test(domain));
}

function renderSuggestion(suggestion) {
  return <span>{suggestion}</span>;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      showAcceptIcon: "none",
      showRejectIcon: "none",
      value: "",
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  //concatenate the user's input with selected suggested domain
  getSuggestionValue = suggestion => {
    return `${this.state.value.split("@")[0]}@${suggestion}`;
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  //initiate auto-suggestion only when a user enters the "@" symbol
  shouldRenderSuggestions = value => {
    return value.includes("@");
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      onChange: this.onChange,
      onBlur: this.handleValidation
    };
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Invoice Simple Coding Challenge</h1>
        </header>

        <p className="field-name-email"> Email </p>
        <span>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            shouldRenderSuggestions={this.shouldRenderSuggestions}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </span>
        <span
          className="invalid-msg"
          style={{ display: this.state.hasError ? "block" : "none" }}
        >
          Sorry, your email doesn't seem to be valid...
          <span> </span>
        </span>
        <br />
        <button
          type="submit"
          className="btn btn-primary submit-btn"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    alert(`Thanks for trying this out! Feel free to reach out to me :)`);
  };

  handleValidation = async () => {
    //check if email address is valid through kickbox.io (using verifyEmail function)
    let verification = await this.verifyEmail();
    if (verification.result === "deliverable") {
      this.setState({ hasError: false });
      this.setState({ showAcceptIcon: "block" });
      this.setState({ showRejectIcon: "none" });
      //add to list of valid email domain for future autocomplete
      if (!domains.includes(this.state.value.split("@")[1])) {
        domains.push(this.state.value.split("@")[1]);
      }
    } else {
      this.setState({ hasError: true });
      this.setState({ showAcceptIcon: "none" });
      this.setState({ showRejectIcon: "block" });
    }
  };

  verifyEmail = async () => {
    const key =
      "live_da9fda4cb72af61819544442c016d1dcdba4ccb357ff03f95f84d8b28636d4ac";
    let url = `https://cors-anywhere.herokuapp.com/https://api.kickbox.com/v2/verify?email=${
      this.state.value
    }&apikey=${key}`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });
    let body = await response.json();
    return body;
  };
}

export default App;
