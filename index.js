// cnt_steps_icons contains the icons which are the steps that are on the left side of the screen
const cnt_steps_icons = document.querySelectorAll('.step-to-form');
var steps_arr_index = 0;

// cnt_containers_form contains the containers of every form step
const cnt_containers_form = document.querySelector('#main-form');

// cnt_container-form-info are the elements which contain the field about the customer's details
const cnt_container_form_info = document.querySelectorAll('.container-form-info');

// people_info_arr is a dynamic that increases when the user adds more people such as family members and friends
var people_info_arr = new Array('You');
var people_info_arr_index = 0;

// define styles for the step icons when they are active or inactive
var steps_icons_style = {
    transition: 'all 0.5s',
    transform: 'scale(1.1)',
    boxShadow: '0px 0px 10px #000000',
    border: '1px solid #000000'
}
var steps_icons_style_reset = {
    transition: 'transform 0.2s',
    transform: 'scale(1)',
    boxShadow: 'none'
}

// Buttons for the step up/down or left and right when screen less than 768px
var btn_step_up_normal = document.querySelector('#step-up-normal-screen');
var btn_step_down_normal = document.querySelector('#step-down-normal-screen');

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
    });

////// for the sake of the test ///////////////////////////////////////////////////////
    cnt_btn_start.querySelector('#button-start__button').click();
}

// ************************************** main functions **************************************

// to style the step icons when they are active or inactive
function fn_steps_state_active(step_index) {
    Object.assign(cnt_steps_icons[step_index].style, steps_icons_style);
}

function fn_steps_state_deactive(step_index) {
    Object.assign(cnt_steps_icons[step_index].style, steps_icons_style_reset);
}

// To move the left button to the bottom next to the right button
function fn_check_screen_size() {
    if (window.innerWidth <= 768) {
        btn_step_down_normal.before(btn_step_up_normal);
    }
    else {
        cnt_containers_form.before(btn_step_up_normal);
    }
}

// to display the container-forms dynamically
function fn_container_manager(step_index) {
    cnt_containers_form.children[step_index].style.visibility = 'visible';
    cnt_containers_form.children[step_index].style.left = '0%';
}
// reset
function fn_container_manager_hide_up(step_index) {
    cnt_containers_form.children[step_index].style.visibility = 'hidden';
    cnt_containers_form.children[step_index].style.left = '-100%';
}
// hide down
function fn_container_manager_hide_down(step_index) {
    cnt_containers_form.children[step_index].style.visibility = 'hidden';
    cnt_containers_form.children[step_index].style.left = '100%';
}

// ************************************** start **************************************

window.addEventListener('resize', () => {
    fn_check_screen_size();
});

cnt_steps_icons.forEach((elm, idx) => {
    elm.addEventListener('click', () => {
        if (idx > steps_arr_index) {
            fn_steps_state_active(idx);
            fn_steps_state_deactive(steps_arr_index);

            fn_container_manager_hide_up(steps_arr_index);
            fn_container_manager_hide_up(idx - 1);
            if (idx < cnt_steps_icons.length - 1){
                fn_container_manager_hide_down(idx + 1);}
            fn_container_manager(idx);

            steps_arr_index = idx;
        }
        else if (idx < steps_arr_index) {
            fn_steps_state_active(idx);
            fn_steps_state_deactive(steps_arr_index);

            fn_container_manager_hide_down(steps_arr_index);
            fn_container_manager_hide_down(idx + 1);
            if (idx > 0){
                fn_container_manager_hide_up(idx - 1);}
            fn_container_manager(idx);

            steps_arr_index = idx;
        }
    });
});

btn_step_up_normal.addEventListener('click', () => {
    if (steps_arr_index > 0) {
        steps_arr_index--;

        console.log(steps_arr_index);

        fn_steps_state_active(steps_arr_index);
        fn_steps_state_deactive(steps_arr_index + 1);

        fn_container_manager_hide_down(steps_arr_index + 1);
        if (steps_arr_index > 0){
            fn_container_manager_hide_up(steps_arr_index - 1);}
        fn_container_manager(steps_arr_index);
    }
});
btn_step_down_normal.addEventListener('click', () => {
    if (steps_arr_index < cnt_steps_icons.length - 1) {
        steps_arr_index++;

        console.log(steps_arr_index);

        fn_steps_state_active(steps_arr_index);
        fn_steps_state_deactive(steps_arr_index - 1);

        fn_container_manager_hide_up(steps_arr_index - 1);
        if (steps_arr_index < cnt_steps_icons.length - 1){
            fn_container_manager_hide_down(steps_arr_index + 1);}
        fn_container_manager(steps_arr_index);
    }
});

console.log(cnt_steps_icons.length);

fn_start();
fn_check_screen_size();