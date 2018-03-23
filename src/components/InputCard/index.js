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
  },
  disabled: { color: "black" }
})

const InputCard = props => {
  const {
    classes,
    onChange,
    onDone,
    disabled,
    defaultValue,
    onEditPress
  } = props
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
            disabled={disabled}
            defaultValue={defaultValue}
            classes={{
              disabled: classes.disabled
            }}
          />
        </CardContent>
        <CardActions>
          <Button
            className={classes.actionButtonDone}
            size="small"
            onClick={() => (disabled ? onEditPress() : onDone())}
          >
            {disabled ? "Edit" : "Done"}
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

InputCard.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  onDone: PropTypes.func,
  defaultValue: PropTypes.string,
  onEditPress: PropTypes.func
}

InputCard.defaultProps = {
  onChange: () => null,
  disabled: false,
  onDone: () => null,
  onEditPress: () => null
}

export default withStyles(styles)(InputCard)
