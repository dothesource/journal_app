import React, { Component } from "react"
import Header from "../../components/Header"
import InputCard from "../../components/InputCard"
import { Grid } from "material-ui"
import { withStyles } from "material-ui/styles"

class Home extends Component {
  state = {
    textValue: "",
    type: "text",
    cardContentList: []
  }

  addCard = () => {
    this.setState(state => {
      const cardContentList = state.cardContentList.slice()
      cardContentList.push({ type: state.type, content: state.textValue })
      return { cardContentList }
    })
  }

  render = () => {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Header />
        <div style={{ padding: 32, justifyContent: "center", display: "flex" }}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <InputCard
                onChange={e => this.setState({ textValue: e.target.value })}
                onDone={this.addCard}
              />
            </Grid>
            {/*TODO: {this.state.cardContentList.map(item => item.content)} */}
            <Grid item xs={12}>
              <InputCard />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default withStyles()(Home)
