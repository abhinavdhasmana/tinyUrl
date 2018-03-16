git clone https://github.com/abhinavdhasmana/tinyUrl.git
cd tinyUrl
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
export NVM_DIR="/home/ubuntu/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
source /home/ubuntu/.bashrc
nvm install 8.9.4
npm install
npm start

