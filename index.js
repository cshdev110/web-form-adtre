// importing variables from vars_html_style.js that are used to create html and style depending on user's choices
import * as html_css_vars from "./js/vars_html_style.js"; 

// -------------------------------------- variables --------------------------------------

// cnt_steps_icons contains the icons which are the steps that are on the left side of the screen
const cnt_steps_icons = document.querySelectorAll('.step-to-form');
let steps_arr_index = 0;

// cnt_containers_form contains the containers of every form step
let cnt_containers_form = document.querySelector('#main-form');

// cnt_container-form-info is where there are the elements that contain the field about the customer's details
const cnt_container_form_info = document.querySelector('#container-form-info');

// cnt_btns_continue are to continue to the next step
const cnt_btns_continue = document.querySelectorAll('.btn-continue');

// cnt_radio_btns_sub_form is the container of the radio buttons at container-form-info-traveling-3-processes
const cnt_radio_btns_sub_form = document.querySelector('#container-form-info-traveling-3-processes');

// cnt_container_form_info_details_fields is where the form to fill in per person will added dynamically
// when a person is added
const cnt_container_form_info_details_fields = document.querySelector('#container-form-info-details-fields');

// input fields to get the number of people that are going to travel
const cnt_number_of_childs = document.querySelector('input[name="number-of-childs"]');
const cnt_number_of_friends = document.querySelector('input[name="number-of-friends"]');

// cnt_budget_min_max cointain the min and max values of the budget
const cnt_budget_min_max = document.querySelectorAll('.preference-budget-input');

// cnt_accommodation_select is to select the type of accommodation at Preferred Accommodation
const cnt_accommodation_select = document.querySelector('#accommodation-select');

// cnt_travel_mode_select is to select the type of travel mode at Preferred Travel Mode
const cnt_travel_mode_select = document.querySelector('#travel-mode');

// cnt_destination_select is to select the destination at Destination
const cnt_destination_select = document.querySelector('#destination-select');

// cnt_environment_checks is to select the environment
const cnt_environment_checks = document.querySelectorAll('.environment-checks');

// to go through the sub forms at container-form-info
let sub_form_idx = 0;

// to go through the forms per person at container-form-info-details-fields. There ara the details about name, birth date, etc.
let form_per_person_idx = 0;

// Buttons for the step up/down or left and right when screen less than 768px
let btn_step_up_normal = document.querySelector('#step-up-normal-screen');
let btn_step_down_normal = document.querySelector('#step-down-normal-screen');

// Flag to make the change of when the screen size is less than 768px or more than 768px only once
// when it crosses the 768px
let flag_screen_event_size = false;

// Objects: traveller_obj contains the number of people that are going to travel
let traveller_obj_old = {
    Partner: 0,
    Child: 0,
    Friend: 0
}
let traveller_obj_new = {
    Partner: 0,
    Child: 0,
    Friend: 0
}

// Variable interval to manage the animation of the media transport going over the logo.
// This happens when the user chooose a way of transport
let anima_transport_inter = null;

// Variable to manage the animation keeps working after resizing
let anima_transport_inter_resize = null;

// -------------------------------------- function to initialise --------------------------------------
function fn_start() {
    // Deactivating step icons until the start button is clicked
    cnt_steps_icons.forEach(el => {
        el.style.pointerEvents = 'none';
        el.style.filter = 'opacity(10%)';
    });

    // Hidding the container-form and the step up/down buttons after button start is clicked
    let btn_step_up_down = document.querySelectorAll('.step-up-down');
    let section_form_seciton = document.querySelector('#form-section');

    btn_step_up_down.forEach(el => el.style.display = 'none');
    cnt_containers_form.style.display = 'none';

    section_form_seciton.style.flexDirection = 'column';

    cnt_radio_btns_sub_form.children[0].checked = true;

    // Creating and styling the container for the start button at the beginnig
    // After clicking on that button, welcome message will be displayed and the start container will be removed.
    document.querySelector('#form-section').insertAdjacentHTML('beforeend', html_css_vars.button_start);

    const cnt_btn_start = document.querySelector('#container-button-start');

    Object.assign(cnt_btn_start.style, html_css_vars.cnt_btn_start_style_obj);

    Object.assign(cnt_btn_start.querySelector('button').style, html_css_vars.cnt_btn_start_child_button);

    // Actions for the start button
    cnt_btn_start.querySelector('#button-start__button').addEventListener('mouseover', () => {
        cnt_btn_start.querySelector('#button-start__button').style.transform = 'scale(1.1)';
    });
    cnt_btn_start.querySelector('#button-start__button').addEventListener('mouseout', () => {
        cnt_btn_start.querySelector('#button-start__button').style.transform = 'scale(1)';
    });
    cnt_btn_start.querySelector('#button-start__button').addEventListener('mousedown', () => {
        cnt_btn_start.querySelector('#button-start__button').style.transform = 'scale(1.2)';
    });

////// for the sake of the test ///////////////////////////////////////////////////////
    // cnt_btn_start.querySelector('#button-start__button').addEventListener('mouseup', () => {
    cnt_btn_start.querySelector('#button-start__button').addEventListener('click', () => {
        cnt_btn_start.style.display = 'none';

        btn_step_up_down.forEach((el) => el.style.display = 'block');
        cnt_containers_form.style.display = 'flex';
        section_form_seciton.style.flexDirection = 'row';

        // Activating the first step icon after the start button is clicked
        cnt_steps_icons.forEach((el, idx) => {
            if (idx === 0)
                el.style.pointerEvents = 'auto';
            el.style.filter = 'opacity(100%)';
        });

        // Stalying the first step icon
/////// for the sake of the test ///////////////////////////////////////////////////////
        // steps_arr_index = 1; 
        // sub_form_idx = 1;
        fn_sub_container_manager(sub_form_idx)


        fn_steps_state_active(steps_arr_index);

        // Displaying at first container-form children 1
        fn_container_manager(steps_arr_index);

        fn_check_screen_event_size();

    });

////// for the sake of the test ///////////////////////////////////////////////////////
    cnt_btn_start.querySelector('#button-start__button').click();
}

