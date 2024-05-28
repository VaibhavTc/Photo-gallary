import React from 'react'

function nextImage(image, images, setImage) {
    let index = Array.from(images).indexOf(image)
    if (index < images.length - 1) {
        setImage(images[index+1])
    }
}

function prevImage(image, images, setImage) {
    let index = Array.from(images).indexOf(image)
    if (index > 0) {
        setImage(images[index-1])
    }
}

function deleteImage(filename) {
    return fetch(`https://photo-gallery-api-bsmz.onrender.com/images/${filename}`, {
        method: 'DELETE',
    }).then(res => res.json()).then(data => data)
}


export default function ImageViewer({ image, setImage, images, setImages, downloadImage }) {
    function arrowPressed(event) {
        if (event.key === "ArrowRight") {
            return document.querySelector("div.next").click()
        }
        else if (event.key === "ArrowLeft") {
            return document.querySelector("div.prev").click()
        }
    }
    React.useEffect(() => {
        document.addEventListener("keydown", arrowPressed)

        return () => document.removeEventListener("keydown", arrowPressed)
    }, [])
    return (
        <div className="image-viewer" onClick={() => setImage()}>
            <div className="up" onClick={(e) => e.stopPropagation()}>
                <h3 className="image-name">{image.name}</h3>
                <div className="options">
                    <div className="download" onClick={() => downloadImage(image)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                    </svg></div>
                    <div className="delete" onClick={async () => {
                        let data = await deleteImage(image.name)
                        setImage()
                        setImages(data)
                    }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg></div>
                </div>
            </div>
            <div className="down">
                <div className="prev" onClick={(e) => {
                    e.stopPropagation()
                    prevImage(image, images, setImage)
                }}> {`<`} </div>
                <div className="image">
                    <img src={image.src} alt='' onClick={(e) => e.stopPropagation()} />
                </div>
                <div className="next" onClick={(e) => {
                    e.stopPropagation()
                    nextImage(image, images, setImage)
                }}> {`>`} </div>
            </div>
        </div>
    )
}
