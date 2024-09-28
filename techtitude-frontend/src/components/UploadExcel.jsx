// import React from 'react';
import * as XLSX from 'xlsx';
import { db } from '../firebase';

const ExcelUpload = () => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      data.forEach(async (student) => {
        await db.collection('students').doc(student.admissionNo).set(student);
      });
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upload Excel File</h1>
      <input type="file" onChange={handleFileUpload} className="p-2 border border-gray-300 rounded" />
    </div>
  );
};

export default ExcelUpload;