// ************************************** main functions **************************************

// To move the left button to the bottom next to the right button
// Also, arrange the container-form-info's children to slide from left to right or from up  to down
// when the screen size is less than 768px or more than 768px respectively
function fn_check_screen_event_size() {
    if (window.innerWidth <= 768 && !flag_screen_event_size) {
        flag_screen_event_size = true;
        btn_step_down_normal.before(btn_step_up_normal);
        Array.from(cnt_containers_form.children).forEach((el, idx) => {
            if (idx !== steps_arr_index){
                el.style.removeProperty('top');
                el.style.left = '0%';
            }
        });
        // It arranges from the beginning step to the current step
        steps_arr_index = fn_container_steps_manager_control(steps_arr_index, 0);
        // It arranges from the last step to the current step
        steps_arr_index = fn_container_steps_manager_control(steps_arr_index, cnt_containers_form.children.length - 1);
    }
    else if (window.innerWidth > 768 && flag_screen_event_size) {
        flag_screen_event_size = false;
        cnt_containers_form.before(btn_step_up_normal);
        Array.from(cnt_containers_form.children).forEach((el, idx) => {
            if (idx !== steps_arr_index){
                el.style.removeProperty('left');
                el.style.top = '0%';
            }
        });
        // It arranges from the beginning step to the current step
        steps_arr_index = fn_container_steps_manager_control(steps_arr_index, 0);
        // It arranges from the last step to the current step
        steps_arr_index = fn_container_steps_manager_control(steps_arr_index, cnt_containers_form.children.length - 1);
    }

    // update the animation transport event
    if (anima_transport_inter_resize !== ''){
        fn_animation_transports_event(anima_transport_inter_resize);
    }
}

// to style the step icons when they are active or inactive
function fn_steps_state_active(step_index) {
    Object.assign(cnt_steps_icons[step_index].style, html_css_vars.steps_icons_style);
}

function fn_steps_state_deactive(step_index) {
    Object.assign(cnt_steps_icons[step_index].style, html_css_vars.steps_icons_style_reset);
}

// to display the form dynamically
function fn_container_manager(step_index) {
    cnt_containers_form.children[step_index].style.visibility = 'visible';
    (window.innerWidth <= 768) ?
        cnt_containers_form.children[step_index].style.left = '0%' :
        cnt_containers_form.children[step_index].style.top = '0%';
}
function fn_container_manager_hide_up_or_left(step_index) {
    cnt_containers_form.children[step_index].style.visibility = 'hidden';
    (window.innerWidth <= 768) ?
        cnt_containers_form.children[step_index].style.left = '-100%' :
        cnt_containers_form.children[step_index].style.top = '-100%';
}
function fn_container_manager_hide_down_or_right(step_index) {
    cnt_containers_form.children[step_index].style.visibility = 'hidden';
    (window.innerWidth <= 768) ?
        cnt_containers_form.children[step_index].style.left = '100%' :
        cnt_containers_form.children[step_index].style.top = '100%';
}

// to control the step icons and the form's childrens
// This rearrange the steps form at every click on steps to keep on sliding in a consistent direction: 
// up or down, down or up, left or right, right or left
function fn_container_steps_manager_control(step_selected, step_index) {
    let steps_crossed = step_selected - step_index;

    fn_steps_state_active(step_selected);
    fn_steps_state_deactive(step_index);
    fn_container_manager(step_selected);
    for (let i = 0; i < Math.abs(steps_crossed); i++) {
        if (steps_crossed > 0) {
            fn_container_manager_hide_up_or_left(step_index++);
        }
        else {
            fn_container_manager_hide_down_or_right(step_index--);
        }   
    }
    // enable next step
    if (cnt_steps_icons[step_selected].style.pointerEvents === 'none') {
        cnt_steps_icons[step_selected].style.pointerEvents = 'auto';
    }
    
    return step_index;
}

// Shift steps forward while checking the form's inputs
function fn_shift_steps_forward(steps_index, sub_steps_index) {
    if (steps_index !== 1) {
        steps_index = fn_container_steps_manager_control(steps_index + 1, steps_index);
    }
    else if (steps_index === 1 && sub_steps_index < 2) {
        fn_sub_container_manager(++sub_steps_index);
    }
    else {
        steps_index = fn_container_steps_manager_control(steps_index + 1, steps_index);
    }
    return [steps_index, sub_steps_index];
}

