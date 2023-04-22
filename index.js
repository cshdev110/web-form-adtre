// -------------------------------------- variables --------------------------------------

// cnt_steps_icons contains the icons which are the steps that are on the left side of the screen
const cnt_steps_icons = document.querySelectorAll('.step-to-form');
let steps_arr_index = 0;

// cnt_containers_form contains the containers of every form step
const cnt_containers_form = document.querySelector('#main-form');

// cnt_container-form-info is where there are the elements that contain the field about the customer's details
const cnt_container_form_info = document.querySelector('#container-form-info');

// cnt_btns_continue are to continue to the next step
const cnt_btns_continue = document.querySelectorAll('.btn-continue');

// cnt_radio_btns_sub_form is the container of the radio buttons at container-form-info-traveling-3-processes
const cnt_radio_btns_sub_form = document.querySelector('#container-form-info-traveling-3-processes');

// cnt_container_form_info_details_fields is where the form to fill in per person will added dynamically
// when a person is added
const cnt_container_form_info_details_fields = document.querySelector('#container-form-info-details-fields');

// to go through the sub forms at container-form-info
let sub_form_idx = 0;

// people_info_arr is a dynamic that increases when the user adds more people such as family members and friends
let people_info_arr = new Array('You');
let people_info_arr_index = 0;

// Objects define styles for the step icons when they are active or inactive
let steps_icons_style = {
    transition: 'all 0.5s',
    transform: 'scale(1.1)',
    boxShadow: '0px 0px 10px #000000',
    border: '1px solid #000000'
}
let steps_icons_style_reset = {
    transition: 'transform 0.2s',
    transform: 'scale(1)',
    boxShadow: 'none'
}

// Buttons for the step up/down or left and right when screen less than 768px
let btn_step_up_normal = document.querySelector('#step-up-normal-screen');
let btn_step_down_normal = document.querySelector('#step-down-normal-screen');

// Flag to make the change of when the screen size is less than 768px or more than 768px only once
// when it crosses the 768px
let flag_screen_event_size = false;

// buttons + and - from container-form-info-traveling-inputs that are to add or subtract the number of people
const cnt_number_of_childs = document.querySelector('input[name="number-of-childs"]');
const cnt_number_of_friends = document.querySelector('input[name="number-of-friends"]');

