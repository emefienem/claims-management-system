# Application Architecture and Functionality

This document outlines the design and functionality of the Claims Management application, including both frontend and backend components. The application facilitates the upload of claims data, validation, and the generation of MRF (Medical Reimbursement Files) based on the provided claims. It also allows users to interact with claims data, validate the entries, and generate reports.

## Overall Application Flow

1. **Login Screen**:

   - The user first logs into the application as a "dummy user."
   - Once authenticated, the user gains access to the claims upload and management features.

2. **Claims Upload**:

   - The user can upload a CSV file containing claim data using the `FileUploader` component.
   - The CSV file is parsed, and the data is validated. Any invalid claims are flagged with error messages.

3. **Claim Data Management**:

   - After file upload, the `ClaimsGrid` component is used to display the claims data in a tabular format.
   - The user can modify the claims directly within the grid.

4. **MRF Generation**:

   - Once the claims data is approved, the user can click the "Approve Claims" button to generate the MRF.
   - The MRF file is generated on the backend and added to the list of available files.

5. **MRF Files List**:
   - The `MRFList` component displays a list of generated MRF files, which the user can access or download.

## Components and Their Responsibilities

### `FileUploader`

- **Responsibility**: Handles the CSV file upload process.
- **Details**:
  - Accepts CSV files from the user.
  - Uses the `parseCSV` utility to parse the file and send the data to the parent component (`MainPage`).
  - Validates claims based on specific fields (Provider ID, Procedure Code, etc.).

### `ClaimsGrid`

- **Responsibility**: Displays the claims data in an interactive grid.
- **Details**:
  - Uses the `AgGridReact` component to render the claims data.
  - Allows for inline editing of cell values.
  - Sends updates back to the store upon cell value changes.

### `MRFList`

- **Responsibility**: Displays a list of generated MRF files.
- **Details**:
  - Receives the list of MRF file names from the MobX store and displays them.
  - The user can view and interact with the list of files.

### `MainPage`

- **Responsibility**: The main interface for interacting with the application.
- **Details**:
  - Handles user login and logout.
  - Manages state related to file upload, claim validation, and MRF generation.
  - Displays the `FileUploader`, `ClaimsGrid`, and `MRFList` components.

## State Management with MobX

The application uses **MobX** for state management. MobX is used to manage the application’s global state and ensure reactivity between UI components and the underlying data.

### Store: `ClaimStore`

- **State Variables**:

  - `claimsData`: An array of claims data that is validated and displayed in the `ClaimsGrid`.
  - `errors`: An array of error messages generated during the CSV parsing and validation process.
  - `mrfFiles`: A list of filenames of generated MRF files.
  - `isAuthenticated`: A boolean flag to track the user's authentication status.

- **Actions**:
  - `addClaim(claim)`: Adds a claim to `claimsData`.
  - `removeClaim(claim)`: Removes a claim from `claimsData`.
  - `setErrors(errors)`: Updates the error messages.
  - `setMrfFiles(mrfFiles)`: Updates the list of MRF files.
  - `setAuthenticated(isAuthenticated)`: Sets the authentication status.

The `ClaimStore` is instantiated and made available globally using `useStore()`, providing a centralized state management system that allows the components to react to changes in the data.

## Interaction with the Backend API

The frontend interacts with the backend using Axios to send requests and retrieve data.

- **API Endpoints**:

  - `POST /api/generate-mrf`: Accepts validated claim data and generates the MRF (Medical Reimbursement File). The backend performs claim validation and computes averages for each provider.
  - `GET /api/mrf-files`: Fetches a list of previously generated MRF files.

- **Backend**:
  - The backend is built using the `Hono` framework, a lightweight Node.js framework.
  - It includes middleware for CORS and authorization, ensuring that only requests with a valid token are allowed.
  - The backend validates the claims data using `zod` schema validation before processing the MRF file generation.

## Routing and Navigation

Routing is handled in the `MainPage` component, with conditional rendering based on the user's authentication status.

- **Login Page**:

  - Displays a login button, which sets the `isAuthenticated` state in the store to `true` when clicked.

- **Claims Management Page**:

  - Once authenticated, the user can interact with the claims data, upload files, validate them, and generate MRF files.

- **Logout**:
  - Allows the user to log out, which sets the `isAuthenticated` state to `false`, redirecting back to the login screen.

## Conclusion

This application provides a seamless user experience for uploading and validating claims, generating reimbursement files (MRF), and managing claim data. By leveraging MobX for state management and Axios for API communication, it ensures a responsive and efficient application. The backend uses modern JavaScript tools to handle claim validation and MRF file generation.
