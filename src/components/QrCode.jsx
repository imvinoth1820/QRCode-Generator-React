
import { useState } from 'react'

import '../css/QrCode.css'
function QrCode(){
    const[qr,setQr] = useState("")
    const[load,setLoad] = useState(false)
    const[qrdata,setQrData] = useState("https://github.com/imvinoth1820")
    const[qrSize,setQrSize] = useState("150")

async function genereateQr(){
   setLoad(true);
   try{
    //  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrdata)}`
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrdata)}`
     setQr(url)
   }catch(error){
        console.log("Error generating QR code",error)
   }finally{
    setLoad(false)
   }
}
function downloadQr(){
    
        fetch(qr)
          .then((response) => response.blob())
          .then((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch((error) => {
            console.error("Error downloading QR code:", error);
          });
      
}




    return(
        <div className='app-container'>
            <h1>QR CODE GENERATOR</h1>
            {load && <p> Please Wait...</p>}
           {qr &&  <img src={qr} className='qr-img'   />}
           <div>
            <label htmlFor="datainput" className="input-lable">
            Data for QR code:
            </label>
            <input value={qrdata} type="text" id="datainput" placeholder="Enter data for QrCode" onChange={(e)=>setQrData(e.target.value)}/>
            <label htmlFor="sizeinput" className="input-lable" >
            Image size (e.g., 150):
            </label>
            <input type="text" value={qrSize}  id="sizeinput" placeholder="Enter Image size eg 450" onChange={(event)=>{setQrSize(event.target.value)}}/>
            <button className='generate-btn' disabled={load} onClick={genereateQr} >Generate Qr Code</button>
            <button className='download-btn' onClick={downloadQr}>Download Qr Code</button>
           </div>
           <p className='footer'>Designed by &copy; <a href='https://github.com/imvinoth1820' target='blank'>VinothKumar R</a></p>
        </div>
    )
}
export default QrCode