import React, { Component } from "react"
import { Paper, IconButton } from "material-ui"
import ImageIcon from "material-ui-icons/Image"
import { withStyles } from "material-ui/styles"
import PropTypes from "prop-types"

const styles = theme => ({
  paper: {
    padding: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }
  // headline: {
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit
  // },
})

class AddEntry extends Component {
  render() {
    const { classes, visible, onClick } = this.props
    if (!visible) return null
    return (
      <Paper className={classes.paper}>
        <span onClick={onClick} style={{ display: "flex", flex: 1 }}>
          Add new entry...
        </span>
        <IconButton
          style={{ height: 24 }}
          className={classes.button}
          aria-label="Edit"
        >
          <ImageIcon />
        </IconButton>
      </Paper>
    )
  }
}

AddEntry.propTypes = {
  visible: PropTypes.bool,
  onClick: PropTypes.func
}

export default withStyles(styles)(AddEntry)
