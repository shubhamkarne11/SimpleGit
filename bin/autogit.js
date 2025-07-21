#!/usr/bin/env node

import chalk from 'chalk';
import ora from 'ora';
import { askSetup, loadConfig } from '../lib/config.js';
import { initGitRepo, commitAndPushChanges } from '../lib/gitUtils.js';
import startWatcher from '../lib/watcher.js';
//hello bro 
console.clear();
console.log(chalk.cyan.bold('⚡ AutoGit CLI – GitHub Auto Commit & Push'));

let config = loadConfig();

if (!config) {
  config = await askSetup();
  await initGitRepo(config.repo);
}

if (config.mode === 'Automatically') {
  console.log(chalk.green('🔄 Watching for changes...'));
  startWatcher(() => commitAndPushChanges('auto-commit'));
} else {
  const spinner = ora('Committing manually...').start();
  await commitAndPushChanges('manual-commit');
  spinner.succeed('✅ Manual commit pushed!');
}
