import React, {useEffect, useState} from "react";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox.js";

function SearchForm(
    {
        handleSearchSubmit,
        checkBoxClick,
        inputValue,
        shortMovies
    }) {

    const [inputSearch, setInputSearch] = useState("");

    function handleChangeInput(e) {
    setInputSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearchSubmit(inputSearch);
  }

  useEffect(() => {
    setInputSearch(inputValue);
  }, [inputValue]);

    return (
        <div className='searchForm'>
            <div className='searchForm__container'>
                <form className='searchForm__form' onSubmit={handleSubmit}>
                    <input className='searchForm__input'
                           placeholder='Фильм'
                           required
                           onChange={handleChangeInput}
                           value={inputSearch || ""}
                    />
                    <button className='searchForm__btn'
                            type='button'
                            aria-label='поиск'
                    />
                </form>
                <FilterCheckbox
                   shortMovies={shortMovies}
                   checkBoxClick={checkBoxClick}
                />
            </div>
            <div className='searchForm__border'/>
        </div>
    )
}

export default SearchForm;