// Hidding the container-form and the step up/down buttons after button start is clicked
document.querySelectorAll('.step-up-down').forEach( el => el.style.display = 'none' );
document.querySelector('#container-form').style.display = 'none';
document.querySelector('#form-section').style.flexDirection = 'column';


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

cnt_btn_start.querySelector('#button-start__button').addEventListener('mouseover', () => {
    cnt_btn_start.querySelector('#button-start__button').style.transform = 'scale(1.1)';
});
cnt_btn_start.querySelector('#button-start__button').addEventListener('mouseout', () => {
    cnt_btn_start.querySelector('#button-start__button').style.transform = 'scale(1)';
});
cnt_btn_start.querySelector('#button-start__button').addEventListener('mousedown', () => {
    cnt_btn_start.querySelector('#button-start__button').style.transform = 'scale(1.2)';
});
cnt_btn_start.querySelector('#button-start__button').addEventListener('mouseup', () => {
    cnt_btn_start.style.display = 'none';
    document.querySelector('#container-form').style.display = 'flex';
    document.querySelector('#form-section').style.flexDirection = 'row';
    document.querySelectorAll('.step-up-down').forEach( el => el.style.display = 'block' );
    document.querySelector('#step-up-down-media-screen').style.display = 'none';
});



