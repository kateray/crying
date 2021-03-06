'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Pins', [
    { id: 15,
    uid: '1493842555066',
    name: 'love',
    title: 'Fell in love. It was winter, 2006. We were both dating other people and there was a thin layer of frost of the ground. We sat here at twilight, not talking. It was very cold and clear. I did not expect to fall in love with him.',
    hex: '&#x1f498',
    lat: '40.76695126131242',
    lng: '-73.97443161388986',
    heading: 114477,
    pitch: -14,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2 },
  { id: 16,
    uid: '1493842677824',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.75458792543728',
    lng: '-73.98368912218052',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 17,
    uid: '1493842689973',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.7601457460207',
    lng: '-73.95247477026635',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 18,
    uid: '1493842719231',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.7644713589415',
    lng: '-73.9473819527592',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 19,
    uid: '1493842755448',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.76124370539251',
    lng: '-73.93054383422555',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 20,
    uid: '1493842775862',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.73885852535681',
    lng: '-73.95266892182008',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 21,
    uid: '1493842795119',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.7309436',
    lng: '-73.99785880000002',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 22,
    uid: '1493842802405',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.7366943',
    lng: '-73.9900131',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 23,
    uid: '1493842814257',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.73810048572226',
    lng: '-73.99005211448218',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 24,
    uid: '1493842819784',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.739254',
    lng: '-73.98965450000003',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 25,
    uid: '1493842824140',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.74068729503379',
    lng: '-73.98934727821324',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 26,
    uid: '1493842828977',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.74227459999999',
    lng: '-73.98830980000002',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 27,
    uid: '1493842841015',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.74772540497109',
    lng: '-74.00049100188977',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 28,
    uid: '1493842856227',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.7368776',
    lng: '-74.00122959999999',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 29,
    uid: '1493842865756',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.74377536071271',
    lng: '-74.0084719324467',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 30,
    uid: '1493842883145',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.7257759',
    lng: '-73.98161900000002',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 31,
    uid: '1493842899145',
    name: 'cry',
    title: 'Cried in public<div><br></div>',
    hex: '&#x1f62d',
    lat: '40.72671099024662',
    lng: '-73.98545807857056',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 32,
    uid: '1493842912350',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.73378779999999',
    lng: '-73.98866090000001',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 33,
    uid: '1493842918076',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.73325579999999',
    lng: '-73.98677359999999',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 11,
    uid: '1493842281307',
    name: 'vomit',
    title: 'Vomited. Had to pull the car over right next to a line of people waiting to get into the club. &nbsp;It was October 1st, on the way back from the hospital. Why did I think I was OK to drive?<div><br></div>',
    hex: '&#x1f922',
    lat: '40.65334244141333',
    lng: '-74.00586845885891',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 12,
    uid: '1493842388252',
    name: 'cat',
    title: 'Met a bodega cat, love you miss you sunset park kitties<div><br></div>',
    hex: '&#x1F408',
    lat: '40.65021202804392',
    lng: '-74.00507940855505',
    heading: 58,
    pitch: -3,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 13,
    uid: '1493842429303',
    name: 'socialism',
    title: 'Adopted a new ideology; Became a hardcore hippie when I was like 15 or 16. Went to see some band with this older guy Brian who was wearing a skirt and just thought that was the coolest thing ever.&nbsp;',
    hex: '&#x262d',
    lat: '40.66137195467113',
    lng: '-73.97960572393379',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 14,
    uid: '1493842510066',
    name: 'sex',
    title: 'Sexed. Basement apartment sex.',
    hex: '&#x1f346',
    lat: '40.6485931235762',
    lng: '-74.00247721814515',
    heading: -1,
    pitch: 14,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 50,
    uid: '1493843080353',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.80197555220531',
    lng: '-73.93128619565641',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 34,
    uid: '1493842922985',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.73219838065535',
    lng: '-73.98506968432719',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 35,
    uid: '1493842928503',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.73162194342904',
    lng: '-73.98260247494267',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 36,
    uid: '1493842934708',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.74006353241943',
    lng: '-73.97620397070494',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 37,
    uid: '1493842943192',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.73872820230294',
    lng: '-73.97689069371012',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 38,
    uid: '1493842954049',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.73704188094153',
    lng: '-73.97848541338624',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 39,
    uid: '1493842960143',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.735769717689',
    lng: '-73.97913119120068',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 40,
    uid: '1493842973256',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.76081799598373',
    lng: '-73.96333616380173',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 41,
    uid: '1493842986609',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.779516668721',
    lng: '-73.94743519644464',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 42,
    uid: '1493842992660',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.78329530577935',
    lng: '-73.95984219079617',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 43,
    uid: '1493843003637',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.78055461406449',
    lng: '-73.95012246906589',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 44,
    uid: '1493843008579',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.78194470150374',
    lng: '-73.95601989656683',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2 },
  { id: 45,
    uid: '1493843021857',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.77895483788539',
    lng: '-73.96234507690247',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 46,
    uid: '1493843036300',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.75795457999084',
    lng: '-73.9570505135365',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 47,
    uid: '1493843043910',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.7627830955845',
    lng: '-73.94424323095421',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 48,
    uid: '1493843051946',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.79857837764817',
    lng: '-73.92937564330401',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 49,
    uid: '1493843058125',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.80381104033631',
    lng: '-73.92822265811304',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 51,
    uid: '1493843092765',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.84883292516277',
    lng: '-73.93665596369163',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 52,
    uid: '1493843110434',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.80243878201554',
    lng: '-73.82992696100422',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 53,
    uid: '1493843115968',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.80018307729202',
    lng: '-73.79371608832787',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 54,
    uid: '1493843138203',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.75051019545474',
    lng: '-73.75320224493532',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 55,
    uid: '1493843169345',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.74322694750672',
    lng: '-73.95971723099854',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 56,
    uid: '1493843187626',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.7331566',
    lng: '-73.93086979999998',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 57,
    uid: '1493843219227',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.70481958373711',
    lng: '-73.92891048124949',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 58,
    uid: '1493843228830',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.71531947825511',
    lng: '-73.9520315993658',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 59,
    uid: '1493843233131',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.71663068512737',
    lng: '-73.9548191306443',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 60,
    uid: '1493843237039',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.71851296569236',
    lng: '-73.95701818752906',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 61,
    uid: '1493843241571',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.7202460019889',
    lng: '-73.95966706133373',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 62,
    uid: '1493843245571',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.7217385',
    lng: '-73.96191290000002',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 63,
    uid: '1493843255267',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.73692805374534',
    lng: '-73.95266918102794',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 64,
    uid: '1493843259168',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.73516166047214',
    lng: '-73.9523895526371',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 65,
    uid: '1493843263012',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.73285589421174',
    lng: '-73.95214937250171',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 66,
    uid: '1493843265902',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.73087002350182',
    lng: '-73.95179970892349',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 67,
    uid: '1493843269193',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.7294009390621',
    lng: '-73.95097886864494',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 68,
    uid: '1493843273175',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.7372600909321',
    lng: '-73.95570476760389',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 69,
    uid: '1493843277559',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.73541904683832',
    lng: '-73.95514071095289',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 70,
    uid: '1493843280528',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.73373878440141',
    lng: '-73.95492192549',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 71,
    uid: '1493843285989',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.73160457576849',
    lng: '-73.95472880334034',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 72,
    uid: '1493843289145',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.72948345597505',
    lng: '-73.95400948981626',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 73,
    uid: '1493843293758',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.72768228403972',
    lng: '-73.95304151123048',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 74,
    uid: '1493843296952',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.72603618378813',
    lng: '-73.95185483993583',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 75,
    uid: '1493843301149',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.72407523106993',
    lng: '-73.95036136663367',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 76,
    uid: '1493843305003',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.72180965139952',
    lng: '-73.95072074711754',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 77,
    uid: '1493843309375',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.72048614780824',
    lng: '-73.9526901352744',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
  { id: 78,
    uid: '1493843312899',
    name: 'cry',
    title: 'Cried in public',
    hex: '&#x1f62d',
    lat: '40.7236',
    lng: '-73.94349779999999',
    heading: 34,
    pitch: 10,
    zoom: 1,
    createdAt: new Date(),
updatedAt: new Date(),
userId: 2  },
{ id: 3,
    uid: '1493752212663',
    name: 'cat',
    title: 'I\'m allergic but it\'s still adorbz.',
    hex: '&#x1F408',
    lat: '40.71144747019846',
    lng: '-73.94594379956186',
    heading: 11,
    pitch: -5,
    zoom: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  userId: 3 },
    { id: 9,
    uid: '1493824923640',
    name: 'cry',
    title: 'I cried so hard here in 2009 over a breakup',
    hex: '&#x1f62d',
    lat: '40.74303710534146',
    lng: '-73.98852379292055',
    heading: 120,
    pitch: -10,
    zoom: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 4 },
  { id: 10,
    uid: '1493825090999',
    name: 'love',
    title: 'Fell in love over eggs, bacon and caesar salad',
    hex: '&#x1f498',
    lat: '40.73300016843807',
    lng: '-74.00006806169205',
    heading: -23,
    pitch: 3,
    zoom: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 4 }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
