import React from 'react'

export default function Photo({ image, setImage, ind, selected, set_nSelected, updateSelected }) {
    function select() {
        updateSelected(selected => selected.map((val, i) => i == ind ? !val : val))
        set_nSelected((nSelected) => {
            let res = selected[ind] ? (nSelected - 1) : (nSelected + 1)
            return res
        })
    }
    return (
        <div className={"photo " + (selected[ind] ? 'selected' : '' )}>
            <img src={image.src} onClick={(e) => setImage(image)} />
            <div className="select" onClick={select}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg></div>
        </div>
    )
}
