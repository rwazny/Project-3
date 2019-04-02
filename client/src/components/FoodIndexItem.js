import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';



const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export function FoodIndexItem({
  name,
  brand_name,
  calories,
  protein,
  carbohydrates,
  fats
  }) {
    
    return (
    <Card >
      <CardContent>
      <span style={{ fontWeight: 'bolder', fontSize: '20px', color: 'black' }}>
        {name}
      </span>
      <List component="nav">
          <ListItem><ListItemText primary={'Brand Name: ' + brand_name} /></ListItem>
          <ListItem><ListItemText primary={'Calories: ' + calories} /></ListItem>
          <ListItem><ListItemText primary={'Protein: ' + protein + 'g'} /></ListItem>
          <ListItem><ListItemText primary={'Total Carbs: ' + carbohydrates + 'g'} /></ListItem>
          <ListItem><ListItemText primary={'Fat: ' + fats + 'g'} /></ListItem>

      </List>
      </CardContent>
    </Card>

    );
  }

  export default withStyles(styles)(FoodIndexItem);

