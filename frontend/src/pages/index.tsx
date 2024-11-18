import { useState } from "react";
import { Button, Container, Notification } from "@mantine/core";
import { useStore } from "../store/store";
import FileUploader from "../components/FileUploader";
import ClaimsGrid from "../components/ClaimsGrid";
import MRFList from "../components/MRFList";
import { generateMrf, fetchMrfFiles } from "../services/api";
import { observer } from "mobx-react-lite";

export const MainPage = observer(() => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const store = useStore();
  const { claimsData, errors, mrfFiles, isAuthenticated } = store;

  const handleFileUpload = (file: File, data: any[]) => {
    setSelectedFile(file);
    store.setErrors([]);
    const validClaims = data.filter((claim) => {
      const isValid = claim["Provider ID"] && claim["Procedure Code"] && claim["Place of Service"] && claim["Billed"] && claim["Allowed"] && claim["Paid"];

      if (!isValid) {
        store.setErrors((prevErrors) => [...prevErrors, `Invalid claim: ${JSON.stringify(claim)}`]);
      }
      return isValid;
    });
    store.claimsData = validClaims;
  };

  const approveClaims = async () => {
    try {
      await generateMrf(claimsData);
      store.claimsData = [];
      fetchMrfFilesList();
    } catch (error) {
      console.error("Error generating MRF:", error);
    }
  };

  const fetchMrfFilesList = async () => {
    try {
      const response = await fetchMrfFiles();
      store.setMrfFiles(response.data);
    } catch (error) {
      console.error("Error fetching MRF files:", error);
    }
  };

  const login = () => store.setAuthenticated(true);
  const logout = () => store.setAuthenticated(false);

  if (!isAuthenticated) {
    return (
      <Container>
        <h1>Login</h1>
        <Button onClick={login}>Login as Dummy User</Button>
      </Container>
    );
  }

  return (
    <Container>
      <Button onClick={logout}>Logout</Button>
      <h1>Claims Upload</h1>
      <FileUploader onFileUpload={handleFileUpload} />
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      {errors.length > 0 && (
        <Notification color="red">
          {errors.map((err, index) => (
            <div key={index}>{err}</div>
          ))}
        </Notification>
      )}
      <ClaimsGrid rowData={claimsData} onCellEdit={(params) => (store.claimsData[params.rowIndex] = params.data)} />
      <Button onClick={approveClaims}>Approve Claims</Button>
      <MRFList files={mrfFiles} />
    </Container>
  );
});
