import { useState, useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import axios from "axios";

const tableItem_css = {
  width: "100%",
  padding: "10px"
};

const thItem_css = {
  width: "33.33%",
  padding: "10px",
  border: "1px solid #e0e0e0"
};

function App() {
  const [data, setData] = useState([]);

  // ดึงข้อมูลที่มี key มาแบบ react vite เริ่ม
  // ${import.meta.env.VITE_API_KEY} ส่วนนี้ดึงข้อมูลมาจากไฟล์ .env
  const fetchAPI = async () => {
    const response = await axios.get(`https://api.thecatapi.com/v1/breeds`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${import.meta.env.VITE_API_KEY}`,
      },
    });
    setData(response.data);
  };
  // ดึงข้อมูลที่มี key มาแบบ react vite จบ

  useEffect(() => {
    fetchAPI();
  }, []);

  console.log(data);

  return (
    <>
      <h2>TEST API KEY</h2>
      <table style={tableItem_css}>
        <thead>
          <tr>
            <th style={thItem_css}>id</th>
            <th style={thItem_css}>weight</th>
            <th style={thItem_css}>name</th>
            <th style={thItem_css}>description</th>
          </tr>
        </thead>
        {
          // กรณีข้อมูล data เป็น undefined หรือว่าง
          //หาก data อาจเป็น undefined หรือว่าง ([]) ควรเพิ่มการตรวจสอบเพื่อป้องกันข้อผิดพลาด: เสมอ
        data?.length > 0 ? ( 
          data.map((val) => (
            <tbody key={val.id}>
              <tr>
                <td style={thItem_css}>{val.id}</td>
                <td style={thItem_css}>{val.weight.imperial}</td>
                <td style={thItem_css}>{val.name}</td>
                <td style={thItem_css}>{val.description}</td>
              </tr>
            </tbody>
          ))
        ) : (
          <tbody>
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          </tbody>
        )}
      </table>
    </>
  );
}

export default App;
