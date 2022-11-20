# Node-Red zigbee2mqtt install

Установка Node-Red и zigbee2mqtt и файлы настройки.

Конфигурационные файлы имеют следующие параметры:

__Node-red__

порт не стандартный 1880, а 80-й,

dashboard в корне, а не /ui/

админ панель: /admin/

имя пользователя dashboard и админки user и admin соответственно

пароль: orangepipc

папка для локальных файлов /home/pi/node-red-static/

контекст переменных: default - в памяти, file - в файле

для смены пароля отредактировать файл /home/pi/.node-red/settings.js предварительно сгенерировав пароль запустив в консоли:
```
node-red admin hash-pw
```

### Установка

```
apt install ca-certificates -y
apt update
apt upgrade -y
apt install git c++ make mc curl openvpn mosquitto -y
sudo apt-get install libcap2-bin -y
useradd -m -d /home/pi pi
passwd pi
usermod -aG sudo pi
usermod -aG dialout pi
```
__зайти под юзером pi__

```
su pi
mkdir node-red-static
curl -L -O https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered 
bash update-nodejs-and-nodered --confirm-install
cd .node-red
node-red-dashboard
node-red-contrib-alexa-smart-home
sudo systemctl enable nodered.service
wget https://raw.githubusercontent.com/immortalserg/NR-z2m_install/main/settings.js -O ~/.node-red/settings.js
wget https://raw.githubusercontent.com/immortalserg/NR-z2m_install/main/flows.json -O ~/.node-red/flows.json
sudo setcap cap_net_bind_service=+ep /usr/bin/node
node-red-start
sudo mkdir /opt/zigbee2mqtt
sudo chown -R ${USER}: /opt/zigbee2mqtt
git clone --depth 1 https://github.com/Koenkk/zigbee2mqtt.git /opt/zigbee2mqtt
cd /opt/zigbee2mqtt
npm ci
wget https://raw.githubusercontent.com/immortalserg/NR-z2m_install/main/configuration.yaml -O /opt/zigbee2mqtt/data/configuration.yaml
sudo wget https://raw.githubusercontent.com/immortalserg/NR-z2m_install/main/zigbee2mqtt.service -O /etc/systemd/system/zigbee2mqtt.service
sudo systemctl enable zigbee2mqtt.service
sudo systemctl start zigbee2mqtt
```
