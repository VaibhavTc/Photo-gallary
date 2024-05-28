import React from 'react';
import './App.css';
import Header from './MyComponents/Header';
import PhotosGrid from './MyComponents/PhotosGrid';
import ImageViewer from './MyComponents/ImageViewer';
import Options from './MyComponents/Options';
import { saveAs } from 'file-saver';

function downloadImage(image) {
    saveAs(image.src, image.name);
}

function App() {
    const [selected, updateSelected] = React.useState([])
    const [nSelected, set_nSelected] = React.useState(0)
    const [images, setImages] = React.useState([])
    const [image, setImage] = React.useState()

    React.useEffect(() => {
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                updateSelected((selected) => selected.map(() => false));
                set_nSelected(0);
                setImage();
            }
        })
        fetch("https://photo-gallery-api-bsmz.onrender.com/images").then(data => data.json()).then(data => {
            setImages(data)
        })
    }, [])
    React.useEffect(() => updateSelected(images.map(() => false)), [images])
    return (
        <>
            {nSelected ? <Options image={image} number={nSelected} setNumber={set_nSelected} updateSelected={updateSelected} downloadImage={downloadImage} images={images} selected={selected} setImages={setImages}/> : null}
            <Header setImages={setImages} />
            {(images && images.length > 0) ? <PhotosGrid selected={selected} nSelected={nSelected} set_nSelected={set_nSelected} images={images} setImage={setImage} updateSelected={updateSelected} setImages={setImages} /> : <h3>No Photos Available</h3>}
            {image && <ImageViewer image={image} setImage={setImage} images={images} setImages={setImages} />}
        </>
    );
}

export default App;
