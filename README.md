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

Использование.
в ноде Function можно использовать функции которые инициализируются в ноде с названием init lib, для подключения функций в ноде функция подключаем функции командой:

lib = global.get('LIB') 

после этого функции можно вызывать командой, некоторые функции возвращают значения, некоторые ничего не возвращают но публикуют сообщения из ноды  с названием init lib

**lib.Clear("топик")**

функция получает имя устройства, удаляет из mqtt топика префикс, который задается в первой строке ноды Прикрепленное изображение и отбрасывает всё что после имени устройства начиная с косой черты.

топик "z2m/Button01/action" будет преобразован в "Button01"

**lib.ConvName("топик")**
функция преобразует топик в имя переменной, удаляет в начале префикс и заменяет все косые черты на подчеркивание.

топик "z2m/Sensor01/temperature" будет преобразован в Sensor01_temperature. Используется для формирования переменных.

**lib.Curtain("Имя устройства", pos)**

функция управления рольставнями или шторами.

Имя устройства - имя устройства рольставни или шторы.

pos - команда, может быть числом или одной из следующих строк: "UP", "DOWN", "STOP"

если pos число то рольставням посылается команда установки позиции pos и формируется топик вида префикс+Имя устройства+"/set/position"

если одна из перечисленных строк тогда:

если рольставни имеют статус "STOP" то посылается команда pos

если рольставни имеют статус = команде pos то посылается команда "STOP"

если рольставни имеют статус противоположный команде pos то выполняется команда pos

публикуется в топик: Префикс+Имя устройства+"/set/state"

**lib.CurtainB("Имя устройства")**

функция управления рольставнями или шторами с помощью одной кнопки

Имя устройства - имя устройства рольставни или шторы.

если рольставни имеют статус "STOP" и рольставни имеют позицию закрыто то посылается команда открыть, если позицию открыто то посылается команда закрыть, если промежуточную позицию то посылается команда противоположная той что была ранее послана через эту функцию перед остановкой.

если рольставни имеют статус не "STOP" то посылается команда "STOP"

публикуется в топик: Префикс+Имя устройства+"/set/state"

**lib.Dimmer ("Имя устройства", pos, state)**

функция управление диммером

Имя устройства - имя устройства диммер.

pos - (не обязательный параметр) число - номер канала (1,2,3 ...), строка - имя канала ("left", "right")

если pos число то будет формироваться строка Префикс+Имя устройства+"state_l"+pos

если pos нет или "" то будет формироваться строка Префикс+Имя устройства+"state" (для одноканальных диммеров или led контроллеров)

state - (не обязательный параметр) статус, строка ("ON","OFF","TOGGLE")

если нет то выполняется "TOGGLE", при чем если включен ночной режим (переменная setup_"+Имя устройства+"_night_auto"+pos равна "ON") и статус был "OFF" то примет значения яркости ночного режима который установлен в файловой переменной: "setup"+Имя устройства+"_night_brightness"+pos. для устройства c именем "Dimmer02" второй канал переменная для ночного режима этого диммера будет "setup_Dimmer02_night_brightness2"

**lib.DimmerB ("Имя устройства", pos, state)**

функция управления диммером режим диммирование

Имя устройства - имя устройства диммер.

pos - (не обязательный параметр) число - номер канала (1,2,3 ...), строка - имя канала ("left", "right")

если pos число то будет формироваться строка Префикс+Имя устройства+"state_l"+pos

если pos нет или "" то будет формироваться строка Префикс+Имя устройства+"state" (для одноканальных диммеров или led контроллеров)

state - число, уровень яркости, если не указан, то 254

**lib.Relay ("Имя устройства", pos, state)**

функция управления реле.

Имя устройства - имя устройства диммер.

pos - (не обязательный параметр) число - номер канала (1,2,3 ...), строка - имя канала ("left", "right")

если pos число то будет формироваться строка Префикс+Имя устройства+"state_l"+pos

state - (не обязательный параметр) статус, строка ("ON","OFF","TOGGLE") если не указан то "TOGGLE"

**lib.Battery (уровень заряда батареи)**

формирует html строку с Font Awesome символом батареи и окрашиванием в разные цвета в зависимости от уровня заряда батареи. 
