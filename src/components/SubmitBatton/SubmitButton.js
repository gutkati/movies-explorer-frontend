import React from "react";

function SubmitButton({name}) {
    return (
        <button className='submitButton' type='submit'>{name}</button>
    )
}

export default SubmitButton;