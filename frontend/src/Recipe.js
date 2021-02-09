import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardMedia, makeStyles, Typography, IconButton, List, ListItem, ListItemText, CardActions, Collapse, DialogContentText } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

const Recipe = ({ title, calories, ingredients, classes, deleteFunction }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton onClick={deleteFunction}>
            <DeleteIcon />
          </IconButton>
        }
        title={title}
      />
      <CardMedia
        className={classes.media}
        image=""
        title=""
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <List dense>
              {ingredients.map(ingredient => (
                <ListItem>
                  <ListItemText primary={ingredient} />
                </ListItem>
              ))}
            </List>
            <Typography paragraph>{calories} cal</Typography>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default Recipe;
