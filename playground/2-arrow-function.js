/* ###################################
 * ###### ARROW FUNCTIONS ############
 * ###################################
 * Takes an input and 
 * returns immediately
 * Implicitly returned
 */

const square = x => x * x;

console.log(square(3));

/* ###############################################
 * ###### ARROW FUNCTIONS - BINDING TO OBJECT ####
 * ###############################################
 */

const event = {
    name: 'party',
    guestlist() { console.log('guest list for ' + this.name) }
}

event.guestlist();

/* ###############################################
 * ###### ARROW FUNCTIONS - FOR EACH ############
 * ###############################################
 */
const eventTwo = {
    name: 'party',
    guest: ['Selena', 'Josephine', 'Ponmani'],
    guestlist() { this.guest.forEach(singleGuest => { console.log('guest list for ' + singleGuest) }) }
}

eventTwo.guestlist();


