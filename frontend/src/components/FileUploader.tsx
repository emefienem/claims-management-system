import { FileInput } from "@mantine/core";
import { parseCSV } from "../utils/fileUtils";

const FileUploader = ({ onFileUpload }: { onFileUpload: (file: File, data: any[]) => void }) => {
  const handleFileUpload = (file: File) => {
    parseCSV(file, (data) => onFileUpload(file, data));
  };

  return <FileInput label="Upload Claims CSV" onChange={handleFileUpload} accept=".csv" />;
};

export default FileUploader;
