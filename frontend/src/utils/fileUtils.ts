import Papa from "papaparse";

export const parseCSV = (file: File, callback: (data: any[]) => void) => {
  Papa.parse(file, {
    complete: (result) => callback(result.data),
    header: true,
    skipEmptyLines: true,
  });
};
