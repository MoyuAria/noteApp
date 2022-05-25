import { useCallback, useState } from 'react'
import CSVReader from 'react-csv-reader'

export default function Pricing() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([[]]);

  const onFileLoaded = useCallback((data: any, fileInfo: any, originalFile: any) => {
    console.log(data, fileInfo, originalFile)
    setColumns(data.shift());
    setData(data);
  }, [])

  return (
    <div>
      <CSVReader onFileLoaded={onFileLoaded} />
      <table className='table'>
        <thead>
          <tr>
            {
              columns.map((column, index) => (<th key={index} className="table__th">{column}</th>))
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((row, index) => (
              <tr key={index}>
                {
                  row.map((item, j) => (
                    <td key={`${item}_${j}`} className="table__td">{item}</td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}