// to display the sub form dynamically
function fn_sub_container_manager(form_idx) {
    cnt_container_form_info.children[0].style.left = (form_idx * -100) + '%';
    cnt_container_form_info.children[1].style.left = (form_idx * -100 + 100) + '%';
    cnt_container_form_info.children[2].style.left = (form_idx * -100 + 200) + '%';
    cnt_radio_btns_sub_form.children[form_idx].checked = true;
}

// Obejct comparation
function fn_compare_obj(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// add new travellers form to the DOM
function fn_add_new_traveller_form(list_travellers) {
    Object.keys(list_travellers).forEach(key => {
        for (let i = 0; i < list_travellers[key]; i++) {
            cnt_container_form_info_details_fields.insertAdjacentHTML('beforeend', html_css_vars.fn_create_new_traveller(key));
        }
    });
}

// Add or remove travellers form from the DOM
function fn_add_or_remove_traveller_form(list_old, list_new) {
    Object.keys(list_old).forEach(key => {
        if (list_old[key] > list_new[key]) {
            for (let i = 0; i < list_old[key] - list_new[key]; i++) {
                Array.from(cnt_container_form_info_details_fields.children).forEach(child => {
                    // (list_old[key]-i) to remove starting from the last one
                    if (child.id === `${key+'-'+(list_old[key]-i)}`) {
                        child.remove();
                    }
                });
            }
        }
        else if (list_old[key] < list_new[key]) {
            for (let i = 0; i < list_new[key] - list_old[key]; i++) {
                // i+1 because the index starts at 0 and the first traveller is 1.
                // When creating a new form for a new person, the form will have the id (partner-1 or child-1 or friend-1)
                cnt_container_form_info_details_fields.insertAdjacentHTML('beforeend', html_css_vars.fn_create_new_traveller(key+'-'+(list_old[key]+i+1)));
            }
        }
    });
}

// Filter the formulary's inputs plus block the next step if the inputs are not valid
function fn_check_inputs(steps_index, sub_steps_index = 1, final_check = false) {
    if (steps_index === 0) {
        // just the first step
        return true;
    }
    else if (steps_index === 1 && sub_steps_index === 0) {   
        //  check number of travellers
        traveller_obj_new.Partner = (document.querySelector('input[name="partner-traveling"]:checked')) ? 1 : 0;
        traveller_obj_new.Child = (document.querySelector('input[name="child-traveling"]:checked')) ? Number(cnt_number_of_childs.value) : 0;
        traveller_obj_new.Friend = (document.querySelector('input[name="friend-traveling"]:checked')) ? Number(cnt_number_of_friends.value) : 0;

        if (!fn_compare_obj(traveller_obj_old, traveller_obj_new)) {
            try{
                form_per_person_idx = fn_nav_dynamic_forms_pp(form_per_person_idx, 0);
            }catch(err){}

            fn_add_or_remove_traveller_form(traveller_obj_old, traveller_obj_new);

            Object.keys(traveller_obj_new).forEach(key => traveller_obj_old[key] = traveller_obj_new[key]);

            // Inserting values to the summary
            document.querySelector('#summary-partner').innerHTML = (traveller_obj_new.Partner === 1) ? '&heartsuit;' : 0;
            document.querySelector('#summary-childs').textContent = traveller_obj_new.Child;
            document.querySelector('#summary-friends').textContent = traveller_obj_new.Friend;
        }

        return true;
    }
    else if (steps_index === 1 && (sub_steps_index === 1 || sub_steps_index === 2)) {
        // check travellers details
        let value_return = true;
        const temp_container_form_perperson_dynamically = document.querySelectorAll('.container-form-perperson-dynamically');

        try{
            document.querySelector('#wrong-birthday').remove();
        }catch(err){}
        try{
            document.querySelector('#wrong-date').remove();
        }catch(err){}

        temp_container_form_perperson_dynamically.forEach((parent, idx) => {
            parent.querySelectorAll('.required-info').forEach(elem => {
                if (elem.value === '' && value_return === true) {
                    if (sub_steps_index === 2){
                        fn_sub_container_manager(sub_form_idx = --sub_steps_index);
                    }

                    form_per_person_idx = fn_nav_dynamic_forms_pp(form_per_person_idx, idx);
                    elem.focus();
                    value_return = false;
                }
                // Validation of email
                else if (elem.getAttribute('type') === 'email' && value_return === true || elem.validity.valid === false) {
                    if (elem.value.length < 5) {
                        elem.setCustomValidity('Please enter a valid email address:example@mail.com');

                        form_per_person_idx = fn_nav_dynamic_forms_pp(form_per_person_idx, idx);
                        elem.focus();
                        value_return = false;
                    }
                    else {
                        elem.setCustomValidity('');
                    }
                }
                // Validation of phone number
                else if (elem.getAttribute('type') === 'tel' && value_return === true || elem.validity.valid === false) {
                    if (elem.value.length < 12) {

                        elem.setCustomValidity('Please enter a valid phone number: 0000-000-000');

                        form_per_person_idx = fn_nav_dynamic_forms_pp(form_per_person_idx, idx);
                        elem.focus();
                        value_return = false;
                    }
                    else {
                        elem.setCustomValidity('');
                    }
                }
                // Validation of birthday
                else if (elem.getAttribute('type') === 'date' && value_return === true) {
                    let back_100_years = (new Date()).getFullYear() - 122;
                    let input_birthday = new Date(elem.value);
                    
                    // A birthday must not be less than 122 years before current day. 122 because the oldest person in the world lived 122 years.
                    if (back_100_years > input_birthday.getFullYear() || input_birthday.toLocaleString() > new Date().toLocaleString()) {

                        let wrong_birthday = `<p id="wrong-birthday">The bithday between ${back_100_years} and less than current date*</p>`;

                        document.querySelector('#title-personal-information').insertAdjacentHTML('afterend', wrong_birthday);

                        form_per_person_idx = fn_nav_dynamic_forms_pp(form_per_person_idx, idx);
                        elem.value = '';
                        elem.focus();
                        value_return = false;
                    }
                }
            });
        });

        // check travel preference
        const temp_travel_preference_required_info = document.querySelector('#container-form-info-travel-preference').querySelectorAll('.required-info');
        if (value_return) {
            temp_travel_preference_required_info.forEach((elem, idx) => {
                if (elem.value === '' && value_return === true && sub_steps_index === 2) {
                    elem.focus();
                    value_return = false;
                }
                // Validation of preference date travel
                else if (elem.getAttribute('type') === 'date' && value_return === true) {
                    let current_date = new Date();
                    let input_date = new Date(elem.value);
                    
                    // Must be greater than the current date
                    if (current_date >= input_date) {
                        let wrong_date = `<p id="wrong-date">The preference travel date cannot be before ${current_date.toLocaleDateString()} *</p>`;
                        document.querySelector('#title-travel-preference').insertAdjacentHTML('afterend', wrong_date);
                        form_per_person_idx = fn_nav_dynamic_forms_pp(form_per_person_idx, idx);
                        elem.value = '';
                        elem.focus();
                        value_return = false;
                    }
                }
                // Inserting values to the summary
                if (value_return) {
                    switch(elem.getAttribute('name')) {
                        case 'preference-date':
                            document.querySelector('#summary-calender').textContent = elem.value;
                            break;
                        case 'budget':
                            document.querySelector('#summary-budget').textContent = elem.value;
                            break;
                        case 'active':
                            document.querySelector('#summary-active').textContent = elem.value;
                            break;
                        default:
                            break;
                    }
                }
            });                
        }
        
        // send the user back to where the wrong input is
        if (final_check && !value_return) {
            steps_arr_index = fn_container_steps_manager_control(steps_index, steps_arr_index);
            fn_sub_container_manager(sub_form_idx);
        }
        
        return value_return;
    }
    else if (steps_index === 2) {
        // check accommodation
        if (cnt_accommodation_select.value === '') {

            if (final_check) {
                steps_arr_index = fn_container_steps_manager_control(steps_index, steps_arr_index);
            }

            cnt_accommodation_select.focus();
            return false;
        }
        else {
            document.querySelector('#summary-accommodation').textContent = cnt_accommodation_select.value;
            return true;
        }
    }
    else if (steps_index === 3) {
        // check transport
        if (cnt_travel_mode_select.value === '') {

            if (final_check) {
                steps_arr_index = fn_container_steps_manager_control(steps_index, steps_arr_index);
            }

            cnt_travel_mode_select.focus();
            return false;
        }
        else {
            document.querySelector("#summary-transport").textContent = cnt_travel_mode_select.value;
            return true;
        }
    }

    else if (steps_index === 4) {
        // check environment
        let envirionment_chosen = '';
        let how_many_checked = 0;
        cnt_environment_checks.forEach(elem => {
            if (elem.checked) {
                how_many_checked++;
                envirionment_chosen = elem.getAttribute('name');
            }
            else if (elem.value !== '' && elem.getAttribute('type') === 'text') {
                how_many_checked++;
                envirionment_chosen = elem.value;
            }
        });

        try{
            document.querySelector('#required-environment').remove();
        }catch(err){}
        
        if (how_many_checked > 1) {
            document.querySelector('#summary-environment').textContent = 'Mixed';
            return true;

        }
        else if (how_many_checked === 1) {
            document.querySelector('#summary-environment').textContent = envirionment_chosen;
            return true;

        }
        else {
            if (final_check) {
                steps_arr_index = fn_container_steps_manager_control(steps_index, steps_arr_index);
            }
            // show a message to let the user know that he must choose at least one option
            const temp_required_environment = `<p id="required-environment">*Please choose one option</p>`;
            document.querySelector('#container-form-info-travel-environment').children[0].insertAdjacentHTML('afterend', temp_required_environment);
        }

    }
    else if (steps_index === 5) {
        // check desitnation
        if (cnt_destination_select.value === '') {

            if (final_check) {
                steps_arr_index = fn_container_steps_manager_control(steps_index, steps_arr_index);
            }

            cnt_destination_select.focus();
            return false;
        }
        else {
            document.querySelector('#summary-location').textContent = cnt_destination_select.value;
            return true;
        }
    }
}

// Add required attribute to the inputs
function fn_add_required_attribute(elem) {
    elem.target.setAttribute('required', '');
}

window.fn_add_required_attribute = fn_add_required_attribute;

// function to filter number in the fields Traveling childs and Traveling Friends. Second step
// allowing only two digits number
function fn_filter_number_travellers(elm) {
    if (!(/^[0-9]{1,2}$/.test(elm.target.value) && (elm.target.value >= '1') && (elm.target.value <= '30'))) {
        elm.target.value = /(?:[0-9]{1,2})/.exec(elm.target.value);
        if (elm.target.value > 30) {elm.target.value = 30};
        if (elm.target.value === '0') {elm.target.value = 1};
    }
}

// Navigate between the dynamic forms per person such as partner, child and friend
function fn_nav_dynamic_forms_pp(idx, direction) {
    let temp_container_form_perperson = document.querySelectorAll('.container-form-perperson-dynamically');
    if (direction >= 0 && direction <= temp_container_form_perperson.length - 1) {
        temp_container_form_perperson[idx].style.display = 'none';        
        temp_container_form_perperson[direction].style.display = 'grid';
        document.querySelector('#title-form-per-person').textContent = temp_container_form_perperson[direction].id.replace('Partner-1', 'Partner');
        return direction;
    }
    return idx;
}

// Function to animate the transport icons over the logo after the user select the preferred mode of transport
function fn_animation_transports_event(mode_transport) {
    try{
        // Remove the elements air, land or water created when the html 'select' element is change. "html_css_vars.transport_mode_html.<air, land, water>"
        document.querySelectorAll('.travel-modes-options').forEach(elm => elm.remove());
        clearInterval(anima_transport_inter);
    } catch(err){}

    switch(mode_transport) {
        case '':
            clearInterval(anima_transport_inter);
            break;
        case 'Air':
            document.querySelector('label[for="travel-mode"]').insertAdjacentHTML('afterend', html_css_vars.transport_mode_html.air);
            fn_animation_transports('../icons/plane.png', '.8s', '1300');
            break;
        case 'Land':
            document.querySelector('label[for="travel-mode"]').insertAdjacentHTML('afterend', html_css_vars.transport_mode_html.land);
            fn_animation_transports('../icons/bus.png', '1.2s', '2000');
            break;
        case 'Water':
            document.querySelector('label[for="travel-mode"]').insertAdjacentHTML('afterend', html_css_vars.transport_mode_html.water);
            fn_animation_transports('../icons/boat.png', '2.0s', '2500');
            break;
        default:
    }
}

// transport animation over the logo when a user chooses a mode of transport
function fn_animation_transports(url_icon, time_interval, time_transition) {

    const transport_over = document.querySelector('#transport-animation-on-logo');
    transport_over.style.backgroundImage = `url(${url_icon})`;

    let width_logo = document.querySelector('#container-globe-ani').offsetWidth - 20;
    let radio_logo = width_logo / 2;

    let x_log = document.querySelector('#container-globe-ani').offsetLeft;
    let y_log = document.querySelector('#container-globe-ani').offsetTop;

    anima_transport_inter = setInterval(frames, time_transition);

    function frames() {

        // Choosing randomly where transport icon will start
        let x_origin = Math.floor(Math.random() * radio_logo) + 1;
        let x_angle = radio_logo - x_origin;

        let y_angle = Math.floor(Math.sqrt(Math.pow(radio_logo, 2) - Math.pow(x_angle, 2)));
        let y_origin = radio_logo - y_angle;
        
        // to shift to another quadrant randomly
        let left_or_rigth = Math.floor(Math.random() * 2);
        let up_or_down = Math.floor(Math.random() * 2);

        if (left_or_rigth === 1) {
            x_origin = width_logo - x_origin;
        }

        if (up_or_down === 1) {
            y_origin = width_logo - y_origin;
        }
 
        let x_end = width_logo - x_origin;
        let y_end = width_logo - y_origin;

        // Calculate the angle of how the transport icon will start
        let transport_angle = Math.floor(Math.asin(y_angle/radio_logo) * 180 / Math.PI);

        if (x_origin >= radio_logo && y_origin < radio_logo) {
            transport_angle = 90 - transport_angle;
        }
        else if (x_origin >= radio_logo && y_origin >= radio_logo) {
            transport_angle = transport_angle + 90;
        }
        else if (x_origin < radio_logo && y_origin >= radio_logo) {
            transport_angle = 270 - transport_angle;
        }
        else if (x_origin < radio_logo && y_origin < radio_logo) {
            transport_angle = transport_angle + 270;
        }

        // Posionate the icon
        transport_over.style.transition = 'none';
        transport_over.style.visibility = 'visible';
        transport_over.style.left = (x_origin) + 'px';
        transport_over.style.top = (y_origin) + 'px';
        transport_over.style.transform = `rotate(${transport_angle}deg)`;

        // start ani
        setTimeout(() => {
            transport_over.style.transition = `all ease-in-out ${time_interval}`;
            transport_over.style.left = x_end + 'px';
            transport_over.style.top = y_end + 'px';
        }, 1);

        setTimeout(() => {
            transport_over.style.visibility = 'hidden';
        }, 10);
    }
}

async function fn_validate_after_submit() {
    let form_valid = true;
    const go_through_all_required_steps = [1, 2, 3, 4, 5];
    go_through_all_required_steps.forEach(step => {
        if (form_valid) {
            if (step === 1) {
                if (!fn_check_inputs(step, sub_form_idx = 1, true)) {
                    form_valid = false;
                }
                else if (!fn_check_inputs(step, sub_form_idx = 2, true)) {
                    form_valid = false;
                }
            }
            else if (step === 2) {
                if (!fn_check_inputs(step, 0, true)) {
                    form_valid = false;
                }
            }
            else if (step === 3) {
                if (!fn_check_inputs(step, 0, true)) {
                    form_valid = false;
                }
            }
            else if (step === 4) {
                if (!fn_check_inputs(step, 0, true)) {
                    form_valid = false;
                }
            }
            else if (step === 5) {
                if (!fn_check_inputs(step, 0, true)) {
                    form_valid = false;
                }
            }
        }
    });
    if (form_valid) {
        return 'Thank you for submitting your information. You can see the summary in the next page';
    }
    else {
        throw 'Please, fill the missing fields';
    }
}

// ************************************** end main functions **************************************

// ************************************** events **************************************
// screen event size. It is used to move the left button to the bottom next to the right button
// and to arrange the container-form-info's children to slide from left to right or from up  to down
window.addEventListener('resize', () => {
    fn_check_screen_event_size();
});

// icons on the left to navigate between the steps
cnt_steps_icons.forEach((elm, idx) => {
    elm.addEventListener('click', () => {
        if (idx > steps_arr_index) {
            steps_arr_index = fn_container_steps_manager_control(idx, steps_arr_index);
        }
        else if (idx < steps_arr_index) {
            steps_arr_index = fn_container_steps_manager_control(idx, steps_arr_index);
        }
    });
});

// Buttons on left and right of the form. They are used to navigate between the steps
btn_step_up_normal.addEventListener('click', () => {
    if (steps_arr_index > 0) {
        if (steps_arr_index !== 1) {
            steps_arr_index = fn_container_steps_manager_control(steps_arr_index - 1, steps_arr_index);
        }
        else if (steps_arr_index === 1 && sub_form_idx > 0) {
            fn_sub_container_manager(--sub_form_idx);
        }
        else {
            steps_arr_index = fn_container_steps_manager_control(steps_arr_index - 1, steps_arr_index);
        }
    }
});

btn_step_down_normal.addEventListener('click', () => {
    if (steps_arr_index < cnt_steps_icons.length - 1) {
        if (fn_check_inputs(steps_arr_index, sub_form_idx)) {
            [steps_arr_index, sub_form_idx] = fn_shift_steps_forward(steps_arr_index, sub_form_idx);
        }
    }
});

// The blue buttons Continue. When pressed, form are shifted to the right
cnt_btns_continue.forEach(elem => {
    elem.addEventListener('click', () => {
        if (fn_check_inputs(steps_arr_index, sub_form_idx)) {
            [steps_arr_index, sub_form_idx] = fn_shift_steps_forward(steps_arr_index, sub_form_idx);
        }
    });
});

// radio buttons to change the sub form dynamically from lelt to right
Array.from(cnt_radio_btns_sub_form.children).forEach(radio_btn => {
    radio_btn.addEventListener('click', () => {
        if (fn_check_inputs(steps_arr_index, sub_form_idx)) {
            fn_sub_container_manager(sub_form_idx = Number(radio_btn.value));
        }
        else {
            cnt_radio_btns_sub_form.children[sub_form_idx].checked = true;
        }
    });
});

// form events: Travellers
// Checkbox to add child
document.querySelector('input[name="child-traveling').addEventListener('click', (evt) => {
    if (evt.target.checked) {
        cnt_number_of_childs.value = 1;
    }
    else {
        cnt_number_of_childs.value = 0;
    }
});
// Checkbox to add friend
document.querySelector('input[name="friend-traveling').addEventListener('click', (evt) => {
    if (evt.target.checked) {
        cnt_number_of_friends.value = 1;
    }
    else {
        cnt_number_of_friends.value = 0;
    }
});

// Increase or decrease the number of childs
document.querySelectorAll('.number-of-childs').forEach((elm, idx) => {
    if (idx === 0) {
        elm.addEventListener('click', () => {
            if (cnt_number_of_childs.value < 30) {
                cnt_number_of_childs.value++;
            }
        });
    }
    else {
        elm.addEventListener('click', () => {
            if (cnt_number_of_childs.value > 0) {
                cnt_number_of_childs.value--;
            }
        });
    }
});
// Increae or decrease the number of friends
document.querySelectorAll('.number-of-friends').forEach((elm, idx) => {
    if (idx === 0) {
        elm.addEventListener('click', () => {
            if (cnt_number_of_friends.value < 30) {
                cnt_number_of_friends.value++;
            }
        });
    }
    else {
        elm.addEventListener('click', () => {
            if (cnt_number_of_friends.value > 0) {
                cnt_number_of_friends.value--;
            }
        });
    }
});

// Directly enter the number of childs or friends
cnt_number_of_childs.addEventListener('keyup', (evt) => {
    fn_filter_number_travellers(evt);
});

cnt_number_of_friends.addEventListener('keyup', (evt) => {
    fn_filter_number_travellers(evt);
});

// Filfering name. Only letters, dots and spaces are allowed
document.querySelector('#name-traveller-input').addEventListener('keyup', (evt) => {
    evt.target.value = /(?:[a-zA-Z.\s]+)/.exec(evt.target.value);
});

// Filtering the email
document.querySelector('#email-traveller-input').addEventListener('keyup', (evt) => {
    evt.target.value = /(?:^[a-zA-Z0-9._-]*[@]{0,1}[a-zA-Z0-9.-]*[\.]{0,1}[a-zA-Z]{0,4})/g.exec(evt.target.value);
});

// Filtering the phone number
document.querySelector('#phone-traveller-input').addEventListener('keyup', (evt) => {
    evt.target.value = /(?:^[0-9]{0,4}[-]{0,1}[0-9]{0,3}[-]{0,1}[0-9]{0,3}$)/g.exec(evt.target.value);
    evt.target.value = evt.target.value.replace(/-/g, '');
    for (let i = 0; i < evt.target.value.length; i++) {
        if (i === 4) {
            evt.target.value = evt.target.value.slice(0, 4) + '-' + evt.target.value.slice(4);
        }    
        else if (i === 8) {
            evt.target.value = evt.target.value.slice(0, 8) + '-' + evt.target.value.slice(8);
        }
    }
});

// filtering the budget input. Only numbers are allowed
cnt_budget_min_max.forEach(budget_ele => {
    budget_ele.addEventListener('keyup', (evt) => {
        evt.target.value = /(?:[0-9]+)/.exec(evt.target.value);
    });
});

// format the currency in the budget input to dollar.
// Also, if the min budget is greater than the max budget, the max budget is increased by 1
// and opposite if the max budget is less than the min budget
cnt_budget_min_max.forEach((budget_ele, idx) => {
    
    if (idx === 0) {
        budget_ele.addEventListener('focusout', evt => {
            if (Number(evt.target.value.replace(/[\$,]/g, '')) > Number(cnt_budget_min_max[1].value.replace(/[\$,]/g, ''))) {
                cnt_budget_min_max[1].value = (Number(evt.target.value) + 1).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0});
            }
            
            evt.target.value = Number(evt.target.value.replace(/[\$,]/g, '')).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0});
            evt.target.value = (evt.target.value === '$NaN' || evt.target.value === '$0') ? '' : evt.target.value;
        });
    }
    else if (idx === 1) {
        budget_ele.addEventListener('focusout', evt => {
            if (Number(evt.target.value.replace(/[\$,]/g, '')) < Number(cnt_budget_min_max[0].value.replace(/[\$,]/g, ''))) {
                cnt_budget_min_max[0].value = (Number(evt.target.value) - 1).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0});
            }

            evt.target.value = Number(evt.target.value.replace(/[\$,]/g, '')).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0});
            evt.target.value = (evt.target.value === '$NaN' || evt.target.value === '$0') ? '' : evt.target.value;
        });
    }
});

