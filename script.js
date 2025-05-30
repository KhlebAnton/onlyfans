document.addEventListener('DOMContentLoaded', function () {
  const plusesItems = document.querySelectorAll('.pluses__item');

  function checkVisibility() {
    if (window.innerWidth > 1000) {
      plusesItems.forEach(item => item.classList.remove('visible'));
      return;
    }

    const viewportHeight = window.innerHeight;
    const triggerPosition = viewportHeight * 0.3;

    plusesItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemTop = rect.top;

      if (itemTop <= triggerPosition) {
        item.classList.add('visible');
      } else {
        item.classList.remove('visible');
      }
    });
  }

  checkVisibility();
  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);

   const formModal = document.getElementById('formModal');
        const modalClose = document.getElementById('modalClose');
        const formOpenButtons = document.querySelectorAll('.form_open');
        const contactForm = document.getElementById('contactForm');
        const phoneInput = document.getElementById('phone');
        const html = document.documentElement;
        const body = document.body;
        
        // Вычисляем ширину скролла
        function getScrollbarWidth() {
            return window.innerWidth - document.documentElement.clientWidth;
        }
        
        // Устанавливаем CSS переменную с шириной скролла
        document.documentElement.style.setProperty('--scroll', getScrollbarWidth() + 'px');
        
        // Обработчики событий для всех кнопок открытия формы
        formOpenButtons.forEach(button => {
            button.addEventListener('click', openModal);
        });
        
        modalClose.addEventListener('click', closeModal);
        contactForm.addEventListener('submit', handleSubmit);
        phoneInput.addEventListener('input', formatPhone);
        phoneInput.addEventListener('keydown', handlePhoneBackspace);
        
        // Закрытие при клике вне формы
        formModal.addEventListener('click', function(e) {
            if (e.target === formModal) {
                closeModal();
            }
        });
        
        function openModal() {
            // Блокируем скролл
            html.classList.add('no-scrolled');
            body.classList.add('no-scrolled');
            
            formModal.classList.add('open');
        }
        
        function closeModal() {
            // Разблокируем скролл
            html.classList.remove('no-scrolled');
            body.classList.remove('no-scrolled');
            
            formModal.classList.remove('open');
        }
        
        function formatPhone(e) {
            const input = e.target;
            let value = input.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length > 0) {
                formattedValue = '+7(';
                
                if (value.length > 1) {
                    formattedValue += value.substring(1, 4);
                } else {
                    formattedValue += value.substring(1);
                }
                
                if (value.length >= 4) {
                    formattedValue += ')';
                }
                
                if (value.length >= 5) {
                    formattedValue += value.substring(4, 7);
                }
                
                if (value.length >= 8) {
                    formattedValue += '-' + value.substring(7, 9);
                }
                
                if (value.length >= 10) {
                    formattedValue += '-' + value.substring(9, 11);
                }
            }
            
            input.value = formattedValue;
        }
        
        function handlePhoneBackspace(e) {
            if (e.key === 'Backspace') {
                const input = e.target;
                const cursorPos = input.selectionStart;
                
                if (cursorPos > 0 && 
                    (input.value[cursorPos - 1] === '(' || 
                     input.value[cursorPos - 1] === ')' || 
                     input.value[cursorPos - 1] === '-')) {
                    e.preventDefault();
                    input.setSelectionRange(cursorPos - 1, cursorPos - 1);
                    input.dispatchEvent(new Event('input'));
                }
            }
        }
        
        function handleSubmit(e) {
            e.preventDefault();
            let isValid = true;
            
            // Проверка имени
            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('nameError');
            if (nameInput.value.trim() === '') {
                nameInput.classList.add('error');
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameInput.classList.remove('error');
                nameError.style.display = 'none';
            }
            
            // Проверка телефона
            const phoneError = document.getElementById('phoneError');
            const phoneRegex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
            if (!phoneRegex.test(phoneInput.value)) {
                phoneInput.classList.add('error');
                phoneError.style.display = 'block';
                isValid = false;
            } else {
                phoneInput.classList.remove('error');
                phoneError.style.display = 'none';
            }
            
            // Проверка email
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.classList.add('error');
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailInput.classList.remove('error');
                emailError.style.display = 'none';
            }
            
            if (isValid) {
                alert('Форма успешно отправлена!');
                contactForm.reset();
                closeModal();
            }
        }
        
        // Обновляем ширину скролла при ресайзе
        window.addEventListener('resize', function() {
            document.documentElement.style.setProperty('--scroll', getScrollbarWidth() + 'px');
        });
});