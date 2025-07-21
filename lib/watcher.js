import chokidar from 'chokidar';

export default function startWatcher(onChange) {
  const watcher = chokidar.watch('.', {
    ignored: /node_modules|\.git|autogit\.config\.json/,
    persistent: true
  });

  watcher.on('change', (file) => {
    console.log(`📄 File changed: ${file}`);
    onChange();
  });
}