// traveller_obj contains the number of people that are going to travel
let traveller_obj_old = {
    partner: 0,
    child: 0,
    friend: 0
}
let  traveller_obj_new = {
    partner: 0,
    child: 0,
    friend: 0
}

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

    // Creating and styling the container for the start button
    // After clicking on the button, the container-form and the step up/down buttons will be displayed
    const button_start = `<div id="container-button-start">
                                <h1>START</h1>
                                <button type="button" id="button-start__button"></button>
                            </div>`;

    document.querySelector('#form-section').insertAdjacentHTML('beforeend', button_start);

    const cnt_btn_start = document.querySelector('#container-button-start');

    let cnt_btn_start_style_obj = {
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
    Object.assign(cnt_btn_start.style, cnt_btn_start_style_obj);

    let cnt_btn_start_child_button = {
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
    Object.assign(cnt_btn_start.querySelector('button').style, cnt_btn_start_child_button);

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
        steps_arr_index = 1;
        sub_form_idx = 1;
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
}

// to style the step icons when they are active or inactive
function fn_steps_state_active(step_index) {
    Object.assign(cnt_steps_icons[step_index].style, steps_icons_style);
}

function fn_steps_state_deactive(step_index) {
    Object.assign(cnt_steps_icons[step_index].style, steps_icons_style_reset);
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

// create new traveller function
function fn_create_new_traveller(person) {
    const traveller = 
    `<div class="container-form-perperson-dynamically" id="container-form-perperson-${person}">
        <label for="name-${person}">Name</label><input type="text" name="name-${person}" placeholder="-${person}">
        <label for="birthdate-${person}">Birth Date</label><input type="date" name="birthdate-${person}">
        <label for="occupation-${person}">Occupation</label><input type="text" name="occupation-${person}" placeholder="-${person}...">
        <label for="gender-${person}">Gender</label><select name="gender-${person}" id="">
            <option value="Select" selected>Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
        </select>
        <label for="dietary-${person}">Dietary Requirements</label><input list="form-datalist-dietary-${person}" name="dietary-${person}" placeholder="double clic to see more">
        <datalist id="form-datalist-dietary-${person}">
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Halal">Halal</option>
            <option value="Kosher">Kosher</option>
            <option value="Allergies">Allergies</option>
        </datalist>
        <label for="specialneeds-${person}">Special Needs</label><input type="text" name="specialneeds-${person}" placeholder="${person} requires">                                     
    </div>`
    ;

    return traveller;
}

// add new travellers form to the DOM
function fn_add_new_traveller_form(list_travellers) {
    Object.keys(list_travellers).forEach(key => {
        for (let i = 0; i < list_travellers[key]; i++) {
            cnt_container_form_info_details_fields.insertAdjacentHTML('beforeend', fn_create_new_traveller(key));
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
                    if (child.id === `container-form-perperson-${key+'-'+(list_old[key]-i)}`) {
                        child.remove();
                    }
                });
            }
        }
        else if (list_old[key] < list_new[key]) {
            for (let i = 0; i < list_new[key] - list_old[key]; i++) {
                // i+1 because the index starts at 0 and the first traveller is 1.
                // When creating a new form for a new person, the form will have the id container-form-perperson-(partner-1 or child-1 or friend-1)
                cnt_container_form_info_details_fields.insertAdjacentHTML('beforeend', fn_create_new_traveller(key+'-'+(list_old[key]+i+1)));
            }
        }
    });
}
// to disable or enable buttons
function fn_check_inputs(steps_index, sub_steps_index) {
    if (steps_index === 0) {
        return true;
    }
    else if (steps_index === 1 && sub_steps_index === 0) {        
        traveller_obj_new.partner = (document.querySelector('input[name="inp-traveling-partner"]:checked')) ? 1 : 0;
        traveller_obj_new.child = (document.querySelector('input[name="inp-traveling-child"]:checked')) ? Number(cnt_number_of_childs.value) : 0;
        traveller_obj_new.friend = (document.querySelector('input[name="inp-traveling-friend"]:checked')) ? Number(cnt_number_of_friends.value) : 0;

        if (!fn_compare_obj(traveller_obj_old, traveller_obj_new)) {
            fn_add_or_remove_traveller_form(traveller_obj_old, traveller_obj_new);
        }

        Object.keys(traveller_obj_new).forEach(key => traveller_obj_old[key] = traveller_obj_new[key]);
        console.log(traveller_obj_new);
        console.log(traveller_obj_old);

        document.querySelector('#summary-partner').innerHTML = (traveller_obj_new.partner === 1) ? '&heartsuit;' : 0;
        document.querySelector('#summary-childs').textContent = traveller_obj_new.child;
        document.querySelector('#summary-friends').textContent = traveller_obj_new.friend;

        return true;
    }
    else if (steps_index === 1 && sub_steps_index === 1) {
        return true;
    }
    else if (steps_index === 1 && sub_steps_index === 2) {
        return true;
    }
    else if (steps_index === 2) {
        return true;
    }
    else if (steps_index === 3) {
        return true;
    }
    else if (steps_index === 4) {
        return true;
    }
    else if (steps_index === 5) {
        return true;
    }
}

// function to filter number in the fields Traveling childs and Traveling Friends. Second step
// allowing only two digits number
function fn_filter_number_travellers(elm) {
    if (!(/^[0-9]{1,2}$/.test(elm.target.value) && (elm.target.value >= '0') && (elm.target.value <= '50'))) {
        elm.target.value = /(?:[0-9]{1,2})/.exec(elm.target.value);
        elm.target.value = (elm.target.value > 50) ? 50 : (elm.target.value === '') ? 0 : elm.target.value;
    }
}

// ************************************** end main functions **************************************

// ************************************** events **************************************
// screen event size. It is used to move the left button to the bottom next to the right button
// and to arrange the container-form-info's children to slide from left to right or from up  to down
window.addEventListener('resize', () => {
    fn_check_screen_event_size();
});

// The steps on the top of the form. They are used to navigate between the steps
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

// The blue buttons Continue. When pressed, form steps are shifted to the right
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
        fn_sub_container_manager(sub_form_idx = Number(radio_btn.value));
    });
});

// form events: Travellers
// Increase or decrease the number of childs
document.querySelectorAll('.number-of-childs').forEach((elm, idx) => {
    if (idx === 0) {
        elm.addEventListener('click', () => {
            if (cnt_number_of_childs.value < 50) {
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
            if (cnt_number_of_friends.value < 50) {
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

// ************************************** end events **************************************

// ************************************** main **************************************

fn_start();
// ************************************** end main **************************************
