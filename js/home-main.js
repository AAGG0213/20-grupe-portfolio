// ALL IMPORT

/* header  */
import { Menu } from './components/menu/Menu.js';
import { menuData } from './data/menuData.js';
/* hero  */
/* about  */
/* hobbies  */
import { renderHobbies } from './components/hobbies/renderHobbies.js';
import { hobbiesData } from './data/hobbiesData.js';
/* achievements  */
/* services  */
/* job history  */
/* work expertise  */
/* portfolio  */
/* testimonials  */
/* blog  */
/* hire me banner  */
/* contact me  */
/* footer  */


// CODE EXECUTION

/* header  */
const menu = new Menu(menuData);
menu.init();

/* hero  */
/* about  */
/* hobbies  */
renderHobbies({
    selector: '#hobbies_block',
    data: hobbiesData,
    limit: 12
});

/* achievements  */
/* services  */
/* job history  */
/* work expertise  */
/* portfolio  */
/* testimonials  */
/* blog  */
/* hire me banner  */
/* contact me  */
/* footer  */
