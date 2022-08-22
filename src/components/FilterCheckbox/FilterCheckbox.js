import React from "react";

function FilterCheckbox() {
    return (
        <div className='filterCheckbox'>
            <div className='filterCheckbox__container'>

                <input className='filterCheckbox__input' type='checkbox' id='shortFilm'/>
                <label className='filterCheckbox__label'>Короткометражки</label>
            </div>

        </div>
    )
}

export default FilterCheckbox;