// Dynamically bring up the options when user selects the type of accommodation
cnt_accommodation_select.addEventListener('change', (evt) => {
    try{
        const temp_container_accommodation_preference = document.querySelectorAll('.container-accommodation-preference');
        if (temp_container_accommodation_preference !== 0) {
            temp_container_accommodation_preference.forEach(elm => {
                elm.remove();
            });
        }
    } catch (err){}
    
    switch(evt.target.value){
        case 'Hotel':
            Object.keys(html_css_vars.accommodation_options_html).forEach(key => {
                if (key !== 'camping') {
                    evt.target.insertAdjacentHTML('afterend', html_css_vars.accommodation_options_html[key]);
                }
            });
            nest_fn_set_up_event_new_elements();
            break;

        case 'Motel':
        case 'Airbnb':
            Object.keys(html_css_vars.accommodation_options_html).forEach(key => {
                if (key !== 'stars' && key !== 'camping') {
                    evt.target.insertAdjacentHTML('afterend', html_css_vars.accommodation_options_html[key]);
                }
            });
            nest_fn_set_up_event_new_elements();
            break;

        case 'Student':
            evt.target.insertAdjacentHTML('afterend', html_css_vars.accommodation_options_html['breakfast']);
            evt.target.insertAdjacentHTML('afterend', html_css_vars.accommodation_options_html['bathroom']);
            document.querySelector('label[for="number-of-bathrooms"]').remove();
            nest_fn_set_up_event_new_elements();
            break;

        case 'Backpacker':
            evt.target.insertAdjacentHTML('afterend', html_css_vars.accommodation_options_html['breakfast']);
            break;

        case 'Camping':
            evt.target.insertAdjacentHTML('afterend', html_css_vars.accommodation_options_html['camping']);
            nest_fn_set_up_event_new_elements();
            break;

        default:
            break;
    }

    function nest_fn_set_up_event_new_elements(){
        try{
            // input fields to get the number of rooms
            const cnt_number_of_rooms = document.querySelector('input[name="number-of-rooms"]');

            // Directly enter the number of rooms
            cnt_number_of_rooms.addEventListener('keyup', (evt) => {
                fn_filter_number_travellers(evt);
            });

            // Increae or decrease the number of rooms
            document.querySelectorAll('.number-of-rooms').forEach((elm, idx) => {
                if (idx === 0) {
                    elm.addEventListener('click', () => {
                        if (cnt_number_of_rooms.value < 30) {
                            cnt_number_of_rooms.value++;
                        }
                    });
                }
                else {
                    elm.addEventListener('click', () => {
                        if (cnt_number_of_rooms.value > 0) {
                            cnt_number_of_rooms.value--;
                        }
                    });
                }
            });
        } catch (err) {}

        try{
            // input fields to get the number of bethrooms
            const cnt_number_of_bathrooms = document.querySelector('input[name="number-of-bathrooms"]');

            // Directly enter the number of bathrooms
            cnt_number_of_bathrooms.addEventListener('keyup', (evt) => {
                fn_filter_number_travellers(evt);
            });

            // Increae or decrease the number of bathrooms
            document.querySelectorAll('.number-of-bathrooms').forEach((elm, idx) => {
                if (idx === 0) {
                    elm.addEventListener('click', () => {
                        if (cnt_number_of_bathrooms.value < 30) {
                            cnt_number_of_bathrooms.value++;
                        }
                    });
                }
                else {
                    elm.addEventListener('click', () => {
                        if (cnt_number_of_bathrooms.value > 0) {
                            cnt_number_of_bathrooms.value--;
                        }
                    });
                }
            });
        } catch (err) {}

        try{
            // input fields to get the number of tents
            const cnt_number_of_tents = document.querySelector('input[name="number-of-tents"]');

            // Directly enter the number of tents
            cnt_number_of_tents.addEventListener('keyup', (evt) => {
                fn_filter_number_travellers(evt);
            });

            // Increae or decrease the number of tents
            document.querySelectorAll('.number-of-tents').forEach((elm, idx) => {
                if (idx === 0) {
                    elm.addEventListener('click', () => {
                        if (cnt_number_of_tents.value < 30) {
                            cnt_number_of_tents.value++;
                        }
                    });
                }
                else {
                    elm.addEventListener('click', () => {
                        if (cnt_number_of_tents.value > 0) {
                            cnt_number_of_tents.value--;
                        }
                    });
                }
            });
        } catch (err) {}
    }
});

