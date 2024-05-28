import { saveAs } from 'file-saver';
import React from 'react'

async function downloadImages(images) {
    for (let image of images) {
        saveAs(image.src, image.name)
    }
}
async function deleteImage(filename) {
    return fetch(`https://photo-gallery-api-bsmz.onrender.com/images/${filename}`, {
        method: 'DELETE',
    }).then(res => res.json()).then(data => data)
}

export default function Options({number: n, images, setImages, selected, updateSelected, setNumber}) {
    async function deleteImages(images) {
        for (let image of images) {
            await deleteImage(image.name).then(data => {
                setImages(data)
            })
        }
    }
    return (
        <div className="options-selected">
            <div className="selected-nav">
                <div className="cross" onClick={() => {
                    updateSelected(images.map(() => false));
                    setNumber(0);
                }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg></div>
                <div className="numbers">{n} selected</div>
                { n === selected.length ?
                <button className="select-all" onClick={() => {
                    updateSelected(selected => selected.map(() => false))
                    setNumber(0)
                }}>Disselect All</button> :
                <button className="select-all" onClick={() => {
                    updateSelected(selected => selected.map(() => true))
                    setNumber(selected.length)
                }}>Select All</button> }
            </div>
            <div className="buttons">
                <div className="download-images" onClick={() => downloadImages(images.filter((image, ind) => {
                    return selected[ind];
                }))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                </svg></div>
                <div className="delete-images" onClick={async () => {
                        for (let image of images.filter((image, ind) => selected[ind])) {
                            await deleteImage(image.name).then(data => {
                                deleteImages(data)
                            })
                        }
                }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                </svg></div>
            </div>
        </div>
    )
}
