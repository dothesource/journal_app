import React, { Component } from "react"
import Header from "../../components/Header"
import InputCard from "../../components/InputCard"
import AddEntry from "../../components/AddEntry"
import { Grid } from "material-ui"
import { withStyles } from "material-ui/styles"

class Home extends Component {
  state = {
    cardContentList: [],
    editing: undefined,
    addEntryVisible: true
  }

  addCard = () => {
    this.setState(state => {
      const currentTime = new Date(Date.now()).toLocaleTimeString("en-GB")
      const cardContentList = [
        { type: "text", content: "", time: currentTime },
        ...state.cardContentList
      ]
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

  onClickAddEntry = () => {
    this.addCard()
    this.setState({ addEntryVisible: false, editing: 0 })
  }

  render = () => {
    const { classes } = this.props
    const { addEntryVisible } = this.state
    console.log(this.state.cardContentList)
    return (
      <div className={classes.root}>
        <Header />
        <div style={{ padding: 32, justifyContent: "center", display: "flex" }}>
          <Grid container spacing={16} style={{ justifyContent: "center" }}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <AddEntry
                visible={addEntryVisible}
                onClick={this.onClickAddEntry}
              />
            </Grid>
            {this.state.cardContentList.map((item, i) => (
              <Grid key={i} item xs={12}>
                <InputCard
                  title={item.time}
                  disabled={this.state.editing !== i}
                  value={item.content}
                  onDone={() =>
                    this.setState({ editing: undefined, addEntryVisible: true })
                  }
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
