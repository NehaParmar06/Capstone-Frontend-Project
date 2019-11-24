import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { makeStyles, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button } from '@material-ui/core';

// const useStyles = makeStyles({
//     card: {
//         maxWidth: 345,
//     },
//     media: {
//         height: 140,
//     },
// });

// const classes = useStyles();

class Home extends Component {

    constructor(){
        super();
        this.state = {
            restaurantList: [],
        }
        this.getAllRestaurants();
    }

    componentDidMount(){
        this.getAllRestaurants();
    }

    getAllRestaurants(){
        fetch("http://localhost:8080/api/swagger-ui.html#!/restaurant-controller/getAllRestaurantsUsingGET/restaurant")
        // .then(results => {
        //     return results.json();
        // }).then(data => {
        //     let restaurantList = data.results;
        //     this.setState({restaurantList: restaurantList});
        //     console.log("State: " + this.state.restaurantList);
        // })

        .then(response => {
            if (!response.ok) {
              this.handleResponseError(response);
            }
            return response.json();
          })
          .then(json => {
            console.log(json.data);
            return json.data;
          })
          .catch(error => {
            this.handleError(error);
          });
    }

    handleResponseError(response) {
        throw new Error("HTTP error, status = " + response.status);
    }
    handleError(error) {
        console.log(error.message);
    }

    render() {
        return (
            <div>
                <Header hideSearchBar={0}/>

                <Card className="cardClass">
                    <CardActionArea>
                        <CardMedia
                            className="cardMediaClass"
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Share
                        </Button>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>

            </div>
        )
    }
}

export default Home;