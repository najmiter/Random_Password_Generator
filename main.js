const btn_pwdGenerator  = document.getElementById('btn_pwdGenerator');
const btn_copyPwd       = document.getElementById('btn_copyPwd');
const password          = document.getElementById('password');
const pwd_lengths       = document.getElementById('pwd_lengths');

let actual_password = '';

const MIN_LENGTH        = 12;
const MAX_LENGTH        = 28;

for (let i = MIN_LENGTH; i < MAX_LENGTH; i++) {
      const opt = document.createElement('option');
      opt.setAttribute('value', i);
      opt.innerText = i;
      pwd_lengths.appendChild(opt);
}

const chars = [
      'qwertyuiopasdfghjklzxcvbnm',
      'ASDFGHJKLZXCVBNMQWERTYUIOP',
      '1234567890',
      `,.<>/?'";:[{\\|=+-_(*&^%$#@!~)}]`
];

const get_random_password = (length) => {
      let pwd = '';

      for (let i = 0; i < length; i++) {
            const type = Math.floor(Math.random() * 1000 % chars.length);
            pwd += chars[type].charAt(Math.floor(Math.random() * 1000 % chars[type].length));
      }

      return pwd;
};

btn_pwdGenerator.addEventListener('click', () => {
      const length = Number(pwd_lengths.options[pwd_lengths.selectedIndex].value);
      actual_password = get_random_password(length);
      password.innerText = actual_password;
});

btn_copyPwd.addEventListener('click', () => {
      const msg_success = document.createElement('div');
      msg_success.setAttribute('id', 'msg-success')
      document.getElementById('main').appendChild(msg_success);
      
      if (actual_password.length === 0) {
            msg_success.innerText = 'Nothing to copy';
      } else {
            msg_success.innerText = 'Password copied successfully ✅';
            password.select();
            const pwd = document.getSelection().toString();
            navigator.clipboard.writeText(pwd);
      }

      setTimeout(() => {
            msg_success.innerText = '';
            password.innerText = '';
            actual_password = '';
      }, 2000);
});