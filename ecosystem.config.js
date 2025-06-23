module.exports = {
  apps: [{
    name: 'portfolio',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/rizkifajar.dev', // Update this to your actual deployment path
    interpreter: 'none',
    env: {
      NODE_ENV: 'production',
      PORT: 3000 // or whatever port you want to use
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    restart_delay: 4000
  }]
};
