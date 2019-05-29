import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import API from "../utils/API";

let value = "te";

const styles = theme => ({
  root: {
    // flexGrow: 1,
    // height: 250
  },
  input: {
    display: "flex",
    padding: 0,
    paddingLeft: 12
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 12,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1500,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      variant="filled"
      value={value}
      onChange={() => handleInputChange("value")}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

const handleInputChange = property => event => {
  return e => {
    this.setState({ [property]: e.target.value });
  };
};

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

function inputHandler(state, props) {
  return { value: state.value + 5 };
}

class IntegrationReactSelect extends React.Component {
  state = {
    single: null,
    multi: null,
    value: 0,
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.handleInputChange = handleInputChange.bind(this);
  }

  componentDidMount = () => {
    this.updateDropdownSuggestions();
  };

  componentDidUpdate = () => {
    if (this.props.fetchDropdownData) {
      this.updateDropdownSuggestions();
    }
  };

  updateDropdownSuggestions = () => {
    API.getMealNames(localStorage.userId).then(res => {
      let suggestions = [];
      if (res.data.length) {
        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < res.data[i].meal.length; j++) {
            suggestions.push({
              label: res.data[i].meal[j].name,
              value: res.data[i].meal[j]._id
            });
          }
        }

        suggestions.sort((a, b) =>
          a.label > b.label ? 1 : b.label > a.label ? -1 : 0
        );

        suggestions = suggestions.map(suggestion => ({
          label: suggestion.label,
          value: suggestion.value
        }));

        this.setState({ suggestions });
      }
    });
  };

  handleChange = name => value => {
    if (value) this.props.handleLoadMealChange(value);
    this.setState({
      [name]: value,
      inputHandler
    });
  };

  render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            styles={selectStyles}
            options={this.state.suggestions}
            components={components}
            value={this.state.single}
            onChange={this.handleChange("single")}
            placeholder="Load meal"
            isClearable
          />
        </NoSsr>
      </div>
    );
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);
