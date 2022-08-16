import React from "react";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

function SearchForm() {
    return (
        <div className='searchForm'>
            <div className='searchForm__container'>
                <form className='searchForm__form'>
                    <input className='searchForm__input' placeholder='Фильм' required='true'/>
                    <button className='searchForm__btn'/>
                </form>
                <FilterCheckbox/>
            </div>
            <div className='searchForm__border'/>
        </div>
    )
}

export default SearchForm;