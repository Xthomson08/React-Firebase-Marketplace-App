import React, { useState, useRef } from 'react';
import { db, storage, auth } from '../../data/firebase';
import { collection, addDoc } from 'firebase/firestore'; 
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import defaultImage from '../../assets/icon.png';


function AddProductForm() {
    const [product, setProduct] = useState({
        name: '',
        price: '', 
        description: '',
        status: 'available',
        image: '',
        category: '',
        location: '',
        isShoppingList: false,
        user: '',
    });
    const fileInput = useRef(null);

    const [message, setMessage] = useState("");
    const [image, setImage] = useState(defaultImage);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    }
    
    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
   };

    const saveImage = async () => { 
        if (image !== defaultImage) {
            const imageRef = ref(storage, `images/${product.id}`);
            const snapshot = await uploadBytes(imageRef, image);
            console.log('Uploaded image successfully!');
            const url = await getDownloadURL(snapshot.ref);
            console.log('File available at', url);
            return url;
        } else {
            return defaultImage;
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        product.id = Date.now();
        product.user = auth.currentUser.displayName;
        console.log(product);
        try {
            // fix this to only have one id - optimize it 
            const imageUrl = await saveImage();
            product.image = imageUrl;
            const docRef = await addDoc(collection(db, "products"), product);
            console.log("Document written with ID: ", docRef.id);
            setMessage("Product added successfully");
            resetForm();

            // const docRef = await addDoc(collection(db, "products"), product);
            
            // product.key = docRef.id;

            // console.log("Document written with ID: ", docRef.id);
            // setMessage("Product added successfully");
            // const imageUrl = await saveImage();
            
            // product.image = imageUrl;
            // //updatedoc to set image

        } catch (error) {
            console.error(error);
            setMessage(`Error: ${error.message}`);
        }
    }

    const resetForm = () => {
        setProduct({
            name: '',
            price: '',
            seller: '',
            description: '',
            status: 'available',
            image: '',
            category: '',
            location: '',
            isShoppingList: false,
        });
        // fileInput.current.value = '';
        setImage(defaultImage);
    }

    return (
        <div style={styles.contatiner}>
            <form onSubmit={handleSubmit} style={{ margin: '20px', padding: '20px' }}>
                <h2 style={styles.title}>Post Your Product</h2>
                <h3 style={styles.miniTitle}>Product Name</h3>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Product Name" 
                    spellCheck="false"
                    autoCapitalize='words'
                    style={styles.nameInputWrapper}
                    value={product.name} 
                    onChange={handleChange} 
                />
                <h3 style={styles.miniTitle}>Price ($)</h3>
                <input type="text" name="price" placeholder="Price" value={product.price} onChange={handleChange} style={styles.nameInputWrapper}/>
                <p>{product.price}</p>
                <h3 style={styles.miniTitle}>Product Description</h3>
                <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} style={styles.inputBox} cols="40" rows="5"></textarea>
                <h3 style={styles.miniTitle}>Image</h3>
                <input type="file" name="image" ref={fileInput} onChange={handleImageUpload} style={styles.nameInputWrapper}/>
                <h3 style={styles.miniTitle}>Category</h3>
                <select name="category" placeholder="Category" value={product.category} onChange={handleChange} style={styles.nameInputWrapper}>
                    <option>Electronics</option>
                    <option>Furnitures</option>
                    <option>School Supplies</option>
                    <option>Apparells</option>
                    <option>Miscellaneous</option>
                </select>
                <div>
                    <button style={styles.btn} type="submit">Add Product</button> 
                    <button style={styles.btn} type="button" onClick={resetForm}>Reset Form</button>
                </div>
            </form>
        </div>
    )
}

const styles = {
    nameInputWrapper: {
        fontSize: '1em',
        fontWeight: 'bold',
        display: 'flex',
        marginTop: '10px',
        height: '52px !important', 
        resize: 'none', 
        border: 'none',
        marginBottom: '15px',
        backgroundColor: '#ddd',
        padding: '3px 5px',
        borderRadius: '10px',
        width: '250px'
    },
    inputBox: {
        backgroundColor: '#ddd',
        padding: '3px 5px',
        borderRadius: '10px',
        fontWeight: 'bold'
    },
    title: {
        fontSize: '3em',
        fontWeight: 'bold'
    },
    btn: {
        padding: '10px 150px',
        color: 'white',
        backgroundColor: 'black',
        borderRadius: '15px',
        marginRight: '15px',
        fontWeight: 'bold',
    },
    miniTitle: {
        fontSize:'1.5em',
        marginBottom: '10px',
        fontWeight: 'bold'
    }
}

export default AddProductForm;