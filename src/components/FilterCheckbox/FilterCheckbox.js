import React from "react";

function FilterCheckbox(
    {
        checkBoxClick = () => {},
        shortMovies,
    }
) {
    return (
        <div className='filterCheckbox'>
            <div className='filterCheckbox__container'>

                <input
                    className='filterCheckbox__input'
                    type='checkbox'
                    id='shortFilm'
                    onChange={ shortMovies }
                    // checked={checkBoxClick}
                />

                <label className='filterCheckbox__label'>Короткометражки</label>
            </div>

        </div>
    )
}

export default FilterCheckbox;