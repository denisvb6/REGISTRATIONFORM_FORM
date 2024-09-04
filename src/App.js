import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import './App.css';

const fieldScheme = yup.object().shape({
	email: yup.string(),

	password: yup
		.string()
		.matches(
			/^[\w_]*$/,
			'Поле "Пароль": Должны использоваться буквы, цифры или нижнее подчеркивание',
		)
		.min(6, 'Поле "Пароль": Должно быть больше 6 символов'),

	confirmPassword: yup
		.string()
		.matches(
			/^[\w_]*$/,
			'Поле "Подтвердить пароль": Должны использоваться буквы, цифры или нижнее подчеркивание',
		)
		.min(6, 'Поле "Подтвердить пароль": Должно быть больше 6 символов')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { password: '', confirmPassword: '' },
		resolver: yupResolver(fieldScheme),
	});

	const passwordError = errors.password?.message;
	const confirmPasswordError = errors.confirmPassword?.message;

	const onSubmit = (formData) => {
		console.log(formData);
	};

	return (
		<div className="App">
			<form className="regform" onSubmit={handleSubmit(onSubmit)}>
				{passwordError && <div className="errorlabel">{passwordError}</div>}
				{confirmPasswordError &&
					(<div className="errorlabel">{confirmPasswordError}</div>)}

				<input
					className="field_email"
					name="email"
					type="email"
					placeholder="Эл. почта"
					{...register('email')}
				/>
				<input
					className="field_input"
					name="password"
					type="password"
					placeholder="Пароль"
					{...register('password')}
				/>

				<input
					className="field_input"
					name="confirmPassword"
					type="password"
					placeholder="Подтвердите пароль"
					{...register('confirmPassword')}
				/>

				<button
					className="field_button"
					type="submit"
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
