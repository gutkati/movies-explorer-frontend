import React from "react";

function FilterCheckbox(
    {
        checkBoxClick = () => {},
        shortMovies = false,
    }
) {
    return (
        <div className='filterCheckbox'>
            <label className='filterCheckbox__container'>
                <input
                    className='filterCheckbox__input'
                    type='checkbox'
                    id='shortFilm'
                    onChange={checkBoxClick}
                    checked={shortMovies}
                />
                <span className='filterCheckbox__switch-slider round'/>
            </label>
            <label className='filterCheckbox__label'>Короткометражки</label>


        </div>
    )
}

export default FilterCheckbox;