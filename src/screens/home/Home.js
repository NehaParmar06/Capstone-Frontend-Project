import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { makeStyles, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

class Home extends Component {

    constructor(){
        super();
        this.state = {
            restaurantList: []
        }
        this.baseUrl = "http://localhost:8080/api/";
        this.getAllRestaurants();
    }

    //Service call to get the list of Restaurants
    retrieveRestaurantDetails() {
        return fetch(this.baseUrl+ "restaurant")
          .then(response => {
            if (!response.ok) {
              this.handleResponseError(response);
            }
            return response.json();
          })
          .then(json => {
            console.log(json);
            return json;
          })
          .catch(error => {
            this.handleError(error);
          });
      }

      handleError(error) {
        console.log(error.message);
    }

    getAllRestaurants(){
        this.retrieveRestaurantDetails().then(restaurantList => {
            console.log(restaurantList);
            this.setState({
                restaurantList: restaurantList.restaurants
            });
        });
    }

    //function to render restaurant cards
    renderCard() {
       return this.state.restaurantList.map(restaurant => (
        <Link key={restaurant.id} underline='none' component={RouterLink} to={{
            pathname: "/details",
            param1: restaurant.id
          }}>
                <Card className="cardClass">
                    <CardActionArea>
                        <CardMedia
                            className="cardMediaClass"
                            image={restaurant.photo_URL}
                            title={restaurant.restaurant_name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {restaurant.restaurant_name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                               {restaurant.categories}
                            </Typography>
                        </CardContent>
                        <div>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <span>{restaurant.customer_rating}</span>
                        </div>
                        <div>
                            <i className="fa fa-inr" aria-hidden="true"></i>
                            <span>{restaurant.average_price}</span>
                            <span> for two</span>
                        </div>
                    </CardActionArea>
                </Card>
            </Link>
            ));
    }

    render() {

        const restaurantList = this.state.restaurantList;

        return (
            <div>
                <Header hideSearchBar={0}/>
                {this.renderCard()}
            </div>
        )
    }
}

export default Home;