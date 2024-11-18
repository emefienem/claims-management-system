import { makeAutoObservable } from "mobx";

class ClaimStore {
  claimsData: any[] = [];
  errors: string[] = [];
  mrfFiles: string[] = [];
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  addClaim(claim: any) {
    this.claimsData.push(claim);
  }

  removeClaim(claim: any) {
    this.claimsData = this.claimsData.filter((item) => item !== claim);
  }

  setErrors(errors: string[] | ((prevErrors: string[]) => string[])) {
    if (typeof errors === "function") {
      this.errors = errors(this.errors);
    } else {
      this.errors = errors;
    }
  }

  setMrfFiles(mrfFiles: string[]) {
    this.mrfFiles = mrfFiles;
  }

  setAuthenticated(isAuthenticated: boolean) {
    console.log("Setting authenticated to", isAuthenticated);
    this.isAuthenticated = isAuthenticated;
  }
}

const store = new ClaimStore();
export const useStore = () => store;
