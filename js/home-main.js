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
import { Achievements } from './components/achievements/Achievements.js';
import { achievementsData } from './data/achievementsData.js';
/* services  */
/* job history  */
/* work expertise  */
/* portfolio  */
import { Gallery } from './components/gallery/Gallery.js';
import { galleryData } from './data/galleryData.js';
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
const achievements = new Achievements(achievementsData);
achievements.init();

/* services  */
/* job history  */
/* work expertise  */
/* portfolio  */
const gallery = new Gallery({
    selector: '#portfolio_block',
    data: galleryData
});

/* testimonials  */
/* blog  */
/* hire me banner  */
/* contact me  */
/* footer  */
