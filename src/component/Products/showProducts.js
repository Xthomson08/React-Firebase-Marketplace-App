import { useNavigate } from 'react-router-dom';
import React from 'react';
import '../../styles/products.css'

const ShowProducts = ({ products }) => {
    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        productId ? navigate(`/product/${productId}`, {replace: false}) : console.log('No product id');
    };

    return (
        <div style = {styles.post} className='post'>
            {products.map((product) => ( 
                    <div key={product.key} product={product} className='post-item' style={styles.postItem} onClick={() => handleProductClick(product.key)}>
                        <img alt="img" className='prd-img' src={product.image} style={styles.prdImg}/>
                        <div className='prd-des' style={{textAlign: 'center'}}>
                            <h2 className='prd-title' style={styles.prdInfoH2}> {product.name} - ${Number(product.price).toLocaleString()} </h2>
                            <p className='prd-seller' style ={styles.prdUser}> @{product.user} </p>
                        </div>
                    </div>
            ))}
        </div>
    );
}

const styles = {}
// const styles = {
//     /* Post Style */
//     post: {
//         display: 'grid',
//         gridTemplateColumns: '2fr 2fr 2fr',
//         margin: 20,
//     },
//     postItem: {
//         margin: '5px',
//         border: '5px',
//     },
//     prdImg: {
//         width: '100%',
//         height: '500px',  
//         objectFit: 'fit',
//     },
//     prdUser: {
//         fontSize: '1.5em',
//         margin: 10,
//     },
//     prdInfoH2: {
//         fontSize: '2em',
//         margin: 10,
//     }
// };

export default ShowProducts;