/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import Upload from './Upload'
import './Protected.css'
import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import { useState } from 'react';
import axios from 'axios';

function Protected({access, setAccess}) {
  const { address } = useAccount();
  const walletAddress = import.meta.env.VITE_METAMASK_ADDRESS;

  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleOpenModal(){
    setModal(true);
  }

  function handleLogin(e){
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API}/api/login`, {username: username, password: password}).then((res)=>{ 
        if(res.status===299){
          setAccess(true);
          alert("Welcome Back Tompr !");
        } else{
          alert("Login Failed");
        }
    }).catch((err)=>{ 
      alert("Something went wrong!");
    })
  }

  return (
    <>
    {((address!==walletAddress) && (!access)) ?
    <div>
    <h1 className='head'>Protected</h1>
    {modal && <div className='modal-bg' onClick={()=>setModal(false)}></div>}
    {modal && <form className='modal-form' onSubmit={handleLogin}>
      <input type='text' placeholder='username' required value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
      <input type='password' placeholder='password' required value={password} onChange={(e)=>{setPassword(e.target.value)}}/> 
      <button type='submit' className='login-btn'>Login</button>
      </form>}
    <div className='signin-options'>
      <div className='using-password'>
        <button className='btn' onClick={handleOpenModal}>Login</button>
      </div>
      <h1 className='or'>OR</h1>
      <div className='using-wallet'>
        <ConnectKitButton/>
      </div>
    </div>
    </div>
    :
    <Upload access={access} setAccess={setAccess}/>
    }
    </>
  )
}

export default Protected