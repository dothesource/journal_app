import React from "react"
import Header from "../../components/Header"
import InputCard from "../../components/InputCard"
import { Grid } from "material-ui"
import { withStyles } from "material-ui/styles"

const Home = ({ classes }) => (
  <div className={classes.root}>
    <Header />
    <div style={{ padding: 32, justifyContent: "center", display: "flex" }}>
      <Grid container spacing={16} xs={12} sm={12} md={6}>
        <Grid item xs={12}>
          <InputCard />
        </Grid>
        <Grid item xs={12}>
          <InputCard />
        </Grid>
        <Grid item xs={12}>
          <InputCard />
        </Grid>
      </Grid>
    </div>
  </div>
)

export default withStyles()(Home)
