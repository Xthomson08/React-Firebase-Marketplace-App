import { useNavigate } from 'react-router-dom';
import React from 'react';

const ShowProducts = ({ products }) => {
    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        productId ? navigate(`/product/${productId}`, {replace: false}) : console.log('No product id');
    };

    return (
        <div style = {styles.post}>
            {products.map((product) => ( 
                    <div key={product.key} product={product} style={styles.postItem} onClick={() => handleProductClick(product.key)}>
                        <img alt="img" src={product.image} style={styles.prdImg}/>
                        <div style={{textAlign: 'center'}}>
                            <h2 style={styles.prdInfoH2}> {product.name} - ${Number(product.price).toLocaleString()} </h2>
                            <p style ={styles.prdUser}> @{product.user} </p>
                        </div>
                    </div>
            ))}
        </div>
    );
}

const styles = {
    /* Post Style */
    post: {
        display: 'grid',
        gridTemplateColumns: '2fr 2fr 2fr',
        margin: 20,
    },
    postItem: {
        margin: '5px',
        border: '5px',
    },
    prdImg: {
        width: '100%',
        height: '500px',  
        objectFit: 'cover',
    },
    prdUser: {
        fontSize: '1.5em',
        margin: 10,
    },
    prdInfoH2: {
        fontSize: '2em',
        margin: 10,
    }
};

export default ShowProducts;