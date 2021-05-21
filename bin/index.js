#!/usr/bin/env node
/*!
@io-arc/preset-setup-files
Make it easy to install frequently used files.

Version: 1.0.0
License: MIT
Documents: https://github.com/io-arc/preset-setup-files#readme

Copyright (c) 2021 arc one
*/
"use strict";var e=require("commander"),t=require("update-notifier"),r=require("cpx"),s=require("inquirer"),c=require("path");function i(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=i(t),l=i(r),n=i(s),a=i(c);let p,h,u,d,m=!0;"undefined"!=typeof process&&(({FORCE_COLOR:p,NODE_DISABLE_COLORS:h,NO_COLOR:u,TERM:d}=process.env),m=process.stdout&&process.stdout.isTTY);const f=!h&&null==u&&"dumb"!==d&&(null!=p&&"0"!==p||m);function g(e,t){let r=new RegExp(`\\x1b\\[${t}m`,"g"),s=`[${e}m`,c=`[${t}m`;return function(e){return f&&null!=e?s+(~(""+e).indexOf(c)?e.replace(r,c+s):e)+c:e}}const k=g(31,39),v=g(32,39),y={editorConfig:".editorConfig",gitignore:".gitignore",npmrc:".npmrc",npmignore:".npmignore",browserslistrc:".browserslistrc",prettierrc:".prettierrc",prettierrcJson:".prettierrc.json",prettierrcJson5:".prettierrc.json5",prettierrcYml:".prettierrc.yml",prettierrcYaml:".prettierrc.yaml",prettierrcJs:".prettierrc.js",prettierrcCjs:".prettierrc.cjs",prettierrcConfigJs:".prettierrc.config.js",prettierrcConfigCjs:".prettierrc.config.cjs",prettierrcToml:".prettierrc.toml",eslintrcJs:".eslintrc.js",eslintrcCjs:".eslintrc.cjs",eslintrcYml:".eslintrc.yml",eslintrcYaml:".eslintrc.yaml",eslintrcJson:".eslintrc.json",eslintignore:".eslintignore"};class B{constructor(){this.#checkedItem=[y.editorConfig,y.gitignore,y.browserslistrc,y.prettierrc,y.eslintrcYml],this.#checkbox=async()=>{const{editorConfig:e,gitignore:t,npmrc:r,npmignore:s,browserslistrc:c,prettierrc:i,prettierrcJson:o,prettierrcJson5:l,prettierrcYml:a,prettierrcYaml:p,prettierrcJs:h,prettierrcCjs:u,prettierrcConfigJs:d,prettierrcConfigCjs:m,prettierrcToml:f,eslintrcJs:g,eslintrcCjs:k,eslintrcYml:v,eslintrcYaml:B,eslintrcJson:w,eslintignore:C}=y;try{const y=await n.default.prompt([{type:"checkbox",name:"templates",message:"Choice setup files",loop:!1,choices:[{value:e,checked:this.#setBool(e)},{value:t,checked:this.#setBool(t)},{value:r,checked:this.#setBool(r)},{value:s,checked:this.#setBool(s)},{value:c,checked:this.#setBool(c)},new n.default.Separator,{value:i,checked:this.#setBool(i)},{value:o,checked:this.#setBool(o)},{value:l,checked:this.#setBool(l)},{value:a,checked:this.#setBool(a)},{value:p,checked:this.#setBool(p)},{value:h,checked:this.#setBool(h)},{value:u,checked:this.#setBool(u)},{value:d,checked:this.#setBool(d)},{value:m,checked:this.#setBool(m)},{value:f,checked:this.#setBool(f)},new n.default.Separator,{value:g,checked:this.#setBool(g)},{value:k,checked:this.#setBool(k)},{value:v,checked:this.#setBool(v)},{value:B,checked:this.#setBool(B)},{value:w,checked:this.#setBool(w)},new n.default.Separator,{value:C,checked:this.#setBool(C)},new n.default.Separator]},{type:"confirm",name:"confirm",message:"Are you sure you want to create this?",default:!0}]);return this.#updateChecked(y.templates),{confirm:y.confirm}}catch(e){return console.error(e),1}},this.#updateChecked=e=>{this.#checkedItem=e},this.#setBool=e=>this.#checkedItem.includes(e)}#checkedItem;async choices(){const e=await this.#checkbox();if("number"==typeof e)return 1;if(!e.confirm){const[e]=await Promise.all([this.choices()]);return e}}async copy(){try{const{overwrite:e}=await n.default.prompt({type:"confirm",name:"overwrite",message:"If the file has the same name, it will be overwritten.",default:!1});l.default.copy(`${a.default.dirname(__filename)}/templates/{${this.#checkedItem.join(",")}}`,"",{update:e},(e=>{if(null!=e)throw new Error(JSON.stringify(e))}))}catch(e){return console.error(e),1}}#checkbox;#updateChecked;#setBool}o.default({pkg:{name:"@io-arc/preset-setup-files",version:"1.0.0"}}).notify(),process.stdin.resume(),process.on("SIGINT",(()=>{console.log(v("Bye !")),process.exit(0)})),e.program.version("1.0.0");const w=()=>{console.log(k("Oops X(")),process.exit(1)};(async()=>{const e=new B;if(null!=await e.choices())return void w();null==await e.copy()?console.log(v("=== Files copy is done! ===")):w()})();
