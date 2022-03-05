const mockproducts = [
  {
    name: "iPhone",
    price: "849.99",
    SKU: "WR-5249",
    image:
      "https://www.apple.com/newsroom/images/product/iphone/standard/iphonex_front_back_new_glass_full.jpg.og.jpg?20211202",
    description: "iPhone X.",
    inventory_id: "2",
  },
  {
    name: "Macbook Air",
    image: "https://i.blogs.es/210ecf/macbookair1/840_560.jpg",
    price: "999.99",
    SKU: "CF-745ZY",
    description: "Macbook Air.",
    inventory_id: "4",
  },
  {
    name: "Macbook Pro",
    image:
      "https://www.apple.com/v/macbook-pro-14-and-16/b/images/meta/macbook-pro-14-and-16_overview__fz0lron5xyuu_og.png",
    price: "1999.99",
    SKU: "FG-56TH",
    description: "Macbook Pro 2019.",
    inventory_id: "5",
  },
  {
    name: "Nintendo Switch",
    price: "299.99",
    image:
      "https://www.atajo.com.ar/images/00000HAD-S-KABAA65619HAD-S-KABAA-Consola-Nintendo-Switch-Neon-01.jpg",
    SKU: "JK-543",
    description: "Nintendo Switch.",
    inventory_id: "6",
  },
  {
    name: "Playstation 4",
    image: "https://m.media-amazon.com/images/I/6118ctEjpoL._AC_SX569_.jpg",
    price: "299.99",
    SKU: "XQ-77Y",
    description: "Playstation 4 Pro.",
    inventory_id: "7",
  },
  {
    name: "Xbox One",
    image: "https://m.media-amazon.com/images/I/51-qFScFCLL._SL1000_.jpg",
    price: "279.99",
    SKU: "GT-V091",
    description: "Xbox One.",
    inventory_id: "8",
  },
  {
    name: "Notebook Asus x509JA",
    image:
      "https://s3-sa-east-1.amazonaws.com/saasargentina/FT73bvaQY55Yhw7isnVJ/imagen",
    price: "729.99",
    SKU: "GE-V022",
    description: "intel core i3 1005 G1| 4gb ram|1Tb|15.6 Full Hd",
    inventory_id: "3",
  },
  {
    name: "Headphones Sony WH ",
    price: "95.49",
    SKU: "RM-04PS",
    image:
      "https://images.fravega.com/f300/48514eff248347b83bcab8f17ed60468.jpg.webp",
    description: "Sony Headphones.",
    inventory_id: "1",
  },
  {
    name: "Google Chromecast",
    image: "https://i.blogs.es/358955/botones-chromecast/1366_2000.jpg",
    price: "50.00",
    SKU: "GE-22",
    description:
      "Barato y útil. Google dio en la tecla con el Chromecast y por ello vendió millones de unidades. Gracias a él, miles de televisores pudieron convertirse en SmartTV.",
    inventory_id: "9",
  },
  {
    name: "Apple Watch",
    image: "https://i.blogs.es/22a28f/alta/1366_2000.jpg",
    price: "50.00",
    SKU: "GE-k022",
    description:
      "Watch Os -Bluetooth WiFi -Siri - Ajuste de Brillo - Carga Rapida - GPS Integrado - Llamadas de Emergencia - Memoria Interna - Micrófono - Pantalla touch - Resistencia al Polvo",
    inventory_id: "10",
  },
  {
    name: "Google Home",
    image: "https://i.blogs.es/fc005e/google-home-espanol-01/1366_2000.jpg",
    price: "49.00",
    SKU: "GE-L0T2",
    description: "Color: CARBÓN - Talla: 1-PACK - Marca: Mount Genie",
    inventory_id: "11",
  },
  {
    name: "Samsung Galaxy Note",
    image: "https://i.blogs.es/bcc06d/note/1366_2000.jpg",
    price: "400.00",
    SKU: "GE-LYL0",
    description:
      "12 MP, f/1.5-2.4, 1.063 in (ancho), 1/2.55 pulgadas, 1.4 µm, Dual Pixel PDAF, OIS 12 MP, f/2.1, 2.047 in (telephoto), 1/3.6 pulgadas, 1.0 µm, PDAF, OIS, 2 zoom óptico 16 MP, f/0.087 in (ultratransparente. ancho), 1.0 0 µm, video súper estable ",
    inventory_id: "12",
  },
  {
    name: "Xiaomi Mi A1",
    image:
      "https://i.blogs.es/03a92e/xiaomi-mi-a1-tras-un-mes-de-uso-9/1366_2000.jpg",
    price: "350.00",
    SKU: "GE-KI60",
    description:
      "12 MP, f/1.5-2.4, 1.063 in (ancho), 1/2.55 pulgadas, 1.4 µm, Dual Pixel PDAF, OIS 12 MP, f/2.1, 2.047 in (telephoto), 1/3.6 pulgadas, 1.0 µm, PDAF, OIS, 2 zoom óptico 16 MP, f/0.087 in (ultratransparente. ancho), 1.0 0 µm, video súper estable ",
    inventory_id: "13",
  },
  {
    name: "Synology 2 Bay NAS DiskStation",
    image: "https://m.media-amazon.com/images/I/81SJrq+zRDL._AC_SL1500_.jpg",
    price: "100.00",
    SKU: "GE-RF75",
    description:
      "RJ-45 1GbE LAN Port 2 (with Link Aggregation / Failover support) USB 3.2 Gen 1 Port* 2 USB / SD Copy Notes The USB 3.0 standard was renamed to USB 3.2 Gen 1 by the USB Implementers Forum (USB-IF) in 2019. ",
    inventory_id: "14",
  },
  {
    name: "DJI Phantom",
    image: "https://m.media-amazon.com/images/I/81SJrq+zRDL._AC_SL1500_.jpg",
    price: "950.00",
    SKU: "GE-34Hu01",
    description:
      "Potensic Dreamer Drone con cámara para adultos 4K 31Mins Flight, GPS Quadcopter con motores Brushless[CÁMARA 4K CON SENSOR SONY , IMAGEN CLARA, VIDEO SUAVE]: -Potente sensor Sony 1/3 CMO incorporado con función de exposición automática, Potensic Dreamer le permite tomar fotos de 3840 x 2160.",
    inventory_id: "15",
  },
  {
    name: "Razer Huntsman Mini",
    image: "https://m.media-amazon.com/images/I/618etkLUt9L._AC_SL1500_.jpg",
    price: "120.00",
    SKU: "GE-3U56",
    description: "Tecnología de conectivida Wired - Detachable Type-C ",
    inventory_id: "16",
  },
  {
    name: "Apple AirPods Pro",
    image: "https://m.media-amazon.com/images/I/71eGsUPZm2L._AC_SL1500_.jpg",
    price: "163.14",
    SKU: "AP-543",
    description:
      "-Cancelación activa de ruido par un sonido envolvente -Modo de transparencia para escuchar y conectar con el mundo que te rodea -Tres tamaños de puntas de silicona suaves y cónicas para un ajuste personalizable. ",
    inventory_id: "17",
  },
];

module.exports = {
  mockproducts,
};
