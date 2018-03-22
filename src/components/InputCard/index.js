import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import Card, { CardActions, CardContent } from "material-ui/Card"
import { Button, Input, Typography } from "material-ui"

const styles = theme => ({
  card: {
    minWidth: 275
  },
  input: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    display: "flex"
  },
  actionButtonDone: {
    marginLeft: "auto"
  },
  headline: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
})

const InputCard = props => {
  const { classes, onChange, onDone } = props
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.headline}
            gutterBottom
            variant="headline"
            component="h2"
          >
            {new Date(Date.now()).toLocaleTimeString("en-GB")}
          </Typography>
          <Input
            id="input"
            disableUnderline
            placeholder="Type here..."
            multiline
            className={classes.input}
            onChange={onChange}
          />
        </CardContent>
        <CardActions>
          <Button
            className={classes.actionButtonDone}
            size="small"
            onClick={() => onDone()}
          >
            Done
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

InputCard.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func
}

export default withStyles(styles)(InputCard)
