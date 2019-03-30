import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';

const suggestions = [
  { label: 'Rye Bread' },
  { label: 'Pita Bread' },
  { label: 'Whole-Wheat Bread' },
  { label: 'White Bread' },
  { label: 'Cinnamon Raisin' },
  { label: 'Green Eggs and Ham Omelette ' },
  { label: 'Smoked Beef Omelet' },
  { label: 'German Omelette With Bacon' },
  { label: 'Body Builder Omelet' },
  { label: 'Fluffy Cheese Omelette' },
  { label: 'Jalapeno Omelet' },
  { label: 'Chocolate chip' },
  { label: 'Cookies and cream' },
  { label: 'Strawberry' },
  { label: 'Vanilla' },
  { label: 'Apples' },
  { label: 'Clementine' },
  { label: 'Bananas' },
  { label: 'Cucumbers' },
  { label: 'Avocados' },
  { label: 'Apricots' },
  { label: 'Grapefruit' },
  { label: 'Watermelons' },
  { label: 'Asparagus' },
  { label: 'Cauliflower' },
  { label: 'Broccoli' },
  { label: 'Cabbage' },
  { label: 'Carrot' },
  { label: 'Brownie' },
  { label: 'Tonic Water'},
  { label: 'Soda Water'},
  { label: 'Water' },
  { label: 'Sparkling Water'},
  { label: 'Diet Soda' },
  { label: 'Chicken'},
  { label: 'Grilled Chicken Breast' },
  { label: 'Chicken Marsala ' },
  { label: 'Chicken Parmigiana' },
  { label: 'Rotisseri Chicken' },
  { label: 'Chicken and Dumplings' },
  { label: 'Pork' }, 
  { label: 'Pork Chop' },
  { label: 'Pork Loin' },
  { label: 'Ribs' },
  { label: 'Bacon' },
  { label: 'Pork Vinadloo' },
   { label: 'Beef' }, 
  { label: 'Hamburger' },
  { label: 'Roast Beef' },
  { label: 'Beef Stroganoff' },
  { label: 'Beef Stew' },
  { label: 'Ginger Beef' },
  { label: 'Fish' }, 
  { label: 'Salmon' },
  { label: 'Talapia' },
  { label: 'Cod' },
  { label: 'Trout' },
  { label: 'Tuna Fish' },
  { label: 'Salad' }, 
  { label: 'Greek Salad' },
  { label: 'South Western Salad' },
  { label: 'Cobb Salad' },
  { label: 'Ceaser Salad' },
  { label: 'Spinach Salad' },
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
          input: classes.input,
        },
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
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          ),
        )}
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
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

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
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  /* divider: {
    height: theme.spacing.unit * 2,
  }, */
});

class IntegrationAutosuggest extends React.Component {
  state = {
    single: '',
    popper: '',
    suggestions: [],
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
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
      renderSuggestion,
    };

    return (
      <div style={{"width": "20vw"}} className={classes.root}>
        <Autosuggest 
          {...autosuggestProps}
          inputProps={{
            classes,
            id:"foodSearchInput",
            placeholder:"Example: chicken",
     
            value: this.state.single,
            onChange: this.handleChange('single'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
        <div className={classes.divider} />
        {/* <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            label: 'Label',
            placeholder: 'With Popper',
            value: this.state.popper,
            onChange: this.handleChange('popper'),
            inputRef: node => {
              this.popperNode = node;
            },
            InputLabelProps: {
              shrink: true,
            },
          }}
          theme={{
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Popper anchorEl={this.popperNode} open={Boolean(options.children)}>
              <Paper
                square
                {...options.containerProps}
                style={{ width: this.popperNode ? this.popperNode.clientWidth : null }}
              >
                {options.children}
              </Paper>
            </Popper>
          )}
        /> */}
      </div>
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);
