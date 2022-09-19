import React, {FormEvent} from 'react';
import logo from './logo.svg';
import './App.css';
import {CivicProfile, Profile} from "@civic/profile";

function App() {
    const [profile, setProfile] = React.useState<Profile>();

    const loadProfile = (e: FormEvent) => {
        e.preventDefault()
        const target = e.target as typeof e.target & { subject: { value: string } };
        CivicProfile.get(target.subject.value).then(setProfile);
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <form onSubmit={loadProfile}>
                    Enter wallet address <input name="subject" type="text" placeholder="Subject"/>
                    <input type="submit"/>
                </form>
                {profile && <div>
                    <h1>{profile.name?.value}</h1>
                    <img width={200} src={profile.image?.url} alt="profile"/>
                </div>}
            </header>
        </div>
    );
}

export default App;