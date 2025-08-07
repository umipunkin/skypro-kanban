<template>
	<header class="header">
	  <div class="container">
		<div class="header__block">
		  <div class="header__logo _show _light">
			<a href="" target="_self"><img src="@/assets/images/logo.png" alt="logo"></a>
		  </div>
		  <nav class="header__nav">
			<button class="header__btn-main-new _hover01" id="btnMainNew">
			  <a href="#popNewCard">Создать новую задачу</a>
			</button>
			<a href="#user-set-target" class="header__user _hover02">Ivan Ivanov</a>
			<div class="header__pop-user-set pop-user-set" id="user-set-target">
			  <p class="pop-user-set__name">Ivan Ivanov</p>
			  <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>
			  <div class="pop-user-set__theme">
				<p>Темная тема</p>
				<input type="checkbox" class="checkbox" name="checkbox">
			  </div>
			  <button type="button" class="_hover03"><a href="#popExit">Выйти</a></button>
			</div>
		  </nav>
		</div>
	  </div>
	</header>
  </template>
  
  <style scoped>

  .header {
  width: 100%;
  margin: 0 auto;
  background-color: #FFFFFF;
}

  .header__block {
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;
}

  .header__logo img {
  width: 85px;
  transition: opacity 0.2s ease;
}
  

  .header__nav {
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
  
  .header__btn-main-new {
	background: #565EEF;
	color: white;
	border: none;
	border-radius: 4px;
	padding: 8px 16px;
	font-size: 14px;
	transition: background 0.2s ease;
	width: calc(100vw - 32px);
    height: 40px;
    left: 16px;
    bottom: 30px;
    top: auto;
    margin-right: 0;
  }

  .header__btn-main-new a {
  color: #FFFFFF;
}

  

  .header__user {
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: #565EEF;
  position: relative;
}
  
  .header__pop-user-set {
	position: absolute;
	right: 0;
	top: calc(100% + 10px);
	background: white;
	border-radius: 8px;
	box-shadow: 0 4px 20px rgba(0,0,0,0.1);
	padding: 16px;
	width: 200px;
	opacity: 0;
	visibility: hidden;
	transition: all 0.2s ease;
	transform: translateY(-10px);
  }

  .header__user::after {
  content: "";
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 1px;
  border-left: 1.9px solid #565EEF;
  border-bottom: 1.9px solid #565EEF;
  transform: rotate(-45deg);
  margin: -6px 0 0 5px;
  padding: 0;
}

.header__pop-user-set {
  display: block;
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  background: #FFF;
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  padding: 34px;
  text-align: center;
  z-index: 2;
}
  
  .header__user:hover + .header__pop-user-set,
  .header__pop-user-set:hover {
	opacity: 1;
	visibility: visible;
	transform: translateY(0);
  }
  </style>