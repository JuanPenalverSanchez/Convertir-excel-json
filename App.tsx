import * as React from 'react';
import * as xlsx from 'xlsx';
import './style.css';

export default function App() {
  const [datosExcel, setDatosExcel] = React.useState([]);

  const readUploadFile = (e) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setDatosExcel(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const pintarDatos = () => {
    console.log(datosExcel);

    return (
      <ul>
        {datosExcel.map((elemt) => (
          <li>
            {elemt.Tipo} - {elemt.Value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <form>
        <label htmlFor="upload">Upload File</label>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
        />
      </form>
      {pintarDatos()}
    </div>
  );
}
