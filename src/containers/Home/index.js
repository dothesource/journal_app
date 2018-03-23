import React, { Component } from "react"
import Header from "../../components/Header"
import InputCard from "../../components/InputCard"
import { Grid, Paper, IconButton } from "material-ui"
import { withStyles } from "material-ui/styles"
import ImageIcon from "material-ui-icons/Image"

class Home extends Component {
  state = {
    textValue: "",
    type: "text",
    cardContentList: [],
    editing: undefined
  }

  addCard = () => {
    this.setState(state => {
      const cardContentList = state.cardContentList.slice()
      //TODO: Array.unshift (opposite of push)
      cardContentList.push({ type: state.type, content: state.textValue })
      return { cardContentList }
    })
  }

  onChangeItem = ({ value, index }) => {
    this.setState(state => {
      const cardContentList = state.cardContentList.slice()
      cardContentList[index].content = value
      return { cardContentList }
    })
  }

  render = () => {
    const { classes } = this.props
    console.log(this.state.cardContentList)
    return (
      <div className={classes.root}>
        <Header />
        <div style={{ padding: 32, justifyContent: "center", display: "flex" }}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Paper
                style={{
                  padding: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <span style={{ display: "flex", flex: 1 }}>
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
            </Grid>

            {/* TODO: convert code above to component, and make it add a new card
            
             <Grid item xs={12}>
              <InputCard
                onChange={e => this.setState({ textValue: e.target.value })}
                onDone={this.addCard}
              />
            </Grid> */}
            {this.state.cardContentList.map((item, i) => (
              <Grid key={i} item xs={12}>
                <InputCard
                  disabled={this.state.editing !== i}
                  defaultValue={item.content}
                  onDone={() => this.setState({ editing: undefined })}
                  onEditPress={() => this.setState({ editing: i })}
                  onChange={e =>
                    this.onChangeItem({ value: e.target.value, index: i })
                  }
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    )
  }
}

export default withStyles()(Home)
