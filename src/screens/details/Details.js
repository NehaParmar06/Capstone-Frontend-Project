import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';

import './Details.css';
import { Button } from '@material-ui/core';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            restaurant: {
                id: "",
                restaurant_name: "",
                photo_URL: "",
                customer_rating: "",
                average_price: "",
                number_customers_rated: "",
                address: {
                  id: "",
                  flat_building_name: "",
                  locality: "",
                  city: "",
                  pincode: "",
                  state: {
                    id: "",
                    state_name: ""
                  }
                },
                categories: []
              }
        }
    }

    componentWillMount() {
        let that = this;
        let restaurantData = null;
        let xhrRestaurant = new XMLHttpRequest();
        xhrRestaurant.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({restaurant: JSON.parse(this.responseText)});
            }
        });

        xhrRestaurant.open("GET", this.props.baseUrl + "restaurant/"+ this.props.match.params.id);
        xhrRestaurant.setRequestHeader("Cache-Control", "no-cache");
        xhrRestaurant.send(restaurantData);
    }

    render() {
        let restaurant = this.state.restaurant;
        return (
            <div>
                <Header hideSearchBar={1} />
                <div className="details">
                    <div className="flex-containerDetails">
                    <div className="leftDetails">
                        <img src={restaurant.photo_URL}></img>
                    </div>

                    <div className="rightDetails">
                        <div>
                            <Typography className="bold" variant="h4" gutterBottom>{restaurant.restaurant_name}</Typography>
                        </div>
                        <div className="locality">
                            <Typography variant="h6" gutterBottom>{restaurant.address.locality}</Typography>
                        </div>
                        <div>
                            <Typography className="bold" variant="subtitle1" gutterBottom>
                                {restaurant.categories.map(category => (
                                    <span key={category.id} >{category.category_name}, </span>
                                ))}</Typography>
                        </div>
                        <div className="body2">
                            <div className="avg-customer-rating">
                                <span className="rating-cost"><i className="fa fa-star" aria-hidden="true"></i> {restaurant.customer_rating}</span>
                                <Typography className="avg-customer-rating-text" variant="caption" gutterBottom>Average rating by< br></br> <span className="bold">{restaurant.number_customers_rated}</span> customers</Typography>
                            </div>
                            <div className="avg-cost">
                                <span className="rating-cost"><i className="fa fa-inr" aria-hidden="true"></i> {restaurant.average_price}</span>
                                <Typography className="avg-cost-text" variant="caption" gutterBottom>Average cost for< br></br>two people</Typography>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className="flex-container-menu">
                        <div className="leftMenu">
                        </div>
                        <div className="rightCheckout">
                            <Card>
                                <CardContent>
                                    <div className="chekoutHeader">
                                        <Typography variant="h6" gutterBottom>
                                            <Box display="flex">
                                                <Box m={2}>
                                                    <Badge badgeContent={0} color="primary">
                                                        <ShoppingCartIcon />
                                                    </Badge>
                                                </Box>
                                                <Box  m={2} fontWeight="fontWeightBold">
                                                    My Cart
                                                </Box>
                                            </Box>
                                        </Typography>
                                    </div>
                                    <div className="chekoutTotal">
                                        <div className="amountText">
                                            Total amount
                                        </div>
                                        <div className="amountInr" >
                                            <i className="fa fa-inr" aria-hidden="true"></i>0.00
                                        </div>
                                    </div>
                                    <div className="chekoutButton">
                                        <Button variant="contained" color="primary" fullWidth>
                                            Checkout
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Details;