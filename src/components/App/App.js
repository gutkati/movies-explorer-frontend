import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory, Redirect} from 'react-router-dom';

import Main from "../Main/Main.js"

function App() {
    return(
        <Route exact path='/'>
            <Main />
        </Route>
    )
}

export default App;