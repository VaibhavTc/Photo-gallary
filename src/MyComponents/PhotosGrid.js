import React from 'react'
import Photo from './Photo'

function PhotosGrid({images, setImage, selected, nSelected, set_nSelected, updateSelected }) {
    let photos = images.map((image, ind) => {
        return <Photo image={image} key={ind} selected={selected} ind={ind} updateSelected={updateSelected} set_nSelected={set_nSelected} setImage={setImage} />
    })
    return (
        <div className={ "photos " + (nSelected ? "n-selected" : "") }>
            {photos}
        </div>
    )
}

export default PhotosGrid;