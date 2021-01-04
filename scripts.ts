import { nsh } from "@nksaraf/nsh";
import * as builder from "electron-builder";

nsh`
hello:
  $ echo hello

build:
  await ${async () => {
    return builder.build({
      targets: builder.Platform.MAC.createTarget(
        "dmg",
        builder.Arch.arm64,
        builder.Arch.x64
      ),
      config: {
        // "//": "build options, see https://goo.gl/QQXmcV",
      },
    });
  }}
`;
