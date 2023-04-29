// HTML elements

// button start
export const button_start = `<div id="container-button-start">
                                <h1>START</h1>
                                <button type="button" id="button-start__button"></button>
                            </div>`;

// create new traveller function
export function fn_create_new_traveller(person) {
    const traveller = 
    `<div class="container-form-perperson-dynamically" id="${person}">
        <label for="name-${person}">Full Name *</label>
        <input type="text" name="name-${person}" class="required-info form-perperson-inputs" maxlength="50" onfocusin="fn_add_required_attribute(event)" placeholder="${person}">

        <label for="birthdate-${person}">Birth Date *</label>
        <input type="date" name="birthdate-${person}"class="required-info form-perperson-inputs" onfocusin="fn_add_required_attribute(event)">

        <label for="occupation-${person}">Occupation</label>
        <input type="text" name="occupation-${person}" class="form-perperson-inputs" placeholder="${person}...">

        <label for="gender-${person}">Gender *</label>
        <select name="gender-${person}" class="required-info form-perperson-inputs" onfocusin="fn_add_required_attribute(event)">
            <option value="" selected>Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
        </select>

        <label for="dietary-${person}">Dietary Requirements *</label><input list="form-datalist-dietary-${person}" name="dietary-${person}" class="required-info form-perperson-inputs" onfocusin="fn_add_required_attribute(event)" placeholder="double clic to see more">
        <datalist id="form-datalist-dietary-${person}">
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Halal">Halal</option>
            <option value="Kosher">Kosher</option>
            <option value="Allergies">Allergies</option>
        </datalist>

        <label for="special-needs-${person}">Special Needs</label>
        <input type="text" name="special-needs-${person}" class="form-perperson-inputs">                                     
    </div>`;
    return traveller;
}

// Object: how active html options to bring up after changing the how active select element at Travel Preferences
export const cnt_check_how_active_options_html = {
    travel_time: `<label class="travel-info-dynamic-label" for="how-active-travelling-all-time">
                Want to be travelling all the time?
                <input type="checkbox" name="how-active-travelling-all-time">
            </label>`,
    rest_days: `<label class="travel-info-dynamic-label" for="how-active-rest-days">
                Need rest days?
                <input type="checkbox" name="how-active-rest-days">
            </label>`,
    strenuous: `<label class="travel-info-dynamic-label" for="how-active-strenuous">
                Enjoy strenuous activities?
                <input type="checkbox" name="how-active-strenuous">
            </label>`,
    sedentary: `<label class="travel-info-dynamic-label" for="how-active-sedentary">
                Sedentary
                <input type="checkbox" name="how-active-sedentary">
            </label>`
}

// html field for the accommodation step
export const accommodation_options_html = {
    breakfast: `
            <fieldset class="container-accommodation-preference">
                <legend>Breakfast</legend>
                <label for="accommodation-breakfast">Everyday breakfast
                    <input type="checkbox" name="accommodation-breakfast">
                </label>
            </fieldset>`,
    bed: `
            <fieldset class="container-accommodation-preference">
                <legend>Bed</legend>
                <label for="radio-accommodation-bed">
                    Single bed
                    <input type="radio" name="accommodation-bed-single-double" checked>
                    - Double bed
                    <input type="radio" name="accommodation-bed-single-double">
                </label>
            </fieldset>`,
     bathroom: `
            <fieldset class="container-accommodation-preference">
                <legend>Bathroom</legend>
                <label for="radio-accommodation-bathrooms">
                    Private bathroom
                    <input type="radio" name="accommodation-bathrooms-private-share" checked>
                    - Shared bathroom
                    <input type="radio" name="accommodation-bathrooms-private-share">
                </label>
                <label for="number-of-bathrooms">Bathrooms
                    <button type="button" class="number-of-bathrooms">+</button>
                    <input type="text" name="number-of-bathrooms" value="1">
                    <button type="button" class="number-of-bathrooms">-</button>
                </label>
            </fieldset>`,
    room: `
            <fieldset class="container-accommodation-preference">
                <legend>Room</legend>
                <label for="radio-accommodation-bethroom">
                    Single room
                    <input type="radio" name="accommodation-bethroom-sigle-share" checked>
                    - Shared room
                    <input type="radio" name="accommodation-bethroom-sigle-share">
                </label>
                <label for="number-of-rooms">Bethrooms
                    <button type="button" class="number-of-rooms">+</button>
                    <input type="text" name="number-of-rooms" value="1">
                    <button type="button" class="number-of-rooms">-</button>
                </label>
            </fieldset>`,            
    stars: `
            <fieldset class="container-accommodation-preference">
                <legend>Stars</legend>
                <select name="hotel-star" id="accommodation-hotel-stars" class="required-info" onfocusin="fn_add_required_attribute(event)">
                    <option value="5">5 &#x2605;&#x2605;&#x2605;&#x2605;&#x2605;</option>
                    <option value="4">4 &#x2605;&#x2605;&#x2605;&#x2605;</option>
                    <option value="3">3 &#x2605;&#x2605;&#x2605;</option>
                </select>
            </fieldset>`,
    camping: `
            <fieldset class="container-accommodation-preference">
                <legend>Camping</legend>
                <label for="radio-accommodation-camping">
                    Small tent
                    <input type="radio" name="accommodation-camping-small-large" checked>
                    - Large tent
                    <input type="radio" name="accommodation-camping-small-large">
                </label>
                <label for="number-of-tents">Tents
                    <button type="button" class="number-of-tents">+</button>
                    <input type="text" name="number-of-tents" value="1">
                    <button type="button" class="number-of-tents">-</button>
                </label>
            </fieldset>`
}

