import React from "react";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";
import Find from "../../../images/find.svg";

function SearchForm() {
    return (
        <div className='searchForm'>
            <div className='searchForm__container'>
                <form className='searchForm__form'>
                    <input className='searchForm__input' placeholder='Фильм' required='true'/>
                    <button className='searchForm__btn'
                            type='button'
                            aria-label='поиск'
                    ><img src={Find} /></button>
                </form>
                <FilterCheckbox/>
            </div>
            <div className='searchForm__border'/>
        </div>
    )
}

export default SearchForm;