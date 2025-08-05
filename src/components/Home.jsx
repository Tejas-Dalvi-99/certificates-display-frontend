/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';

function Home() {
    const [certificates, setCertificates] = useState([]);
    useEffect(()=>{
      axios.get(`${import.meta.env.VITE_API}/api/view`).then((res)=>{
        setCertificates(res.data);
        console.log(res.data);
      })
    },[]);


    return (
      <>
      <div className='navbar'>
            <h1>My Certificates</h1>
      </div>

      <div className='content'>
      <div className='certificates-grid'>
          { certificates.length > 0 ? (
            certificates.map((certificate,id)=>{return <div className='certificate-box' key={id}>
              <img src={certificate.img} alt='certificate'></img>
            </div>})
          ) : 
          (
            <div className='certificates-grid'>
                {Array.from({ length: 8 }, (_, i) => (
                  <div className="skeleton" key={i} style={{height: '17vw', width: '24vw', borderRadius: '8px', margin: '10px'}}></div>
                ))}
            </div>
          )
          }
      </div>
    </div>
      </>
    )
  }
  
  export default Home;