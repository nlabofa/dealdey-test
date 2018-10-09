import React, { Component } from "react";
import { Text, View, StyleSheet, Picker } from "react-native";
import { Button, Input, ProgressBar } from "../components/common";
import HeaderComponent from "../components/Header";
import { connect } from "react-redux";
import * as actions from "../store/actions";
class ShippingForm extends Component {
  state = {
    locationlist: null,
    areaListFetched: false,
    areaname: "Amuwo-Odofin", //default area name.
    stateid: 8 //default state i.e Lagos
  };
  componentDidMount = () => {
    //fetch the states and prefill the state picker
    this.props.getStateListing();
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.locationlist !== null) {
      //if states or areas details have been fetched, save details to locationlist state
      this.setState({ locationlist: nextProps.locationlist });
    }
    //if arealist was fetched .set the state to true. This is used for changing between state and areas view.
    if (nextProps.arealistfetched === true) {
      this.setState({
        areaListFetched: true
      });
    }
  }
  updatestate = val => {
    this.setState({ val });
  };
  render() {
    const {
      containerFill,
      container,
      normLText,
      viewStyle,
      progressBar,
      bottomHeader
    } = styles;
    const {
      largeloading,
      smalloading,
      getAreaListing,
      checkoutdetail,
      statename,
      createShippingAddress
    } = this.props;
    const { locationlist, areaListFetched, areaname, stateid } = this.state;
    this.leftContent = <Text style={normLText}>Shipping Info</Text>;
    this.rightContent = <Text />;
    let AreaItem = null;
    let StateItem = null;

    const contentData = {
      shipping_address: {
        name: "Opeyemi",
        address_line: "13, akin shittu street",
        state: statename,
        area: areaname
      }
    };
    //default render button view
    let renderButton = (
      <Button fullwidth onPress={() => getAreaListing(stateid)} color="#e25902">
        FIND AREA
      </Button>
    );
    //if areas has been fetched. change the renderbutton .
    if (areaListFetched === true) {
      renderButton = (
        <Button
          fullwidth
          onPress={() =>
            createShippingAddress(
              checkoutdetail.cart.id,
              contentData,
              checkoutdetail.total_amount
            )
          }
          color="#e25902"
        >
          CONTINUE
        </Button>
      );
    }
    //this is for changing the dropdown between states and areas
    if (locationlist !== null && areaListFetched === true) {
      AreaItem = locationlist.map(item => (
        <Picker.Item key={item.id} label={item.name} value={item.name} />
      ));
    } else if (locationlist !== null && areaListFetched === false) {
      StateItem = locationlist.map(item => (
        <Picker.Item key={item.id} label={item.name} value={item.id} />
      ));
    }

    return largeloading ? (
      <View style={progressBar}>
        <ProgressBar sizeL="large" />
      </View>
    ) : (
      <View style={containerFill}>
        <HeaderComponent
          leftContent={this.leftContent}
          rightContent={this.rightContent}
        />
        <View style={container}>
          <Text style={[normLText, { textAlign: "center" }]}>
            Fill In Your Info To Proceed
          </Text>
          <View style={viewStyle}>
            {smalloading ? (
              <View style={progressBar}>
                <ProgressBar sizeL="large" />
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  // backgroundColor: "red",
                  alignItems: "center"
                }}
              >
                <Text style={normLText}>
                  Choose {areaListFetched ? "Area" : "State"}:
                </Text>
                {areaListFetched ? (
                  <Picker
                    selectedValue={areaname}
                    onValueChange={itemValue =>
                      this.setState({ areaname: itemValue })
                    }
                    style={{
                      width: 120,
                      borderwidth: 1,
                      borderColor: "#f8f8f8"
                    }}
                  >
                    {AreaItem}
                  </Picker>
                ) : (
                  <Picker
                    selectedValue={stateid}
                    onValueChange={itemValue =>
                      this.setState({
                        stateid: itemValue
                      })
                    }
                    style={{
                      width: 120,
                      borderwidth: 1,
                      borderColor: "#f8f8f8"
                    }}
                  >
                    {StateItem}
                  </Picker>
                )}
              </View>
            )}

            <View />
          </View>
        </View>
        <View style={bottomHeader}>{renderButton}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerFill: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    position: "relative"
  },
  container: {
    paddingHorizontal: "2%"
  },
  progressBar: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  viewStyle: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: "relative"
  },
  normLText: {
    color: "black",
    fontWeight: "500",
    fontSize: 18,
    textTransform: "uppercase"
  },

  bottomHeader: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: "absolute",
    bottom: 0,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%"
  }
});

const mapStateToprops = state => {
  return {
    largeloading: state.ui.largeloading,
    smalloading: state.ui.smalloading,
    checkoutdetail: state.cart.checkoutdetail,
    locationlist: state.cart.locationlist,
    arealistfetched: state.cart.arealistfetched,
    statename: state.cart.statename
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getStateListing: () => dispatch(actions.getStateListing()),
    getAreaListing: id => dispatch(actions.getAreaListing(id)),
    createShippingAddress: (cart_id, content, total_amount) =>
      dispatch(actions.createShippingAddress(cart_id, content, total_amount))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(ShippingForm);
