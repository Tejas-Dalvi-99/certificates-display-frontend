/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import './Upload.css'
import { ConnectKitButton } from "connectkit";
import axios from "axios";

function Upload({access, setAccess}) {

  const [image, setImage] = useState("");

  function handleChange(e){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    }
    reader.readAsDataURL(file);
  }

  function handleUpload(e){
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API}/api/upload`,{image:image , secret:import.meta.env.VITE_SECRET}).then((res)=>{
      if(res.data==="Uploaded Successfully!"){
        alert("Image Uploaded Successfully!");
        setImage("");
      }else{
        alert("Some error occured");
      }
    }).catch((err)=>{
      alert("Some error occured");
    })
  }

  return (
    <>
    <div className="connection-btn">
      { access ? <button className="btn" onClick={()=>setAccess(false)}>Logout</button> :
        <ConnectKitButton/>
      }
    </div>
    <div className="img-upload">
      <label className="label" htmlFor="img-upload">Select Image</label>
      <input type='file' onChange={handleChange} id="img-upload"></input>
      {image && <div className="image-preview">
        <img src={image}></img> 
      </div>
      }
    {image && <button className="btn" onClick={handleUpload}>Upload</button>}
    </div>
    </>
  )
}

export default Upload