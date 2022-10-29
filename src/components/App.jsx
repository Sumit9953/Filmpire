import React from 'react'
import { CssBaseline, Switch } from '@mui/material'
import { Route, Routes } from 'react-router-dom';

import {Actors,MovieInformation,Movies,NavBar,Profile} from './'

const App = () => {
    return (
        <div>
            <CssBaseline />
            <NavBar />
            <main>
                <Routes>
                    <Route exact path='/movie/:id' element = {<MovieInformation />}/>
                    <Route exact path='/actors' element = {<Actors />}/>
                    <Route exact path='/' element = {<Movies />}/>
                    <Route exact path='/profile/:id' element = {<Profile />}/>
                </Routes>
            </main>
        </div>
    )
}

export default App;