import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data) => console.log(data);

  const onErrors = (errors) => console.error(errors);

  return (
    <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
      <h2>Зарегистрируйтесь</h2>
      <div class="form-group">
        <label>Логин</label>
        <input
          class="form-control"
          name="username"
          {...register("username", { required: true })}
          placeholder="логин"
        />
        {errors.username && <span>Поле "Логин" должно быть заполнено!</span>}
      </div>
      <div class="form-group">
        <label>Пароль</label>
        <input
          class="form-control"
          type="password"
          name="password"
          placeholder="пароль"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Поле "Пароль" должно быть заполнено!</span>}
      </div>
      <div class="form-group">
        <label>E-mail</label>
        <input
          class="form-control"
          name="email"
          placeholder="e-mail"
          {...register("email")}
        />
        {errors.email && <span>Поле "E-mail" должно быть заполнено!</span>}
      </div>
      <div class="form-group">
      <label>Примечание</label>
      <textarea
        class="form-control"
        name="bio"
        placeholder="Расскажите немного о себе"
        {...register("bio")}
      />
      </div>

      <input type="submit" />
    </form>
  );
}

export default SignUp;
