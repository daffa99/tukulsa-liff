import React, { Component, Fragment } from "react";
import { withRouter } from 'react-router-dom'
// import ReactMuter from "../Components/ReactMuter";
import { connect } from "unistore/react";
import { actions } from "../store/store";
// import component
import BottomNav from "../Components/BottomNav"
import AppBar from "../Components/AppBar";
import TableTransaction from "../Components/TableTransaction";
// material ui
import { Button, Grid } from "@material-ui/core";
import ReactMuter from "../Components/ReactMuter";


class Home extends Component {
   
  componentDidMount = async () => {
    console.log('1')
    await this.props.initializeLiff()
    console.log('atas7 masuk did mount',this.props)
    console.log('7')
    const { profile } = await this.props
    console.log('profile detail', profile)
    console.log('sblm masuk if userId', this.props.userId)
    if (this.props.userId === '') {
      console.log('8 fail')
      await this.props.getUserTransactions('Uc38d44c9d7f172a98011fca096171acd');
    } else {
      console.log('8 ocee')
      await this.props.getUserTransactions(this.props.userId);
    }
    
  }

  render() {
    console.log('di render', this.props.userId)
    console.log('di render',this.props.displayName)
    console.log('di render',this.props.pictureUrl)
    console.log('di render',this.props.statusMessage)
    return (
      <Fragment>
        {/* <ReactMuter /> */}
        <AppBar />
        <TableTransaction />
        <BottomNav />
        {this.props.isLoggedIn?
        null
        :
        <Fragment >

        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          style={{marginTop: "1em"}}
        >
          <Button variant="contained" color="primary" id="liffLoginButton" onClick={this.props.handleLoginLine}>Login</Button>
          <Button variant="contained" color="secondary" id="liffLogoutButton" onClick={this.props.handleLogoutLine}>Logout</Button>
        </Grid>
        <div class="buttonGroup">
          <p>
            {this.props.userId}
            {this.props.displayName}
            {this.props.pictureUrl}
            {this.props.statusMessage}
          </p>
        </div>
        </Fragment>
        }
      </Fragment>
    )
  }
}

export default connect('isLoggedIn, userId, displayName, pictureUrl, statusMessage', actions) (withRouter(Home));