#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import * as template from './utils/template';
import * as shell from 'shelljs';

export interface CliOptions {
   projectName: string
   templateName: string
   templatePath: string
   tartgetPath: string
}


const CURR_DIR = process.cwd();
const CHOICES = fs.readdirSync(path.join(__dirname, 'templates'));
const QUESTIONS = [
   {
      name: 'template',
      type: 'list',
      message: 'What project template would you like to use, mister?',
      choices: CHOICES
   },
   {
      name: 'name',
      type: 'input',
      message: 'What shall be the name of that new project, sire?'
   }
];

inquirer.prompt(QUESTIONS).then(answers => {
   const projectChoice = answers['template'];
   const projectName = answers['name'];
   //@ts-ignore
   const templatePath = path.join(__dirname, 'templates', projectChoice);
   //@ts-ignore
   const tartgetPath = path.join(CURR_DIR, projectName);
   
   const options: CliOptions = {
       //@ts-ignore
       projectName,
       //@ts-ignore
       templateName: projectChoice,
       templatePath,
       tartgetPath
   }

   if (!createProject(tartgetPath)) {
       return;
   }

   //@ts-ignore
   createDirectoryContents(templatePath, projectName);

   postProcess(options);
});

function createProject(projectPath: string) {
   if (fs.existsSync(projectPath)) {
       console.log(chalk.red(`Folder ${projectPath} exists. Delete or use another name.`));
       return false;
   }
   fs.mkdirSync(projectPath);
   
   return true;
}

const SKIP_FILES = ['node_modules', '.template.json'];

function createDirectoryContents(templatePath: string, projectName: string) {
   const filesToCreate = fs.readdirSync(templatePath);
   filesToCreate.forEach(file => {
       const origFilePath = path.join(templatePath, file);

       const stats = fs.statSync(origFilePath);
   

       if (SKIP_FILES.indexOf(file) > -1) return;
       
       if (stats.isFile()) {
           let contents = fs.readFileSync(origFilePath, 'utf8');
           contents = template.render(contents, { projectName });
           const writePath = path.join(CURR_DIR, projectName, file);
           fs.writeFileSync(writePath, contents, 'utf8');
       } else if (stats.isDirectory()) {
           fs.mkdirSync(path.join(CURR_DIR, projectName, file));
           createDirectoryContents(path.join(templatePath, file), path.join(projectName, file));
       }
   });
}

function postProcess(options: CliOptions) {
   const isNode = fs.existsSync(path.join(options.templatePath, 'package.json'));
   if (isNode) {
       shell.cd(options.tartgetPath);
       const result = shell.exec('yarn install');
       if (result.code !== 0) {
           return false;
       }
   }
   
   return true;
}