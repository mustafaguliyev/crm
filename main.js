

async function Localization(Language) {
    try {
        const response = await fetch(`./language/${Language.toLowerCase()}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        Object.keys(data).forEach(key => {
            const element = document.querySelector(`[data-language="${key}"]`);
            if (element) {
                element.innerHTML = data[key];
            }
        });
    } catch (error) {
        console.error('Localization error:', error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
  
    document.querySelector('.relative.group').addEventListener('click', e => {
       
        if (e.target.matches('[data-use]')) {
            const Language = e.target.dataset.use; 
            Localization(Language); 
        }
    });
});

///dark mode
    const options = {
    bottom: 'unset',
      top: '60px',
      right: '50px',
      left: 'unset',
      time: '0.7s',
      mixColor: '#fff',
      backgroundColor: '#fff',
      buttonColorDark: '#100f2c',
      buttonColorLight: '#fff',
      saveInCookies: false,
      label: '🌓',
      autoMatchOsTheme: true
    };

  const darkmode = new Darkmode(options);
  darkmode.showWidget();
          // Müştəri məlumatlar
          let customers = [];
  
          // Form elementləri
          const form = document.getElementById('customerForm');
          const successAlert = document.getElementById('successAlert');
          const tableBody = document.getElementById('customerTableBody');
  
          // Müştəri əlavə etmə
          function addCustomerToTable(customer) {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${customer.name}</td>
                  <td>${customer.email}</td>
                  <td>${customer.phone}</td>
                  <td>${customer.company}</td>
              `;
              
              row.classList.add('highlight');
              tableBody.appendChild(row);
  
              // 2 saniyə 
              setTimeout(() => {
                  row.classList.remove('highlight');
              }, 2000);
          }
  
          // Validasiya 
          function validateName(name) {
              return name.trim().length >= 3;
          }
  
          function validateEmail(email) {
              const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return regex.test(email);
      
              
          }
  
          function validatePhone(phone) {
           
              const regex = /^(\+994|0)(50|51|55|70|77)\d{7}$/;
  
              return regex.test(phone);
              
          }
  
          function validateCompany(company) {
              return company.trim().length > 0;
          }
  
          // Xəta mesajını göstərmək funksiyası
          function showError(inputId, message) {
              const input = document.getElementById(inputId);
              const error = document.getElementById(inputId + 'Error');
              input.classList.add('error');
              error.style.display = 'block';
              error.textContent = message;
          }
  
          // Xəta mesajını silmək funksiyası
          function clearError(inputId) {
              const input = document.getElementById(inputId);
              const error = document.getElementById(inputId + 'Error');
              input.classList.remove('error');
              error.style.display = 'none';
          }
  
          // Form göndərilməsi
          form.addEventListener('submit', function(e) {
              e.preventDefault();
  
              // Bütün xətaları təmizlə
              clearError('name');
              clearError('email');
              clearError('phone');
              clearError('company');
  
              // Form məlumatlarını al
              const formData = {
                  name: document.getElementById('name').value,
                  email: document.getElementById('email').value,
                  phone: document.getElementById('phone').value,
                  company: document.getElementById('company').value
              };
  
              // Validasiya
              let isValid = true;
  
              if (!validateName(formData.name)) {
                  showError('name', 'Ad minimum 3 simvol olmalıdır');
                  isValid = false;
              }
  
              if (!validateEmail(formData.email)) {
                  showError('email', 'Düzgün email formatı daxil edin');
                  isValid = false;
              }
  
              if (!validatePhone(formData.phone)) {
                  showError('phone', 'Düzgün Azərbaycan telefon nömrəsi daxil edin (+994XXXXXXXXX)');
                  isValid = false;
              }
  
              if (!validateCompany(formData.company)) {
                  showError('company', 'Şirkət adı tələb olunur');
                  isValid = false;
              }
  
              if (isValid) {
                  // Müştərini əlavə et
                  customers.push(formData);
                  addCustomerToTable(formData);
  
                  // Formu təmizlə
                  form.reset();
  
                  // Uğurlu mesajı göstər
                  successAlert.style.display = 'block';
                  setTimeout(() => {
                      successAlert.style.display = 'none';
                  }, 3000);
              }
          });
  
          // Input dəyişdikdə xətanı təmizlə
          document.querySelectorAll('input').forEach(input => {
              input.addEventListener('input', function() {
                  clearError(this.id);
              });
          });