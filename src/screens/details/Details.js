import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import './Details.css';
import Img from 'react-image'

class Details extends Component {
    constructor(props) {
        super(props);
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

        this.restaurantId = this.props.location.param1;
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

        xhrRestaurant.open("GET", this.props.baseUrl + "restaurant/"+ this.restaurantId);
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
                        <Img src={restaurant.photo_URL}></Img>
                    </div>

                    <div className="rightDetails">
                        <div>
                            <Typography variant="h5" gutterBottom>{restaurant.restaurant_name}</Typography>
                        </div>
                        <div className="locality">
                            <Typography variant="subtitle1" gutterBottom>{restaurant.address.locality}</Typography>
                        </div>
                        <div>
                            <Typography className="bold" variant="subtitle2" gutterBottom>
                                {restaurant.categories.map(category => (
                                    <span key={category.id} >{category.category_name}, </span>
                                ))}</Typography>
                        </div>
                        <div className="body2">
                            <div className="avg-customer-rating">
                                <span>{restaurant.customer_rating}</span>
                                <br></br>
                                <Typography className="avg-customer-rating-text" variant="caption" gutterBottom>Average rating by< br></br> {restaurant.number_customers_rated} customers</Typography>
                            </div>
                            <div className="avg-cost">
                                <span>{restaurant.average_price}</span>
                                <br></br>
                                <Typography className="avg-cost-text" variant="caption" gutterBottom>Average cost for< br></br> 2 people</Typography>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </div>
        )
    }
}

export default Details;