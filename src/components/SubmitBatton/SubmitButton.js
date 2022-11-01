import React from "react";

function SubmitButton({name, formValid}) {
    return (
        <button className='submitButton' disabled={formValid} type='submit'>{name}</button>
    )
}

export default SubmitButton;