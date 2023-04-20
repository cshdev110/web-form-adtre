// -------------------------------------- variables --------------------------------------

// cnt_steps_icons contains the icons which are the steps that are on the left side of the screen
const cnt_steps_icons = document.querySelectorAll('.step-to-form');
let steps_arr_index = 0;

// cnt_containers_form contains the containers of every form step
const cnt_containers_form = document.querySelector('#main-form');

// cnt_container-form-info are the elements which contain the field about the customer's details
const cnt_container_form_info = document.querySelectorAll('.container-form-info');

// cnt_btns_continue are to continue to the next step
const cnt_btns_continue = document.querySelectorAll('.global-steps');

// cnt_btns_continue_sub_steps are to continue to the next sub step at container-form-info
const cnt_btns_continue_sub_steps = document.querySelectorAll('.sub-steps');

// people_info_arr is a dynamic that increases when the user adds more people such as family members and friends
let people_info_arr = new Array('You');
let people_info_arr_index = 0;

// define styles for the step icons when they are active or inactive
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

// -------------------------------------- functions to initialise --------------------------------------
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

        // Activating step icons after the start button is clicked
        cnt_steps_icons.forEach(el => {
            el.style.pointerEvents = 'auto';
            el.style.filter = 'opacity(100%)';
        });

        // Stalying the first step icon
/////// for the sake of the test ///////////////////////////////////////////////////////
        steps_arr_index = 1;
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
// Also, arrange the container's children to slide from left to right or from up  to down
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
        let aux_step_selected = steps_arr_index;
        steps_arr_index = 0;
        fn_container_steps_manager_control(aux_step_selected);
        steps_arr_index = cnt_containers_form.children.length - 1;
        fn_container_steps_manager_control(aux_step_selected);
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
        let aux_step_selected = steps_arr_index;
        steps_arr_index = 0;
        fn_container_steps_manager_control(aux_step_selected);
        steps_arr_index = cnt_containers_form.children.length - 1;
        fn_container_steps_manager_control(aux_step_selected);
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
function fn_container_steps_manager_control(step_selected) {
    let steps_crossed = step_selected - steps_arr_index;

    fn_steps_state_active(step_selected);
    fn_steps_state_deactive(steps_arr_index);
    fn_container_manager(step_selected);
    for (let i = 0; i < Math.abs(steps_crossed); i++) {
        if (steps_crossed > 0) {
            fn_container_manager_hide_up_or_left(steps_arr_index++);
        }
        else {
            fn_container_manager_hide_down_or_right(steps_arr_index--);
        }   
    } 
}

// ************************************** start **************************************

// event listeners

window.addEventListener('resize', () => {
    fn_check_screen_event_size();
});

cnt_steps_icons.forEach((elm, idx) => {
    elm.addEventListener('click', () => {
        if (idx > steps_arr_index) {
            fn_container_steps_manager_control(idx);
        }
        else if (idx < steps_arr_index) {
            fn_container_steps_manager_control(idx);
        }
    });
});


btn_step_up_normal.addEventListener('click', () => {
    if (steps_arr_index > 0) {
        fn_container_steps_manager_control(steps_arr_index - 1);
    }
});

btn_step_down_normal.addEventListener('click', () => {
    if (steps_arr_index < cnt_steps_icons.length - 1) {
        fn_container_steps_manager_control(steps_arr_index + 1);
    }
});

// cnt_btns_continue.addEventListner('click', () => {
    
// });



console.log(cnt_steps_icons.length);

fn_start();