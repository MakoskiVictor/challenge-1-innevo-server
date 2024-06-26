import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

// Lipmiar el file name
const cleanFileName = (fileName: string) => {
  const file = fileName.split('.').shift();
  return file;
}

// Leer los archivos en el directorio routes
readdirSync(PATH_ROUTER).filter((fileName) => { 
  const cleanName = cleanFileName(fileName)
  if(cleanName !== "index") {
    import(`./${cleanName}`).then((moduleRouter) => {
      router.use(`/${cleanName}`, moduleRouter.router)
    })
  }
 })

export { router };
