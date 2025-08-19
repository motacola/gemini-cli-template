import fs from "fs"
import path from "path"

function listFiles(dir, basePath = "") {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    const relativePath = path.join(basePath, file)

    if (stat.isDirectory()) {
      console.log(`📁 ${relativePath}/`)
      listFiles(filePath, relativePath)
    } else {
      console.log(`📄 ${relativePath}`)
    }
  })
}

// Start from the app directory
console.log("Checking file structure...")
listFiles("./app")
