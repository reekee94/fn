import React, { useState, useEffect } from "react";
import './productsItem.css';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function ProductItem() {

    const API = 'https://randomuser.me/api/?results=';
    const DEFAULT_QUERY = '10';
    console.log(API + DEFAULT_QUERY);
    const [data, setData] = useState([]);

    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 140,
        },
    });

    const classes = useStyles();

    useEffect(() => {
        fetch(API + DEFAULT_QUERY)
            .then(response => response.json())
            .then(data => setData(data.results));
    }, []);

    return (
        <div className="wrapper" >
            {data.map(res =>
                <Card className={classes.root} key={res.login.uuid}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {res.gender}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Buy
                        </Button>
                        <Button size="small" color="primary">
                            Add to cart
                         </Button>
                    </CardActions>
                </Card>
            )}
        </div>
    );
}
export default ProductItem