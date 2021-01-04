import * as fs from "fs-extra";
import { exec } from "@nksaraf/nsh";
import * as pkgJSON from "package-json";
import path from "path";

const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const WORKSPACE_DIR = "/Users/nikhilsaraf/garage";

export async function openInVsCode(dir) {
  await exec`
  in ${dir} {
    $ code-insiders .
  }`;
}

export async function getProjects() {
  console.log(
    await exec`
    in ${"/Users/nikhilsaraf/garage/shellac"} { 
      $ git status
    }`
  );
  let dirs = getDirectories(WORKSPACE_DIR)
    .map((dir) => {
      let pkgJson = fs.readJSONSync(
        path.join(WORKSPACE_DIR, dir, "package.json")
      ) as pkgJSON.FullVersion;

      if (!pkgJson) {
        return null;
      }

      return {
        dir: path.join(WORKSPACE_DIR, dir),
        name: pkgJson.name ?? dir,
        pkg: pkgJson,
      };
    })
    .filter(Boolean);

  return dirs;
}

export type Project = ReturnType<typeof getProjects> extends Promise<infer U>
  ? U extends any[]
    ? U[number]
    : U
  : ReturnType<typeof getProjects>;

export default async function Other() {
  return "hello";
}
