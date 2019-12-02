import React, { Component } from 'react';
import { GridListTile, GridListTileBar, GridList, IconButton, SvgIcon} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './RenderGrid.css';
import CheckCircleoutline from '@material-ui/icons/CheckCircleOutline';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    gridListAddress: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

class RenderGrid extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            customerAddress: props.customerAddress,
        
        }
    }

    onClickHandler = (event) => {
        //CHange the color of the icon to selected green
      };

    render() {
        console.log(this.props.customerAddress);
        const { classes } = this.props;
        var value = 1;
        if ( this.props.customerAddress && this.props.customerAddress.length){

            this.value = 1;
        }
        
        return (
            <div>
                {/* TODO- Add the No Saved Address text if the customerAddress collection is empty  */}
                
                {this.value === 1 && 
                    <div>
                        <GridList cols={3} className={classes.gridListAddress}>
                            {this.props.customerAddress.map(address => (
                                <GridListTile key={address.id}>
                                    <span>{address.flat_building_name}</span><br />
                                    <span>{address.locality}</span><br />
                                    <span>{address.city}</span><br />
                                    <span>{address.pincode}</span><br />
                                    {/* <span>{HomeIcon()}</span> */}
                                    <div className="icon" color="">
                                        <CheckCircleoutline onClick={this.onClickHandler} color="green" />
                                    </div>
                                </GridListTile>

                            ))}
                        </GridList>
                    </div>
                }

                {this.value === 0 && 
                    <div>
                    <span> There are no saved addresses! You can save an address using the 'New Address' tab or using your 'Profile' menu</span>
                    <span> option.</span>
                    </div>
                }

            </div>
        );
    }
}

export default withStyles(styles) (RenderGrid);