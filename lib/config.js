import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.join(__dirname, '..', 'autogit.config.json');

export const askSetup = async () => {
  const { repoExists } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'repoExists',
      message: 'Have you already created your GitHub repository?',
      default: true,
    }
  ]);

  let repoUrl;

  if (repoExists) {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'repoUrl',
        message: 'Paste your GitHub repository URL:',
      }
    ]);
    repoUrl = answer.repoUrl;
  } else {
    console.log('\n🚧 Please create a GitHub repo manually first.');
    console.log('You can do this at: https://github.com/new');
    console.log('Then run this tool again once your repo is ready.\n');
    process.exit(1);
  }

  const { mode } = await inquirer.prompt([
    {
      type: 'list',
      name: 'mode',
      message: 'How do you want to push changes?',
      choices: ['Automatically', 'Manually'],
    }
  ]);

  const finalConfig = { repo: repoUrl, mode };
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(finalConfig, null, 2));
  return finalConfig;
};

export const loadConfig = () => {
  if (fs.existsSync(CONFIG_PATH)) {
    return JSON.parse(fs.readFileSync(CONFIG_PATH));
  }
  return null;
};
