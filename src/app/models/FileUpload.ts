export class FileUpload {
    key!: string;
    name!: string;
    url!: string;
    file: File;
    est_id!: string;
  
    constructor(file: File) {
      this.file = file;
    }
  }
  