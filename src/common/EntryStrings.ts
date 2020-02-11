/// <reference path="../../typings/tsd.d.ts" />

(() => {
    'use strict';

    angular.module('pipEntry.Strings', [])
        .config(function (pipTranslateProvider) {

            // Set translation strings for the module
            pipTranslateProvider.translations('en', {
                // Common labels
                'FULLNAME': 'First and last name',
                'EMAIL': 'Email',
                'LOGIN': 'Login',
                'PASSWORD': 'Password',
                'LANGUAGE': 'Language',
                'GENDER': 'Gender',
                'BIRTHDAY': 'Birthday',
                'LOCATION': 'Location',
                'VERIFY': 'Verify',
                'CONTINUE': 'Continue',


                // Common hints
                'HINT_FULLNAME': "Use your real name, so others know who you are",
                'HINT_PASSWORD': 'Minimum 6 characters',
                'SIGNIN_HINT_PASSWORD': 'Please, type password',
                'HINT_ABOUT': 'Few words about yourself',
                'VERIFY_EMAIL': 'Please, verify your email address. ',
                'HINT_EMAIL': 'Enter your email address, please',
                'VERIFY_LOGIN': 'Please, verify your login address. ',
                'HINT_LOGIN': 'Enter your login, please',

                // Sign In page
                'SIGNIN_TITLE': 'Sign in',
                'SIGNIN_NOT_MEMBER': 'Not a member?',
                'SIGNIN_REMEMBER': 'Remember',
                'SIGNIN_FORGOT_PASSWORD': 'Forgot password?',
                'SIGNIN_SIGNUP_HERE': ' Sign up here',

                // Sign Up page
                'SIGNUP_TITLE': 'Sign up',
                'SIGNUP_NOT_MEMBER': 'Not a member? Sign up now',
                'SIGNUP_TEXT_11': 'By clicking Sign up, you agree to the',
                'SIGNUP_PRIVACY': 'privacy statement',
                'SIGNUP_TEXT_12': 'and',
                'SIGNUP_SERVICES': 'services agreement',
                'SIGNUP_TEXT_2': 'Do you have an account?',
                'SIGNUP_SIGNIN_HERE': ' Sign in here',
                'SIGNUP_EMAIL_REGISTERED': 'This email is already registered',
                'SIGNUP_LOGIN_REGISTERED': 'This login is already registered',
                'SIGNUP_FULLNAME_WRONG': 'xxxx',
                'SIGNUP_EMAIL_WRONG': 'xxxx',
                'SIGNUP_LOGIN_WRONG': 'xxxx',

                // Sign Up Details page
                'POST_SIGNUP_TITLE': 'Welcome to Pip.Life',
                'POST_SIGNUP_TEXT_1': 'Your account was successfully created.',
                'POST_SIGNUP_TEXT_2': 'Tell us some more about yourself.',

                // Recover Password page
                'RECOVER_PWD_TITLE': 'Forgot password?',
                'RECOVER_PWD_TEXT_1_LOGIN': "Enter the login you used when you joined and we'll send you instructions to reset your password.",
                'RECOVER_PWD_TEXT_1_EMAIL': "Enter the e-mail you used when you joined and we'll send you instructions to reset your password.",
                'RECOVER_PWD_TEXT_2': 'For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.',
                'RECOVER_PWD_RECOVER': 'Recover password',

                // Reset Password page
                'RESET_PWD_PASSWORD': 'Reset password',
                'RESET_PWD_TEXT_LOGIN': 'Enter the login together with the reset code you received in email from. Remember the code is only active for 24 hours.',
                'RESET_PWD_TEXT_EMAIL': 'Enter the e-mail together with the reset code you received in email from. Remember the code is only active for 24 hours.',
                'RESET_PWD_SUCCESS_TEXT': 'Your password was successfully changed',

                // Verify Email page
                'VERIFY_EMAIL_WAIT': 'Email verification. Please, wait.',
                'VERIFY_EMAIL_TITLE': 'Email verification',
                'VERIFY_EMAIL_TEXT_1': 'Confirm your email address using verification code',
                'VERIFY_EMAIL_TEXT_21': "If you haven't received the code, press ",
                'VERIFY_EMAIL_RESEND': 'resend',
                'VERIFY_EMAIL_TEXT_22': 'to send it again.',
                'VERIFY_EMAIL_SUCCESS_TEXT': 'Your email address was successfully verified. Thank you!',

                'PASSWORD_MATCH': 'Passwords don\'t match',
                'PASSWORD_CONFIRM': 'Confirm the password',
                'PASSWORD_SET': 'Set a password',

                // Common entry resources
                'ENTRY_CHANGE_SERVER': 'Change server',
                'ENTRY_SERVER_URL': 'Server URL',
                'ENTRY_RESET_CODE': 'Reset code',
                'ENTRY_VERIFICATION_CODE': 'Verification code',
                'ENTRY_NEW_PASSWORD': 'New password',
                'ENTRY_SET_PASSWORD': 'Set Password',
                'ENTRY_RESET_PASSWORD': 'Set',
                'ENTRY_FREE': 'Free',
                'ENTRY_REPEAT': 'Repeat',

                // password changed resource
                'CHANGE_PWD_PASSWORD': 'Change password',
                'EXPIRE_CHANGE_PWD_PASSWORD': 'Change expire password',
                'CHANGE_PWD_TEXT': 'Enter a new password to login.',
                'EXPIRE_CHANGE_PWD_TEXT': 'Your password has expired. Enter a new password to login.',
                'ENTRY_CHANGE_PASSWORD': 'Change',
                'ENTRY_EXPIRE_CHANGE_PASSWORD': 'Change',
                'OLD_PASSWORD': 'Current password',
                'NEW_PASSWORD_SET': 'New password',
                'NEW_PASSWORD_CONFIRM': 'Repeat password',
                'CHANGE_PWD_SUCCESS_TEXT': 'Password changed successfuly',
                'EXPIRE_CHANGE_PWD_SUCCESS_TEXT': 'Password changed successfuly',


                // Validation errors
                'ERROR_EMAIL_INVALID': 'Enter a valid email',
                'ERROR_LOGIN_INVALID': 'Enter a valid login',
                'ERROR_PASSWORD_INVALID': 'Enter a valid password',
                'MINLENGTH_PASSWORD': 'Minimum password length 6 characters',
                'ERROR_FULLNAME_INVALID': 'Enter full name',
                'ERROR_CODE_INVALID': 'Enter a code from mail',
                'ERROR_CODE_WRONG': 'Wrong recovery code',
                'ERROR_SERVER_INVALID': 'Enter server URL',

                //Languages
                'LANGUAGE_RUSSIAN': 'Russian',
                'LANGUAGE_ENGLISH': 'English',

                // errors handling strings

                'ERROR_ACT_EXECUTE': 'Bad Request. User was not found.',
                'ERROR_WRONG_LOGIN': 'Account was not found',
                'ERROR_LOGIN_NOT_FOUND': 'Account was not found',
                'ERROR_NO_LOGIN': 'Missing account login',
                'ERROR_WRONG_PASSWORD': 'Invalid password',
                'ERROR_WRONG_CODE': 'Invalid password recovery code',
                'ERROR_INVALID_CODE': 'Invalid email verification code',
                'ERROR_NO_EMAIL': 'Missing email',
                'ERROR_NO_NAME': 'Missing account name',
                'ERROR_ALREADY_EXIST': 'User account already exist',
                'ERROR_LOGIN_ALREADY_USED': 'User account already exist',
                'ERROR_ALREADY_EXIST_EMAIL': 'User account already exist',
                'ERROR_WRONG_LOGIN_EMAIL': 'Account was not found',
                'ERROR_NO_LOGIN_EMAIL': 'Missing account login',
                'ERROR_SERVER': 'Server is not responding',
                'ERROR_ACCOUNT_LOCKED': 'Number of attempts exceeded. You account was locked.',
                'ERROR_UNKNOWN': 'Unknown error',
                'PASSWORD_IDENTICAL': 'Old and new passwords are identical'
            });

            pipTranslateProvider.translations('ru', {
                // Common labels
                'FULLNAME': 'Имя и фамилия',
                'EMAIL': 'Адрес эл.почты',
                'LOGIN': 'Логин',
                'PASSWORD': 'Пароль',
                'LANGUAGE': 'Язык',
                'GENDER': 'Пол',
                'BIRTHDAY': 'Дата рождения',
                'LOCATION': 'Местонахождение',
                'VERIFY': 'Подтвердить',
                'CONTINUE': 'Продолжить',

                // Common hints
                'HINT_FULLNAME': "Пожалуйста, введите свое полное имя - так, как вы хотите чтобы вас видели другие пользователи.",
                'HINT_PASSWORD': 'Минимум 6 символов',
                'SIGNIN_HINT_PASSWORD': 'Введите пароль',
                'HINT_ABOUT': 'Несколько слов о себе',
                'VERIFY_EMAIL': 'Подтвердите адрес своей эл.почты',
                'HINT_EMAIL': 'Введите адрес своей эл.почты',
                'VERIFY_LOGIN': 'Подтвердите свой логин',
                'HINT_LOGIN': 'Введите свой логин',
                // Sign In page
                'SIGNIN_TITLE': 'Вход в систему',
                'SIGNIN_NOT_MEMBER': 'Еще не зарегистрировались?',
                'SIGNIN_REMEMBER': 'Запомнить',
                'SIGNIN_FORGOT_PASSWORD': 'Забыли пароль?',
                'SIGNIN_SIGNUP_HERE': ' Зарегистрироваться здесь',

                // Sign Up page
                'SIGNUP_TITLE': 'Регистрация',
                'SIGNUP_NOT_MEMBER': 'Новенький? Зарегистрируйтесь сейчас',
                'SIGNUP_TEXT_11': 'Нажимая кнопку регистрация, я соглашаюсь с',
                'SIGNUP_SERVICES': 'договором об услугах',
                'SIGNUP_TEXT_12': 'и',
                'SIGNUP_PRIVACY': 'соглашением о личных данных',
                'SIGNUP_TEXT_2': 'Уже зарегистрировались?',
                'SIGNUP_SIGNIN_HERE': ' Вход здесь',
                'SIGNUP_EMAIL_REGISTERED': 'Введенный адрес эл.почты уже занят',
                'SIGNUP_LOGIN_REGISTERED': 'Введенный логин уже занят',

                // Sign Up Details page
                'POST_SIGNUP_TITLE': 'Добро пожаловать в Pip.Life',
                'POST_SIGNUP_TEXT_1': 'Ваша учетная запись создана.',
                'POST_SIGNUP_TEXT_2': 'Несклько слов о о себе',

                // Recover Password page
                'RECOVER_PWD_TITLE': 'Забыли пароль?',
                'RECOVER_PWD_TEXT_1_LOGIN': 'Введите логин, который вы использовали при регистрации и мы вышлем вам инструкции как изменить пароль.',
                'RECOVER_PWD_TEXT_1_EMAIL': 'Введите эл. почту, которую вы использовали при регистрации и мы вышлем вам инструкции как изменить пароль.',
                'RECOVER_PWD_TEXT_2': 'По соображениям безопасности мы НЕ храним пароли. Таким образом, мы никогда не пошлем ваш пароль по электронной почте.',
                'RECOVER_PWD_RECOVER': 'Восстановить пароль',

                // Reset Password page
                'RESET_PWD_PASSWORD': 'Изменить пароль',
                'RESET_PWD_TEXT_LOGIN': 'Введите логин вместе с кодом, который вы получили в почтовом сообщении. Помните, что код действителен только 24 часа.',
                'RESET_PWD_TEXT_EMAIL': 'Введите эл. почту вместе с кодом, который вы получили в почтовом сообщении. Помните, что код действителен только 24 часа.',
                'RESET_PWD_SUCCESS_TEXT': 'Ваш пароль успешно изменён',

                // Verify Email page
                'VERIFY_EMAIL_WAIT': 'Верификация эл. почты. Подождите немного.',
                'VERIFY_EMAIL_TITLE': 'Подтверждение адреса эл.почты',
                'VERIFY_EMAIL_TEXT_1': 'Введите код, который вы получили по эл.почте',
                'VERIFY_EMAIL_TEXT_21': "Если вы не получили почтовое сообщение с кодом, нажмите ",
                'VERIFY_EMAIL_RESEND': 'отправить снова',
                'VERIFY_EMAIL_TEXT_22': '.',
                'VERIFY_EMAIL_SUCCESS_TEXT': 'Адрес вашей электронной почты успешно подтвержден. Спасибо!',

                'PASSWORD_MATCH': 'Пароли не совпадают',
                'PASSWORD_CONFIRM': 'Подтвердите пароль',
                'PASSWORD_SET': 'Задайте пароль',

                // Common entry resources
                'ENTRY_CHANGE_SERVER': 'Изменить сервер',
                'ENTRY_SERVER_URL': 'URL сервера',
                'ENTRY_RESET_CODE': 'Код сброса пароля',
                'ENTRY_VERIFICATION_CODE': 'Код проверки электронной почты',
                'ENTRY_NEW_PASSWORD': 'Новый пароль',
                'ENTRY_SET_PASSWORD': 'Изменить пароль',
                'ENTRY_RESET_PASSWORD': 'Изменить',
                'ENTRY_FREE': 'бесплатно',
                'ENTRY_REPEAT': 'Повторить',

                // password changed resource
                'CHANGE_PWD_PASSWORD': 'Изменение пароля',
                'EXPIRE_CHANGE_PWD_PASSWORD': 'Изменение пароля',
                'CHANGE_PWD_TEXT': 'Для входа введите новый пароль.',
                'EXPIRE_CHANGE_PWD_TEXT': 'Время действия Вашего пароля истекло. Для входа введите новый пароль.',
                'ENTRY_CHANGE_PASSWORD': 'Изменить',
                'ENTRY_EXPIRE_CHANGE_PASSWORD': 'Изменить',
                'OLD_PASSWORD': 'Текущий пароль',
                'NEW_PASSWORD_SET': 'Новый пароль',
                'NEW_PASSWORD_CONFIRM': 'Повторите пароль',
                'CHANGE_PWD_SUCCESS_TEXT': 'Пароль был успешно изменен',
                'EXPIRE_CHANGE_PWD_SUCCESS_TEXT': 'Пароль был успешно изменен',

                // Validation errors
                'ERROR_EMAIL_INVALID': 'Введите адрес электронной почты',
                'ERROR_LOGIN_INVALID': 'Введите логин',
                'ERROR_PASSWORD_INVALID': 'Введите пароль',
                'MINLENGTH_PASSWORD': 'Минимальная длинна пароля 6 символов',
                'ERROR_FULLNAME_INVALID': 'Введите полное имя',
                'ERROR_CODE_INVALID': 'Введите код',
                'ERROR_CODE_WRONG': 'Неправильный код',
                'ERROR_SERVER_INVALID': 'Введите URL сервера',

                //Languages
                'LANGUAGE_RUSSIAN': 'Русский',
                'LANGUAGE_ENGLISH': 'Английский',

                // errors handling strings

                'ERROR_ACT_EXECUTE': 'Неверный запрос. Пользователь не найден.',
                'ERROR_WRONG_LOGIN': 'Учетная запись пользователя не существует',
                'ERROR_LOGIN_NOT_FOUND': 'Учетная запись пользователя не существует',
                'ERROR_NO_LOGIN': 'Не задан логин',
                'ERROR_WRONG_PASSWORD': 'Не верный пароль',
                'ERROR_WRONG_CODE': 'Не верный код восстановления пароля',
                'ERROR_INVALID_CODE': 'Не верный код верификации электронной почты',
                'ERROR_NO_EMAIL': 'Не задан адресс электронной почты',
                'ERROR_NO_NAME': 'Не задано имя пользователя',
                'ERROR_ALREADY_EXIST': 'Логин уже зарегистрирован',
                'ERROR_LOGIN_ALREADY_USED': 'Логин уже зарегистрирован',
                'ERROR_ALREADY_EXIST_EMAIL': 'Логин уже зарегистрирован',
                'ERROR_WRONG_LOGIN_EMAIL': 'Учетная запись пользователя не существует',
                'ERROR_NO_LOGIN_EMAIL': 'Не задан логин',
                'ERROR_SERVER': 'Сервер не отвечает. Проверьте URL сервера.',
                'ERROR_ACCOUNT_LOCKED': 'Количесво попыток превышено. Ваша учетная запись заблокирована.',
                'ERROR_UNKNOWN': 'Неизвестная ошибка',
                'PASSWORD_IDENTICAL': 'Старый и новый пароль совпадают'
            });

        });

})();