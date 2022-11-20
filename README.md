# Node-Red zigbee2mqtt install

apt install ca-certificates -y

apt update

apt upgrade -y

apt install git c++ make mc curl openvpn mosquitto -y

sudo apt-get install libcap2-bin -y

useradd -m -d /home/pi pi

passwd pi

usermod -aG sudo pi

usermod -aG dialout pi

### зайти под юзером pi



