import fs from "fs";
const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

export async function getProjects() {
  return getDirectories("/Users/nikhilsaraf/garage");
}

export default async function Other() {
  return "hello";
}