// html field for the transport method step
export const transport_mode_html = {
    air: `
        <div class="travel-modes-options" id="container-air-mode">
            <label for="Jet">Jet<input type="checkbox" name="Jet" value="Jet"></label>
            <label for="Turbo-prop">Turbo-prop<input type="checkbox" name="Turbo-prop" value="Turbo-prop"></label>
            <label for="Helicopter">Helicopter<input type="checkbox" name="Helicopter" value="Helicopter"></label>
            <label for="Airoplane">Airoplane<input type="checkbox" name="Airoplane" value="Airoplane"></label>
        </div>`,
    land: `
        <div class="travel-modes-options" id="container-land-mode">
            <label for="Car">Car<input type="checkbox" name="Car" value="Car"></label>
            <label for="Motorcycle">Motorcycle<input type="checkbox" name="Motorcycle" value="Motorcycle"></label>
            <label for="Bus">Bus<input type="checkbox" name="Bus" value="Bus"></label>
            <label for="Train">Train<input type="checkbox" name="Train" value="Train"></label>
        </div>`,
    water: `
        <div class="travel-modes-options" id="container-water-mode">
            <fieldset>
                <legend>Boat size</legend>
                <label for="size-boat">
                    Small <input type="radio" name="size-boat-small-large">
                    - Large <input type="radio" name="size-boat-small-large">
                </label>
            </fieldset>
            <label for="Yacht">Yacht<input type="checkbox" name="Yacht" value="Yacht"></label>
            <label for="Sailboat">Sailboat<input type="checkbox" name="Sailboat" value="Sailboat"></label>
            <label for="Motorboat">Motorboat<input type="checkbox" name="Motorboat" value="Motorboat"></label>
            <label for="Ferry">Ferry<input type="checkbox" name="Ferry" value="Ferry"></label>
            <label for="Barge">Barge<input type="checkbox" name="Barge" value="Barge"></label>
        </div>`
}

// CSS style

// Objects that define styles for the step icons when they are active or inactive
export const steps_icons_style = {
    transition: 'all 0.5s',
    transform: 'scale(1.1)',
    boxShadow: '0px 0px 10px #000000',
    border: '1px solid #000000'
}
export const steps_icons_style_reset = {
    transition: 'transform 0.2s',
    transform: 'scale(1)',
    boxShadow: 'none'
}

// Objects that define styles for the start button at the beginning of the app
 export const cnt_btn_start_style_obj = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '100%',
        padding: '4%',
        fontSize: 'min(2rem, 6vw)',
        color: 'black'
    }

 export const cnt_btn_start_child_button = {
        background: 'none',
        backgroundImage: 'url(icons/start-flag.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '80%',
        backgroundPosition: 'center',
        border: 'none',
        borderRadius: '10px',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
        width: 'min(200px, 20vw)',
        height: 'min(200px, 20vw)',
        transition: 'transform 0.1s',
        cursor: 'pointer'
    }