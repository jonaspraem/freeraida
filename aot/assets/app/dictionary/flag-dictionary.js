import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Injectable } from "@angular/core";
// Requires all flag images A to Z
// A
var abkhazia = require('../../images/flags/abkhazia.png');
var afghanistan = require('../../images/flags/afghanistan.png');
var aland_islands = require('../../images/flags/aland-islands.png');
var albania = require('../../images/flags/albania.png');
var algeria = require('../../images/flags/algeria.png');
var american_samoa = require('../../images/flags/american-samoa.png');
var andorra = require('../../images/flags/andorra.png');
var anguilla = require('../../images/flags/anguilla.png');
var antigua_and_barbuda = require('../../images/flags/antigua-and-barbuda.png');
var argentina = require('../../images/flags/argentina.png');
var armenia = require('../../images/flags/armenia.png');
var aruba = require('../../images/flags/aruba.png');
var australia = require('../../images/flags/australia.png');
var austria = require('../../images/flags/austria.png');
var azerbaijan = require('../../images/flags/azerbaijan.png');
var azores_islands = require('../../images/flags/azores-islands.png');
// B
var bahamas = require('../../images/flags/bahamas.png');
var bahrain = require('../../images/flags/bahrain.png');
var balearic_islands = require('../../images/flags/balearic-islands.png');
var bangladesh = require('../../images/flags/bangladesh.png');
var barbados = require('../../images/flags/barbados.png');
var basque_country = require('../../images/flags/basque-country.png');
var belarus = require('../../images/flags/belarus.png');
var belgium = require('../../images/flags/belgium.png');
var belize = require('../../images/flags/belize.png');
var benin = require('../../images/flags/benin.png');
var bermuda = require('../../images/flags/bermuda.png');
var bhutan = require('../../images/flags/bhutan-1.png');
var bolivia = require('../../images/flags/bolivia.png');
var bonaire = require('../../images/flags/bonaire.png');
var bosnia_and_herzegovina = require('../../images/flags/bosnia-and-herzegovina.png');
var botswana = require('../../images/flags/botswana.png');
var brazil = require('../../images/flags/brazil.png');
var british_columbia = require('../../images/flags/british-columbia.png');
var british_indian_ocean_territory = require('../../images/flags/british-indian-ocean-territory.png');
var british_virgin_islands = require('../../images/flags/british-virgin-islands.png');
var brunei = require('../../images/flags/brunei.png');
var bulgaria = require('../../images/flags/bulgaria.png');
var burkina_faso = require('../../images/flags/burkina-faso.png');
var burundi = require('../../images/flags/burundi.png');
// C
var cambodia = require('../../images/flags/cambodia.png');
var cameroon = require('../../images/flags/cameroon.png');
var canada = require('../../images/flags/canada.png');
var canary_islands = require('../../images/flags/canary-islands.png');
var cape_verde = require('../../images/flags/cape-verde.png');
var cayman_islands = require('../../images/flags/cayman-islands.png');
var central_african_republic = require('../../images/flags/central-african-republic.png');
var ceuta = require('../../images/flags/ceuta.png');
var chad = require('../../images/flags/chad.png');
var chile = require('../../images/flags/chile.png');
var china = require('../../images/flags/china.png');
var christmas_island = require('../../images/flags/christmas-island.png');
var cocos_island = require('../../images/flags/cocos-island.png');
var colombia = require('../../images/flags/colombia.png');
var comoros = require('../../images/flags/comoros.png');
var congo = require('../../images/flags/congo.png');
var cook_islands = require('../../images/flags/cook-islands.png');
var corsica = require('../../images/flags/corsica.png');
var costa_rica = require('../../images/flags/costa-rica.png');
var croatia = require('../../images/flags/croatia.png');
var cuba = require('../../images/flags/cuba.png');
var curacao = require('../../images/flags/curacao.png');
var cyprus = require('../../images/flags/cyprus.png');
var czech_republic = require('../../images/flags/czech-republic.png');
// D
var democratic_republic_of_congo = require('../../images/flags/democratic-republic-of-congo.png');
var denmark = require('../../images/flags/denmark.png');
var djibouti = require('../../images/flags/djibouti.png');
var dominica = require('../../images/flags/dominica.png');
var dominican_republic = require('../../images/flags/dominican-republic.png');
// E
var east_timor = require('../../images/flags/east-timor.png');
var ecuador = require('../../images/flags/ecuador.png');
var egypt = require('../../images/flags/egypt.png');
var england = require('../../images/flags/england.png');
var equatorial_guinea = require('../../images/flags/equatorial-guinea.png');
var eritrea = require('../../images/flags/eritrea.png');
var estonia = require('../../images/flags/estonia.png');
var ethiopia = require('../../images/flags/ethiopia.png');
var european_union = require('../../images/flags/european-union.png');
// F
var falkland_islands = require('../../images/flags/falkland-islands.png');
var faroe_islands = require('../../images/flags/faroe-islands.png');
var fiji = require('../../images/flags/fiji.png');
var finland = require('../../images/flags/finland.png');
var france = require('../../images/flags/france.png');
var french_polynesia = require('../../images/flags/french-polynesia.png');
// G
var gabon = require('../../images/flags/gabon.png');
var galapagos_islands = require('../../images/flags/galapagos-islands.png');
var gambia = require('../../images/flags/gambia.png');
var georgia = require('../../images/flags/georgia.png');
var germany = require('../../images/flags/germany.png');
var ghana = require('../../images/flags/ghana.png');
var gibraltar = require('../../images/flags/gibraltar.png');
var greece = require('../../images/flags/greece.png');
var greenland = require('../../images/flags/greenland.png');
var grenada = require('../../images/flags/grenada.png');
var guam = require('../../images/flags/guam.png');
var guatemala = require('../../images/flags/guatemala.png');
var guernsey = require('../../images/flags/guernsey.png');
var guinea = require('../../images/flags/guinea.png');
var guinea_bissau = require('../../images/flags/guinea-bissau.png');
var guyana = require('../../images/flags/guyana.png');
// H
var haiti = require('../../images/flags/haiti.png');
var hawaii = require('../../images/flags/hawaii.png');
var honduras = require('../../images/flags/honduras.png');
var hong_kong = require('../../images/flags/hong-kong.png');
var hungary = require('../../images/flags/hungary.png');
// I
var iceland = require('../../images/flags/iceland.png');
var india = require('../../images/flags/india.png');
var indonesia = require('../../images/flags/indonesia.png');
var iran = require('../../images/flags/iran.png');
var iraq = require('../../images/flags/iraq.png');
var ireland = require('../../images/flags/ireland.png');
var isle_of_man = require('../../images/flags/isle-of-man.png');
var israel = require('../../images/flags/israel.png');
var ivory_coast = require('../../images/flags/ivory-coast.png');
// J
var jamaica = require('../../images/flags/jamaica.png');
var japan = require('../../images/flags/japan.png');
var jersey = require('../../images/flags/jersey.png');
var jordan = require('../../images/flags/jordan.png');
// K
var kazakhstan = require('../../images/flags/kazakhstan.png');
var kenya = require('../../images/flags/kenya.png');
var kiribati = require('../../images/flags/kiribati.png');
var kosovo = require('../../images/flags/kosovo.png');
var kuwait = require('../../images/flags/kuwait.png');
var kyrgyzstan = require('../../images/flags/kyrgyzstan.png');
// L
var laos = require('../../images/flags/laos.png');
var latvia = require('../../images/flags/latvia.png');
var lebanon = require('../../images/flags/lebanon.png');
var lesotho = require('../../images/flags/lesotho.png');
var liberia = require('../../images/flags/liberia.png');
var libya = require('../../images/flags/libya.png');
var liechtenstein = require('../../images/flags/liechtenstein.png');
var lithuania = require('../../images/flags/lithuania.png');
var luxembourg = require('../../images/flags/luxembourg.png');
// M
var macao = require('../../images/flags/macao.png');
var macedonia = require('../../images/flags/macedonia.png');
var madagascar = require('../../images/flags/madagascar.png');
var madeira = require('../../images/flags/madeira.png');
var malawi = require('../../images/flags/malawi.png');
var malaysia = require('../../images/flags/malaysia.png');
var maldives = require('../../images/flags/maldives.png');
var mali = require('../../images/flags/mali.png');
var malta = require('../../images/flags/malta.png');
var marshall_island = require('../../images/flags/marshall-island.png');
var martinique = require('../../images/flags/martinique.png');
var mauritania = require('../../images/flags/mauritania.png');
var mauritius = require('../../images/flags/mauritius.png');
var melilla = require('../../images/flags/melilla.png');
var mexico = require('../../images/flags/mexico.png');
var micronesia = require('../../images/flags/micronesia.png');
var moldova = require('../../images/flags/moldova.png');
var monaco = require('../../images/flags/monaco.png');
var mongolia = require('../../images/flags/mongolia.png');
var montenegro = require('../../images/flags/montenegro.png');
var montserrat = require('../../images/flags/montserrat.png');
var morocco = require('../../images/flags/morocco.png');
var mozambique = require('../../images/flags/mozambique.png');
var myanmar = require('../../images/flags/myanmar.png');
// N
var namibia = require('../../images/flags/namibia.png');
var nato = require('../../images/flags/nato.png');
var nauru = require('../../images/flags/nauru.png');
var nepal = require('../../images/flags/nepal.png');
var netherlands = require('../../images/flags/netherlands.png');
var new_zealand = require('../../images/flags/new-zealand.png');
var nicaragua = require('../../images/flags/nicaragua.png');
var niger = require('../../images/flags/niger.png');
var nigeria = require('../../images/flags/nigeria.png');
var niue = require('../../images/flags/niue.png');
var norfolk_island = require('../../images/flags/norfolk-island.png');
var north_korea = require('../../images/flags/north-korea.png');
var northern_cyprus = require('../../images/flags/northern-cyprus.png');
var northern_marianas_islands = require('../../images/flags/northern-marianas-islands.png');
var norway = require('../../images/flags/norway.png');
// O
var oman = require('../../images/flags/oman.png');
var orkney_islands = require('../../images/flags/orkney-islands.png');
var ossetia = require('../../images/flags/ossetia.png');
// P
var pakistan = require('../../images/flags/pakistan.png');
var palau = require('../../images/flags/palau.png');
var palestine = require('../../images/flags/palestine.png');
var panama = require('../../images/flags/panama.png');
var papua_new_guinea = require('../../images/flags/papua-new-guinea.png');
var paraguay = require('../../images/flags/paraguay.png');
var peru = require('../../images/flags/peru.png');
var philippines = require('../../images/flags/philippines.png');
var pitcairn_islands = require('../../images/flags/pitcairn-islands.png');
var poland = require('../../images/flags/poland.png');
var portugal = require('../../images/flags/portugal.png');
var puerto_rico = require('../../images/flags/puerto-rico.png');
// Q
var qatar = require('../../images/flags/qatar.png');
// R
var rapa_nui = require('../../images/flags/rapa-nui.png');
var romania = require('../../images/flags/romania.png');
var russia = require('../../images/flags/russia.png');
var rwanda = require('../../images/flags/rwanda.png');
// S
var saba_island = require('../../images/flags/saba-island.png');
var saint_kitts_and_nevis = require('../../images/flags/saint-kitts-and-nevis.png');
var salvador = require('../../images/flags/salvador.png');
var samoa = require('../../images/flags/samoa.png');
var san_marino = require('../../images/flags/san-marino.png');
var sao_tome_and_principe = require('../../images/flags/sao-tome-and-principe.png');
var sardinia = require('../../images/flags/sardinia.png');
var saudi_arabia = require('../../images/flags/saudi-arabia.png');
var scotland = require('../../images/flags/scotland.png');
var senegal = require('../../images/flags/senegal.png');
var serbia = require('../../images/flags/serbia.png');
var seychelles = require('../../images/flags/seychelles.png');
var sierra_leone = require('../../images/flags/sierra-leone.png');
var singapore = require('../../images/flags/singapore.png');
var sint_eustatius = require('../../images/flags/sint-eustatius.png');
var sint_maarten = require('../../images/flags/sint-maarten.png');
var slovakia = require('../../images/flags/slovakia.png');
var slovenia = require('../../images/flags/slovenia.png');
var solomon_islands = require('../../images/flags/solomon-islands.png');
var somalia = require('../../images/flags/somalia.png');
var somaliland = require('../../images/flags/somaliland.png');
var south_africa = require('../../images/flags/south-africa.png');
var south_korea = require('../../images/flags/south-korea.png');
var south_sudan = require('../../images/flags/south-sudan.png');
var spain = require('../../images/flags/spain.png');
var sri_lanka = require('../../images/flags/sri-lanka.png');
var st_barthelemy = require('../../images/flags/st-barthelemy.png');
var st_lucia = require('../../images/flags/st-lucia.png');
var st_vincent_and_the_grenadines = require('../../images/flags/st-vincent-and-the-grenadines.png');
var sudan = require('../../images/flags/sudan.png');
var suriname = require('../../images/flags/suriname.png');
var swaziland = require('../../images/flags/swaziland.png');
var sweden = require('../../images/flags/sweden.png');
var switzerland = require('../../images/flags/switzerland.png');
var syria = require('../../images/flags/syria.png');
// T
var taiwan = require('../../images/flags/taiwan.png');
var tajikistan = require('../../images/flags/tajikistan.png');
var tanzania = require('../../images/flags/tanzania.png');
var thailand = require('../../images/flags/thailand.png');
var tibet = require('../../images/flags/tibet.png');
var togo = require('../../images/flags/togo.png');
var tokelau = require('../../images/flags/tokelau.png');
var tonga = require('../../images/flags/tonga.png');
var transnistria = require('../../images/flags/transnistria.png');
var trinidad_and_tobago = require('../../images/flags/trinidad-and-tobago.png');
var tunisia = require('../../images/flags/tunisia.png');
var turkey = require('../../images/flags/turkey.png');
var turkmenistan = require('../../images/flags/turkmenistan.png');
var turks_and_caicos = require('../../images/flags/turks-and-caicos.png');
var tuvalu = require('../../images/flags/tuvalu.png');
// U
var uganda = require('../../images/flags/uganda.png');
var ukraine = require('../../images/flags/ukraine.png');
var united_arab_emirates = require('../../images/flags/united-arab-emirates.png');
var united_kingdom = require('../../images/flags/united-kingdom.png');
var united_nations = require('../../images/flags/united-nations.png');
var united_states_of_america = require('../../images/flags/united-states-of-america.png');
var uruguay = require('../../images/flags/uruguay.png');
var uzbekistan = require('../../images/flags/uzbekistan.png');
// V
var vanuatu = require('../../images/flags/vanuatu.png');
var vatican_city = require('../../images/flags/vatican-city.png');
var venezuela = require('../../images/flags/venezuela.png');
var vietnam = require('../../images/flags/vietnam.png');
var virgin_islands = require('../../images/flags/virgin-islands.png');
// W
var wales = require('../../images/flags/wales.png');
var western_sahara = require('../../images/flags/western-sahara.png');
// X
// Y
var yemen = require('../../images/flags/yemen.png');
// Z
var zambia = require('../../images/flags/zambia.png');
var zimbabwe = require('../../images/flags/zimbabwe.png');
var FLAG_DICTIONARY = /** @class */ (function () {
    function FLAG_DICTIONARY() {
        // From a to z
        // A
        FLAG_DICTIONARY.flagmap.set('Abkhazia', abkhazia);
        FLAG_DICTIONARY.flagmap.set('Afghanistan', afghanistan);
        FLAG_DICTIONARY.flagmap.set('Aland Islands', aland_islands);
        FLAG_DICTIONARY.flagmap.set('Albania', albania);
        FLAG_DICTIONARY.flagmap.set('Algeria', algeria);
        FLAG_DICTIONARY.flagmap.set('American Samoa', american_samoa);
        FLAG_DICTIONARY.flagmap.set('Andorra', andorra);
        FLAG_DICTIONARY.flagmap.set('Anguilla', anguilla);
        FLAG_DICTIONARY.flagmap.set('Antigua and Barbuda', antigua_and_barbuda);
        FLAG_DICTIONARY.flagmap.set('Argentina', argentina);
        FLAG_DICTIONARY.flagmap.set('Armenia', armenia);
        FLAG_DICTIONARY.flagmap.set('Aruba', aruba);
        FLAG_DICTIONARY.flagmap.set('Australia', australia);
        FLAG_DICTIONARY.flagmap.set('Austria', austria);
        FLAG_DICTIONARY.flagmap.set('Azerbaijan', azerbaijan);
        FLAG_DICTIONARY.flagmap.set('Azores Islands', azores_islands);
        // B
        FLAG_DICTIONARY.flagmap.set('Bahamas', bahamas);
        FLAG_DICTIONARY.flagmap.set('Bahrain', bahrain);
        FLAG_DICTIONARY.flagmap.set('Balearic Islands', balearic_islands);
        FLAG_DICTIONARY.flagmap.set('Bangladesh', bangladesh);
        FLAG_DICTIONARY.flagmap.set('Barbados', barbados);
        FLAG_DICTIONARY.flagmap.set('Basque Country', basque_country);
        FLAG_DICTIONARY.flagmap.set('Belarus', belarus);
        FLAG_DICTIONARY.flagmap.set('Belgium', belgium);
        FLAG_DICTIONARY.flagmap.set('Belize', belize);
        FLAG_DICTIONARY.flagmap.set('Benin', benin);
        FLAG_DICTIONARY.flagmap.set('Bermuda', bermuda);
        FLAG_DICTIONARY.flagmap.set('Bhutan', bhutan);
        FLAG_DICTIONARY.flagmap.set('Bolivia', bolivia);
        FLAG_DICTIONARY.flagmap.set('Bonaire', bonaire);
        FLAG_DICTIONARY.flagmap.set('Bosnia and Herzegovina', bosnia_and_herzegovina);
        FLAG_DICTIONARY.flagmap.set('Botswana', botswana);
        FLAG_DICTIONARY.flagmap.set('Brazil', brazil);
        FLAG_DICTIONARY.flagmap.set('British Columbia', british_columbia);
        FLAG_DICTIONARY.flagmap.set('British Indian Ocean Territory', british_indian_ocean_territory);
        FLAG_DICTIONARY.flagmap.set('British Virgin Islands', british_virgin_islands);
        FLAG_DICTIONARY.flagmap.set('Brunei', brunei);
        FLAG_DICTIONARY.flagmap.set('Bulgaria', bulgaria);
        FLAG_DICTIONARY.flagmap.set('Burkina Faso', burkina_faso);
        FLAG_DICTIONARY.flagmap.set('Burundi', burundi);
        // C
        FLAG_DICTIONARY.flagmap.set('Cambodia', cambodia);
        FLAG_DICTIONARY.flagmap.set('Cameroon', cameroon);
        FLAG_DICTIONARY.flagmap.set('Canada', canada);
        FLAG_DICTIONARY.flagmap.set('Canary Islands', canary_islands);
        FLAG_DICTIONARY.flagmap.set('Cape Verde', cape_verde);
        FLAG_DICTIONARY.flagmap.set('Cayman Islands', cayman_islands);
        FLAG_DICTIONARY.flagmap.set('Central African Republic', central_african_republic);
        FLAG_DICTIONARY.flagmap.set('Ceuta', ceuta);
        FLAG_DICTIONARY.flagmap.set('Chad', chad);
        FLAG_DICTIONARY.flagmap.set('Chile', chile);
        FLAG_DICTIONARY.flagmap.set('China', china);
        FLAG_DICTIONARY.flagmap.set('Christmas Island', christmas_island);
        FLAG_DICTIONARY.flagmap.set('Cocos Island', cocos_island);
        FLAG_DICTIONARY.flagmap.set('Colombia', colombia);
        FLAG_DICTIONARY.flagmap.set('Comoros', comoros);
        FLAG_DICTIONARY.flagmap.set('Congo', congo);
        FLAG_DICTIONARY.flagmap.set('Cook Islands', cook_islands);
        FLAG_DICTIONARY.flagmap.set('Corsica', corsica);
        FLAG_DICTIONARY.flagmap.set('Costa Rica', costa_rica);
        FLAG_DICTIONARY.flagmap.set('Croatia', croatia);
        FLAG_DICTIONARY.flagmap.set('Cuba', cuba);
        FLAG_DICTIONARY.flagmap.set('Curacao', curacao);
        FLAG_DICTIONARY.flagmap.set('Cyprus', cyprus);
        FLAG_DICTIONARY.flagmap.set('Czech Republic', czech_republic);
        // D
        FLAG_DICTIONARY.flagmap.set('Democratic Republic of Congo', democratic_republic_of_congo);
        FLAG_DICTIONARY.flagmap.set('Denmark', denmark);
        FLAG_DICTIONARY.flagmap.set('Djibouti', djibouti);
        FLAG_DICTIONARY.flagmap.set('Dominica', dominica);
        FLAG_DICTIONARY.flagmap.set('Dominican Republic', dominican_republic);
        // E
        FLAG_DICTIONARY.flagmap.set('East Timor', east_timor);
        FLAG_DICTIONARY.flagmap.set('Ecuador', ecuador);
        FLAG_DICTIONARY.flagmap.set('Egypt', egypt);
        FLAG_DICTIONARY.flagmap.set('England', england);
        FLAG_DICTIONARY.flagmap.set('Equatorial Guinea', equatorial_guinea);
        FLAG_DICTIONARY.flagmap.set('Eritrea', eritrea);
        FLAG_DICTIONARY.flagmap.set('Estonia', estonia);
        FLAG_DICTIONARY.flagmap.set('Ethiopia', ethiopia);
        FLAG_DICTIONARY.flagmap.set('European Union', european_union);
        // F
        FLAG_DICTIONARY.flagmap.set('Falkland Islands', falkland_islands);
        FLAG_DICTIONARY.flagmap.set('Faroe Islands', faroe_islands);
        FLAG_DICTIONARY.flagmap.set('Fiji', fiji);
        FLAG_DICTIONARY.flagmap.set('Finland', finland);
        FLAG_DICTIONARY.flagmap.set('France', france);
        FLAG_DICTIONARY.flagmap.set('French Polynesia', french_polynesia);
        // G
        FLAG_DICTIONARY.flagmap.set('Gabon', gabon);
        FLAG_DICTIONARY.flagmap.set('Galapagos Islands', galapagos_islands);
        FLAG_DICTIONARY.flagmap.set('Gambia', gambia);
        FLAG_DICTIONARY.flagmap.set('Georgia', georgia);
        FLAG_DICTIONARY.flagmap.set('Germany', germany);
        FLAG_DICTIONARY.flagmap.set('Ghana', ghana);
        FLAG_DICTIONARY.flagmap.set('Gibraltar', gibraltar);
        FLAG_DICTIONARY.flagmap.set('Greece', greece);
        FLAG_DICTIONARY.flagmap.set('Greenland', greenland);
        FLAG_DICTIONARY.flagmap.set('Grenada', grenada);
        FLAG_DICTIONARY.flagmap.set('Guam', guam);
        FLAG_DICTIONARY.flagmap.set('Guatemala', guatemala);
        FLAG_DICTIONARY.flagmap.set('Guernsey', guernsey);
        FLAG_DICTIONARY.flagmap.set('Guinea', guinea);
        FLAG_DICTIONARY.flagmap.set('Guinea Bissau', guinea_bissau);
        FLAG_DICTIONARY.flagmap.set('Guyana', guyana);
        // H
        FLAG_DICTIONARY.flagmap.set('Haiti', haiti);
        FLAG_DICTIONARY.flagmap.set('Hawaii', hawaii);
        FLAG_DICTIONARY.flagmap.set('Honduras', honduras);
        FLAG_DICTIONARY.flagmap.set('Hong Kong', hong_kong);
        FLAG_DICTIONARY.flagmap.set('Hungary', hungary);
        // I
        FLAG_DICTIONARY.flagmap.set('Iceland', iceland);
        FLAG_DICTIONARY.flagmap.set('India', india);
        FLAG_DICTIONARY.flagmap.set('Indonesia', indonesia);
        FLAG_DICTIONARY.flagmap.set('Iran', iran);
        FLAG_DICTIONARY.flagmap.set('Iraq', iraq);
        FLAG_DICTIONARY.flagmap.set('Ireland', ireland);
        FLAG_DICTIONARY.flagmap.set('Isle of Man', isle_of_man);
        FLAG_DICTIONARY.flagmap.set('Israel', israel);
        FLAG_DICTIONARY.flagmap.set('Ivory Coast', ivory_coast);
        // J
        FLAG_DICTIONARY.flagmap.set('Jamaica', jamaica);
        FLAG_DICTIONARY.flagmap.set('Japan', japan);
        FLAG_DICTIONARY.flagmap.set('Jersey', jersey);
        FLAG_DICTIONARY.flagmap.set('Jordan', jordan);
        // K
        FLAG_DICTIONARY.flagmap.set('Kazakhstan', kazakhstan);
        FLAG_DICTIONARY.flagmap.set('Kenya', kenya);
        FLAG_DICTIONARY.flagmap.set('Kiribati', kiribati);
        FLAG_DICTIONARY.flagmap.set('Kosovo', kosovo);
        FLAG_DICTIONARY.flagmap.set('Kuwait', kuwait);
        FLAG_DICTIONARY.flagmap.set('Kyrgyzstan', kyrgyzstan);
        // L
        FLAG_DICTIONARY.flagmap.set('Laos', laos);
        FLAG_DICTIONARY.flagmap.set('Latvia', latvia);
        FLAG_DICTIONARY.flagmap.set('Lebanon', lebanon);
        FLAG_DICTIONARY.flagmap.set('Lesotho', lesotho);
        FLAG_DICTIONARY.flagmap.set('Liberia', liberia);
        FLAG_DICTIONARY.flagmap.set('Libya', libya);
        FLAG_DICTIONARY.flagmap.set('Liechtenstein', liechtenstein);
        FLAG_DICTIONARY.flagmap.set('Lithuania', lithuania);
        FLAG_DICTIONARY.flagmap.set('Luxembourg', luxembourg);
        // M
        FLAG_DICTIONARY.flagmap.set('Macao', macao);
        FLAG_DICTIONARY.flagmap.set('Macedonia', macedonia);
        FLAG_DICTIONARY.flagmap.set('Madagascar', madagascar);
        FLAG_DICTIONARY.flagmap.set('Madeira', madeira);
        FLAG_DICTIONARY.flagmap.set('Malawi', malawi);
        FLAG_DICTIONARY.flagmap.set('Malaysia', malaysia);
        FLAG_DICTIONARY.flagmap.set('Maldives', maldives);
        FLAG_DICTIONARY.flagmap.set('Mali', mali);
        FLAG_DICTIONARY.flagmap.set('Malta', malta);
        FLAG_DICTIONARY.flagmap.set('Marshall Islands', marshall_island);
        FLAG_DICTIONARY.flagmap.set('Martinique', martinique);
        FLAG_DICTIONARY.flagmap.set('Mauritania', mauritania);
        FLAG_DICTIONARY.flagmap.set('Mauritius', mauritius);
        FLAG_DICTIONARY.flagmap.set('Melilla', melilla);
        FLAG_DICTIONARY.flagmap.set('Mexico', mexico);
        FLAG_DICTIONARY.flagmap.set('Micronesia', micronesia);
        FLAG_DICTIONARY.flagmap.set('Moldova', moldova);
        FLAG_DICTIONARY.flagmap.set('Monaco', monaco);
        FLAG_DICTIONARY.flagmap.set('Mongolia', mongolia);
        FLAG_DICTIONARY.flagmap.set('Montenegro', montenegro);
        FLAG_DICTIONARY.flagmap.set('Montserrat', montserrat);
        FLAG_DICTIONARY.flagmap.set('Morocco', morocco);
        FLAG_DICTIONARY.flagmap.set('Mozambique', mozambique);
        FLAG_DICTIONARY.flagmap.set('Myanmar', myanmar);
        // N
        FLAG_DICTIONARY.flagmap.set('Namibia', namibia);
        // FLAG_DICTIONARY.flagmap.set('Nato', 'assets/images/flags/nato.png');
        FLAG_DICTIONARY.flagmap.set('Nauru', nauru);
        FLAG_DICTIONARY.flagmap.set('Nepal', nepal);
        FLAG_DICTIONARY.flagmap.set('Netherlands', netherlands);
        FLAG_DICTIONARY.flagmap.set('New Zealand', new_zealand);
        FLAG_DICTIONARY.flagmap.set('Nicaragua', nicaragua);
        FLAG_DICTIONARY.flagmap.set('Niger', niger);
        FLAG_DICTIONARY.flagmap.set('Nigeria', nigeria);
        FLAG_DICTIONARY.flagmap.set('Niue', niue);
        FLAG_DICTIONARY.flagmap.set('Norfolk Island', norfolk_island);
        FLAG_DICTIONARY.flagmap.set('North Korea', north_korea);
        FLAG_DICTIONARY.flagmap.set('Northern Cyprus', northern_cyprus);
        FLAG_DICTIONARY.flagmap.set('Northern Marianas Islands', northern_marianas_islands);
        FLAG_DICTIONARY.flagmap.set('Norway', norway);
        // O
        FLAG_DICTIONARY.flagmap.set('Oman', oman);
        FLAG_DICTIONARY.flagmap.set('Orkney Islands', orkney_islands);
        FLAG_DICTIONARY.flagmap.set('Ossetia', ossetia);
        // P
        FLAG_DICTIONARY.flagmap.set('Pakistan', pakistan);
        FLAG_DICTIONARY.flagmap.set('Palau', palau);
        FLAG_DICTIONARY.flagmap.set('Palestine', palestine);
        FLAG_DICTIONARY.flagmap.set('Panama', panama);
        FLAG_DICTIONARY.flagmap.set('Papua New Guinea', papua_new_guinea);
        FLAG_DICTIONARY.flagmap.set('Paraguay', paraguay);
        FLAG_DICTIONARY.flagmap.set('Peru', peru);
        FLAG_DICTIONARY.flagmap.set('Philippines', philippines);
        FLAG_DICTIONARY.flagmap.set('Pitcairn Islands', pitcairn_islands);
        FLAG_DICTIONARY.flagmap.set('Poland', poland);
        FLAG_DICTIONARY.flagmap.set('Portugal', portugal);
        FLAG_DICTIONARY.flagmap.set('Puerto Rico', puerto_rico);
        // Q
        FLAG_DICTIONARY.flagmap.set('Qatar', qatar);
        // R
        FLAG_DICTIONARY.flagmap.set('Rapa Nui', rapa_nui);
        FLAG_DICTIONARY.flagmap.set('Romania', romania);
        FLAG_DICTIONARY.flagmap.set('Russia', russia);
        FLAG_DICTIONARY.flagmap.set('Rwanda', rwanda);
        // S
        FLAG_DICTIONARY.flagmap.set('Saba Island', saba_island);
        FLAG_DICTIONARY.flagmap.set('Saint Kitts and Nevis', saint_kitts_and_nevis);
        FLAG_DICTIONARY.flagmap.set('Salvador', salvador);
        FLAG_DICTIONARY.flagmap.set('Samoa', samoa);
        FLAG_DICTIONARY.flagmap.set('San Marino', san_marino);
        FLAG_DICTIONARY.flagmap.set('Sao Tome and Principe', sao_tome_and_principe);
        FLAG_DICTIONARY.flagmap.set('Sardinia', sardinia);
        FLAG_DICTIONARY.flagmap.set('Saudi Arabia', saudi_arabia);
        FLAG_DICTIONARY.flagmap.set('Scotland', scotland);
        FLAG_DICTIONARY.flagmap.set('Senegal', senegal);
        FLAG_DICTIONARY.flagmap.set('Serbia', serbia);
        FLAG_DICTIONARY.flagmap.set('Seychelles', seychelles);
        FLAG_DICTIONARY.flagmap.set('Sierra Leone', sierra_leone);
        FLAG_DICTIONARY.flagmap.set('Singapore', singapore);
        FLAG_DICTIONARY.flagmap.set('Sint Eustatius', sint_eustatius);
        FLAG_DICTIONARY.flagmap.set('Sint Maarten', sint_maarten);
        FLAG_DICTIONARY.flagmap.set('Slovakia', slovakia);
        FLAG_DICTIONARY.flagmap.set('Slovenia', slovenia);
        FLAG_DICTIONARY.flagmap.set('Solomon Islands', solomon_islands);
        FLAG_DICTIONARY.flagmap.set('Somalia', somalia);
        FLAG_DICTIONARY.flagmap.set('Somaliland', somaliland);
        FLAG_DICTIONARY.flagmap.set('South Africa', south_africa);
        FLAG_DICTIONARY.flagmap.set('South Korea', south_korea);
        FLAG_DICTIONARY.flagmap.set('South Sudan', south_sudan);
        FLAG_DICTIONARY.flagmap.set('Spain', spain);
        FLAG_DICTIONARY.flagmap.set('Sri Lanka', sri_lanka);
        FLAG_DICTIONARY.flagmap.set('St Barthelemy', st_barthelemy);
        FLAG_DICTIONARY.flagmap.set('St Lucia', st_lucia);
        FLAG_DICTIONARY.flagmap.set('St Vincent and the Grenadines', st_vincent_and_the_grenadines);
        FLAG_DICTIONARY.flagmap.set('Sudan', sudan);
        FLAG_DICTIONARY.flagmap.set('Suriname', suriname);
        FLAG_DICTIONARY.flagmap.set('Swaziland', swaziland);
        FLAG_DICTIONARY.flagmap.set('Sweden', sweden);
        FLAG_DICTIONARY.flagmap.set('Switzerland', switzerland);
        FLAG_DICTIONARY.flagmap.set('Syria', syria);
        // T
        FLAG_DICTIONARY.flagmap.set('Taiwan', taiwan);
        FLAG_DICTIONARY.flagmap.set('Tajikistan', tajikistan);
        FLAG_DICTIONARY.flagmap.set('Tanzania', tanzania);
        FLAG_DICTIONARY.flagmap.set('Thailand', thailand);
        FLAG_DICTIONARY.flagmap.set('Tibet', tibet);
        FLAG_DICTIONARY.flagmap.set('Togo', togo);
        FLAG_DICTIONARY.flagmap.set('Tokelau', tokelau);
        FLAG_DICTIONARY.flagmap.set('Tonga', tonga);
        FLAG_DICTIONARY.flagmap.set('Transnistria', transnistria);
        FLAG_DICTIONARY.flagmap.set('Trinidad and Tobago', trinidad_and_tobago);
        FLAG_DICTIONARY.flagmap.set('Tunisia', tunisia);
        FLAG_DICTIONARY.flagmap.set('Turkey', turkey);
        FLAG_DICTIONARY.flagmap.set('Turkmenistan', turkmenistan);
        FLAG_DICTIONARY.flagmap.set('Turks and Caicos Islands', turks_and_caicos);
        FLAG_DICTIONARY.flagmap.set('Tuvalu', tuvalu);
        // U
        FLAG_DICTIONARY.flagmap.set('Uganda', uganda);
        FLAG_DICTIONARY.flagmap.set('Ukraine', ukraine);
        FLAG_DICTIONARY.flagmap.set('United Arab Emirates', united_arab_emirates);
        FLAG_DICTIONARY.flagmap.set('United Kingdom', united_kingdom);
        FLAG_DICTIONARY.flagmap.set('United Nations', united_nations);
        FLAG_DICTIONARY.flagmap.set('United States of America', united_states_of_america);
        FLAG_DICTIONARY.flagmap.set('Uruguay', uruguay);
        FLAG_DICTIONARY.flagmap.set('Uzbekistan', uzbekistan);
        // V
        FLAG_DICTIONARY.flagmap.set('Vanuatu', vanuatu);
        FLAG_DICTIONARY.flagmap.set('Vatican City', vatican_city);
        FLAG_DICTIONARY.flagmap.set('Venezuela', venezuela);
        FLAG_DICTIONARY.flagmap.set('Vietnam', vietnam);
        FLAG_DICTIONARY.flagmap.set('Virgin Islands', virgin_islands);
        // W
        FLAG_DICTIONARY.flagmap.set('Wales', wales);
        FLAG_DICTIONARY.flagmap.set('Western Sahara', western_sahara);
        // X
        // Y
        FLAG_DICTIONARY.flagmap.set('Yemen', yemen);
        // Z
        FLAG_DICTIONARY.flagmap.set('Zambia', zambia);
        FLAG_DICTIONARY.flagmap.set('Zimbabwe', zimbabwe);
    }
    FLAG_DICTIONARY.prototype.get = function (key) {
        return FLAG_DICTIONARY.flagmap.get(key);
    };
    FLAG_DICTIONARY.prototype.toList = function () {
        var output = [];
        output.push('None');
        for (var _i = 0, _a = Array.from(FLAG_DICTIONARY.flagmap.keys()); _i < _a.length; _i++) {
            var key = _a[_i];
            output.push(key);
        }
        return output;
    };
    FLAG_DICTIONARY.flagmap = new Map();
    FLAG_DICTIONARY.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FLAG_DICTIONARY.ctorParameters = function () { return []; };
    return FLAG_DICTIONARY;
}());
export { FLAG_DICTIONARY };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/dictionary/flag-dictionary.js.map