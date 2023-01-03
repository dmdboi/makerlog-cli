#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .commandDir("commands")
  .demandCommand()
  .usage("makerlog [command]")
  .recommendCommands()
  .wrap(yargs.terminalWidth())
  .help("help", "List of available Makerlog commands")
  .strict()
  .scriptName("makerlog")
  .alias({ h: "help" }).argv;
