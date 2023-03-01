// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]
OVERLAY = document.querySelector('.overlay')


document.addEventListener('DOMContentLoaded', function () {
	// Основной слайдер на главной
	let mainSlider = document.querySelector('.main_slider .swiper')

	if (mainSlider) {
		new Swiper('.main_slider .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			}
		})
	}


	// Карусель услуг
	const servicesSliders = [],
		services = document.querySelectorAll('.services .swiper')

	services.forEach(function (el, i) {
		el.classList.add('services_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			breakpoints: {
				0: {
					spaceBetween: 24,
					slidesPerView: 'auto'
				},
				768: {
					spaceBetween: 24,
					slidesPerView: 2
				},
				1024: {
					spaceBetween: 24,
					slidesPerView: 3
				}
			}
		}

		servicesSliders.push(new Swiper('.services_s' + i, options))
	})


	// Карусель услуг
	const servicesPageSliders = [],
		servicesPageImages = document.querySelectorAll('.services_page .images')

	servicesPageImages.forEach(function (el, i) {
		el.classList.add('services_page_images_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			breakpoints: {
				0: {
					spaceBetween: 20,
					slidesPerView: 'auto'
				},
				768: {
					spaceBetween: 20,
					slidesPerView: 2
				}
			}
		}

		servicesPageSliders.push(new Swiper('.services_page_images_s' + i, options))
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}

	Fancybox.defaults.template = {
		closeButton: '<svg><use xlink:href="images/sprite.svg#ic_close"></use></svg>',
		spinner: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>',
		main: null
	}


	// Аккордион
	const accordions = document.querySelectorAll('.accordion_item .head'),
		accordionSpeedAnimation = 300

	if (accordions) {
		accordions.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				const item = el.closest('.accordion_item'),
					accordion = el.closest('.accordion')

				if (item.classList.contains('active')) {
					item.classList.remove('active')

					setTimeout(() => slideToggle(item.querySelector('.data'), accordionSpeedAnimation))
				} else {
					accordion.querySelector('.accordion_item').classList.remove('active')

					item.classList.add('active')
					setTimeout(() => slideToggle(item.querySelector('.data'), accordionSpeedAnimation))
				}
			})
		})
	}


	// Всплывающие окна
	const modalBtns = document.querySelectorAll('.modal_btn')

	if (modalBtns) {
		modalBtns.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				Fancybox.close()

				Fancybox.show([{
					src: document.getElementById(el.getAttribute('data-modal')),
					type: 'inline'
				}])
			})
		})
	}


	// Увеличение картинки
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})


	// Ajax открытие
	Fancybox.bind('[data-type="ajax"]', {
		on: {
			done: (fancybox, slide) => {
				let newModalBtns = document.querySelectorAll('.fancybox__container .modal_btn')

				if (newModalBtns) {
					newModalBtns.forEach(el => {
						el.addEventListener('click', e => {
							e.preventDefault()

							Fancybox.close()

							Fancybox.show([{
								src: document.getElementById(el.getAttribute('data-modal')),
								type: 'inline'
							}])
						})
					})
				}
			}
		}
	})


	// Меню
	const menuBtns = document.querySelectorAll('header .menu_btn, .mob_header .mob_menu_btn'),
		menu = document.querySelector('.main_menu'),
		menuCloseBtn = document.querySelector('.main_menu .close_btn')

	if (menuBtns) {
		menuBtns.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				el.classList.toggle('active')
				BODY.classList.toggle('menu_open')
				menu.classList.toggle('show')
			})
		})
	}

	if (menuCloseBtn) {
		menuCloseBtn.addEventListener('click', e => {
			e.preventDefault()

			menuBtns.forEach(el => el.classList.toggle('active'))
			BODY.classList.toggle('menu_open')
			menu.classList.toggle('show')
		})
	}


	// Написать нам
	const feedbackBtns = document.querySelectorAll('.write_to_us .btn, .feedback_btn'),
		feedbackModal = document.querySelector('.feedback_modal'),
		feedbackCloseBtn = document.querySelector('.feedback_modal .close_btn')

	if (feedbackBtns) {
		feedbackBtns.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				el.classList.toggle('active')
				BODY.classList.toggle('menu_open')
				feedbackModal.classList.toggle('show')
			})
		})
	}

	if (feedbackCloseBtn) {
		feedbackCloseBtn.addEventListener('click', e => {
			e.preventDefault()

			feedbackBtns.forEach(el => el.classList.toggle('active'))
			BODY.classList.toggle('menu_open')
			feedbackModal.classList.toggle('show')
		})
	}


	// Кнопка 'Вверх'
	let buttonUpBtn = document.querySelector('.buttonUp .btn'),
		buttonUp = document.querySelector('.buttonUp')

	if (typeof WH !== 'undefined' && buttonUp) {
		window.scrollY > WH
			? fadeIn(buttonUp)
			: fadeOut(buttonUp)
	}

	if (buttonUpBtn) {
		buttonUpBtn.addEventListener('click', e => {
			e.preventDefault()

			window.scrollTo({ top: 0, behavior: 'smooth' })
		})
	}


	// Маска ввода
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00'
			})
		})
	}


	// Фиксация label
	const inputs = document.querySelectorAll('input')

	if (inputs) {
		inputs.forEach(input => {
			input.addEventListener('input', () => {
				input.value.length
					? input.classList.add('active')
					: input.classList.remove('active')
			})
		})
	}


	// Мини всплывающие окна
	const miniModalBtns = document.querySelectorAll('.mini_modal_btn'),
		miniModals = document.querySelectorAll('.mini_modal')

	miniModalBtns.forEach(el => {
		let eventName = ''

		el.classList.contains('on_hover')
			? eventName = 'mouseenter'
			: eventName = 'click'

		el.addEventListener(eventName, e => {
			e.preventDefault()

			const modalId = el.getAttribute('data-modal-id')

			if (el.classList.contains('active')) {
				el.classList.remove('active')
				miniModals.forEach(modal => modal.classList.remove('active'))

				if (el.closest('.search') || el.closest('.catalog')) {
					OVERLAY.classList.remove('show')
				}

				if (is_touch_device()) BODY.style = 'cursor: default;'
			} else {
				miniModalBtns.forEach(btn => btn.classList.remove('active'))
				el.classList.add('active')

				miniModals.forEach(modal => modal.classList.remove('active'))

				const modal = document.getElementById(modalId)

				modal.classList.add('active')

				if (el.closest('.search') || el.closest('.catalog')) {
					OVERLAY.classList.add('show')
				}

				if (is_touch_device()) BODY.style = 'cursor: pointer;'
			}
		})
	})

	// Закрываем всплывашку при клике за её пределами
	document.addEventListener('click', e => {
		if (!e.target.closest('.modal_cont')) {
			miniModals.forEach(modal => modal.classList.remove('active'))
			miniModalBtns.forEach(btn => btn.classList.remove('active'))

			OVERLAY.classList.remove('show')

			if (is_touch_device()) BODY.style = 'cursor: default;'
		}
	})


	if (is_touch_device()) {
		// Закрытие моб. меню свайпом справо на лево
		let ts

		document.addEventListener('touchstart', e => ts = e.originalEvent.touches[0].clientX)

		document.addEventListener('touchend', e => {
			let te = e.originalEvent.changedTouches[0].clientX

			if (BODY.classList.contains('menu_open') && ts > te + 50) {
				// Свайп справо на лево
				mobMenuBtn.classList.remove('active')
				BODY.classList.remove('menu_open')
				mobMenu.classList.remove('show')
			} else if (ts < te - 50) {
				// Свайп слева на право
			}
		})
	}


	// Эффект печатания текста
	let typedLink = document.querySelector('.about_block .link a'),
		myTypeItInstance = new TypeIt('#typed', {
			strings: 'Подробнее'
		})

	typedLink.addEventListener('mouseover', e => myTypeItInstance.go())
})



window.addEventListener('scroll', function () {
	// Кнопка 'Вверх'
	let buttonUp = document.querySelector('.buttonUp')

	if (typeof WH !== 'undefined' && buttonUp) {
		window.scrollY > WH
			? fadeIn(buttonUp)
			: fadeOut(buttonUp)
	}
})



window.addEventListener('resize', function () {
	let windowW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Моб. версия
		if (!firstResize) {
			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'

			firstResize = true
		} else {
			firstResize = false
		}


		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
	}
})