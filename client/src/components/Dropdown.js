import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

var userInput = "";
var suggestions = [];
const searchEx = [
  "Chicken...",
  "Ice Cream...",
  "Egg...",
  "Taco...",
  "Cheeseburger..."
];

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);
  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        <span style={{ fontWeight: 100, fontStyle: "bold" }}>
          <img height="35" width="40" src={suggestion.img} />
          {suggestion.label}
        </span>
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 20
  },
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1500,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  }
});

class IntegrationAutosuggest extends React.Component {
  state = {
    single: "",
    popper: "",
    suggestions: []
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.props.onChange(newValue, "food");
    userInput = newValue;
    if (userInput !== undefined && userInput.length >= 3) {
      this.getSuggestionsFromAPI();
    }
    this.setState({
      [name]: newValue
    });
  };

  getSuggestionsFromAPI = async event => {
    const APP_ID = "eb95abc3";
    const APP_KEY = "368d7805ed86900874f9dc4fb92aba0f";

    let foodSearchQuery = userInput;
    console.log(foodSearchQuery);
    const response = await fetch(
      "https://trackapi.nutritionix.com/v2/search/instant",
      {
        method: "post",
        headers: {
          "x-app-key": APP_KEY,
          "x-app-id": APP_ID,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: foodSearchQuery
        })
      }
    );
    if (response.status !== 200) {
      console.log("Error: " + response);
    }
    const data = await response.json();
    console.log(data.common);
    const results = [];
    let length = 5;
    if (data.common.length < length) {
      length = data.common.length;
    }
    for (let i = 0; i < length; i++) {
      results.push(data.common[i]);
    }
    let foodItemArr = [];
    if (results !== undefined) {
      results.forEach(element => {
        let food = {};
        food["label"] = element.food_name;
        food["img"] = element.photo.thumb;
        food["id"] = element.tag_id;
        foodItemArr.push(food);
      });
    }
    this.props.fetchInstantData(foodItemArr);
    this.setState({
      suggestions: foodItemArr
    });
  };

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion
    };

    return (
      <React.Fragment>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            id: "foodSearchInput",
            placeholder: searchEx[Math.floor(Math.random() * searchEx.length)],

            value: this.state.single,
            onChange: this.handleChange("single")
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
        <div className={classes.divider} />
      </React.Fragment>
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IntegrationAutosuggest);