// Buttons to shift the forms per person. This is the form where are the fields like name, birthdate, etc
document.querySelector('#left-form-per-person').addEventListener('click', () => {
    form_per_person_idx = fn_nav_dynamic_forms_pp(form_per_person_idx, form_per_person_idx - 1);
});

document.querySelector('#right-form-per-person').addEventListener('click', () => {
    form_per_person_idx = fn_nav_dynamic_forms_pp(form_per_person_idx, form_per_person_idx + 1);
});

// 'how active' event. At travel preferences, bring up choices depending on the selected option
document.querySelector('#how-active-select').addEventListener('change', (evtSelect) => {
    let tem_travel_info_dynamic_label = document.querySelectorAll('.travel-info-dynamic-label');
    tem_travel_info_dynamic_label.forEach(elm => elm.remove());

    if (evtSelect.target.value === 'High') {
        document.querySelector('#how-actie-options').insertAdjacentHTML('afterend', html_css_vars.cnt_check_how_active_options_html.strenuous);
        document.querySelector('#how-actie-options').insertAdjacentHTML('afterend', html_css_vars.cnt_check_how_active_options_html.rest_days);
        document.querySelector('#how-actie-options').insertAdjacentHTML('afterend', html_css_vars.cnt_check_how_active_options_html.travel_time);
    }
    else if (evtSelect.target.value === 'Middle') {
        document.querySelector('#how-actie-options').insertAdjacentHTML('afterend', html_css_vars.cnt_check_how_active_options_html.strenuous);
        document.querySelector('#how-actie-options').insertAdjacentHTML('afterend', html_css_vars.cnt_check_how_active_options_html.rest_days);
    }
    else if (evtSelect.target.value === 'Low') {
        document.querySelector('#how-actie-options').insertAdjacentHTML('afterend', html_css_vars.cnt_check_how_active_options_html.sedentary);
        document.querySelector('#how-actie-options').insertAdjacentHTML('afterend', html_css_vars.cnt_check_how_active_options_html.strenuous);
        document.querySelector('#how-actie-options').insertAdjacentHTML('afterend', html_css_vars.cnt_check_how_active_options_html.rest_days);
    }
});

// Preferred modes of transport
document.querySelector('#travel-mode').addEventListener('change', evt => {

    anima_transport_inter_resize = evt.target.value;
    fn_animation_transports_event(anima_transport_inter_resize);
});

// submit the form
document.querySelector('#submit-form').addEventListener('click', () => {

    fn_validate_after_submit().then((res) => {
        if (confirm(res)) cnt_containers_form.submit();
    }).catch(rej => {
        confirm(rej);
    });
});

cnt_containers_form.addEventListener('submit', (evt) => {
    console.log('submit');
    setTimeout(() => evt.preventDefault(), 3000);
});

// ************************************** end events **************************************

// ************************************** main **************************************
fn_start();
// ************************************** end main **************************************
