import simpleGit from 'simple-git';
const git = simpleGit();

export async function initGitRepo(repo) {
  try {
    await git.init();
    await git.addRemote('origin', repo);
    console.log('✅ Git repo initialized & remote set');
  } catch (err) {
    console.error('❌ Git init error:', err.message);
  }
}

export async function commitAndPushChanges(message = 'auto-commit') {
  try {
    await git.add('./*');
    await git.commit(message);
    await git.push('origin', 'main');
    console.log('✅ Changes pushed successfully');
  } catch (err) {
    console.error('❌ Push failed:', err.message);
  }
}
