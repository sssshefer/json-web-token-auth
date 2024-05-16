import React, {useEffect, useState} from 'react';
import './App.css';
import Loader from "../shared/ui/Loader/Loader";
import {UserApi} from "../shared/api/userApi";
import {IUser} from "../shared/types/IUser";
import Header from "../widgets/Header/Header";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter";

function App() {
    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<IUser | undefined>(undefined)

    useEffect(() => {
        userInit()

        async function userInit() {
            try {
                const user = await UserApi.getUser();
                setUser(user)
                setLoading(false)
            } catch (e) {
                setLoading(false)
            }
        }
    }, [])

    if (loading) {
        return <Loader/>
    }

    return (
        <BrowserRouter>
            <Header isAuth={!!user}/>
            <AppRouter isAuth={!!user}/>
            {/*<div className="App">*/}
            {/*    Account page*/}
            {/*    {!user && <div>No user found</div>}*/}
            {/*</div>*/}
        </BrowserRouter>
    );
}

export default App;