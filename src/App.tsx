import { useState } from 'react'
import './App.css'

const App = ()=>{

  const [file,setFile] = useState<File>()
  const [format,setFormat] = useState<string>("docx")

  const handleFormSubmit = async (e:React.FormEvent)=>{
    e.preventDefault()

    if(!file || !format){
      return window.alert("File dan format harus ada!")
    }

    try {
      const formData = new FormData()
      formData.append("file",file)
      formData.append("format",format)

      const response = await fetch("http://127.0.0.1:5000/upload",{
        method: "POST",
        body: formData
      })

      const blob = await response.blob()

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `ocr-konversi.${format}`; // Nama file yang akan diunduh
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.error(err)
      window.alert("Terjadi kesalahan!")
    }

    
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
    }
  };

  return (
    <div className='main-container'>
      <header>
        <h1>OCR | Teks image ke teks digital</h1>
      </header>
      <div className='form-wrapper'>
        <form>
          <div className='input-group'>
            <label htmlFor="fileInput">
              <b>Pilih file gambar :</b>
            </label>
            <input type="file" id='fileInput' accept='image/*' onChange={handleFileChange} required/>
          </div>
          <div className='input-group'>
            <label htmlFor="formatInput">
              <b>Format :</b>
            </label>
            <select id="formatInput" defaultValue={format} onChange={(e)=>setFormat(e.target.value)} required>
              <option value="docx">Docx</option>
              <option value="pdf">Pdf</option>
              <option value="txt">Txt</option>
            </select>
          </div>
          <button type='submit' onClick={handleFormSubmit}>Konversi</button>
        </form>
      </div>
    </div>
  )
}

export default App
