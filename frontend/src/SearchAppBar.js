import React from 'react'
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  InputBase,
  IconButton
} from "@material-ui/core";
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
    },
  }
}))

const SearchAppBar = ({ searchValue, onChange, onSearch, clearSearch, toggleAddRecipeUI }) => {
  const classes = useStyles()

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch()
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Willbesometitle
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            onKeyDown={handleKeyDown}
            onChange={onChange}
            value={searchValue}
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
          {
            searchValue !== "" &&
            <IconButton onClick={clearSearch}>
              <ClearIcon />
            </IconButton>
          }
        </div>
        <Button
          color="secondary"
          variant="contained"
          onClick={toggleAddRecipeUI}>
          Create new recipe
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default SearchAppBar