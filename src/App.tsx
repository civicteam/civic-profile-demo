import React, {FormEvent} from 'react';
import logo from './logo.svg';
import './App.css';
import {CivicProfile, Options, Pass, Passes, Profile} from "@civic/profile";
import { JsonRpcProvider } from '@ethersproject/providers';

function App() {
    const [profile, setProfile] = React.useState<Profile>();
    const [passes, setPasses] = React.useState<Passes>();
    // other RPCs for EVM chains are available 
    const provider = new JsonRpcProvider("https://polygon-mumbai.blockpi.network/v1/rpc/public");

    const loadProfile = async (e: FormEvent) => {
        e.preventDefault()
        const target = e.target as typeof e.target & { subject: { value: string } };
        let options: Options = {};
        if (target.subject.value.startsWith("0x")) {
            options = { ethereum: { provider } };
        }
        const profile = await CivicProfile.get(target.subject.value, options);
        setProfile(profile);
        const retrievedPasses: Passes = await profile.getPasses();
        setPasses(retrievedPasses);
    }
    
    const renderPass = (pass: Pass) => {
        return <div>
            <div><span>Gatekeeper network: </span><span>{pass.identifier}</span></div>
            <div><span>Status: </span><span>{pass.state}</span></div>
        </div>
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
                    {profile.name?.value ? <h1>{profile.name?.value}</h1> : <div>No profile name set</div>}
                    {profile.image?.url ? <div><div>PFP: </div><img width={200} src={profile.image?.url} alt="profile"/></div> : <div>No profile image set</div>}
                    {passes && Object.keys(passes).length > 0 ? <h2>Passes</h2> : <span>No passes found</span> }
                    {passes && Object.keys(passes).map((key) => passes[key].map(renderPass))}
                </div>}
            </header>
        </div>
    );
}

export default App;
