const MRFList = ({ files }: { files: string[] }) => {
  return (
    <div>
      <h2>Generated MRF Files</h2>
      <ul>
        {files.map((fileName, index) => (
          <li key={index}>{fileName}</li>
        ))}
      </ul>
    </div>
  );
};

export default MRFList;
