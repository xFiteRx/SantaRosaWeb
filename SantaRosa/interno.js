// SEGURIDAD: Bloquea herramientas de desarrollo (F12, Ctrl+U, etc.)
        document.onkeydown = function(e) {
            if(e.keyCode == 123 || 
               (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) || 
               (e.ctrlKey && e.keyCode == 85)) { 
                return false;
            }
        };

        // MOTOR DE BÚSQUEDA DINÁMICO EN TIEMPO REAL
        const searchInput = document.getElementById('searchInput');
        const tableRows = document.querySelectorAll('#documentTableBody tr');

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            tableRows.forEach(row => {
                const docName = row.children[0].textContent.toLowerCase();
                const docDesc = row.children[1].textContent.toLowerCase();

                if (docName.includes(searchTerm) || docDesc.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });// SEGURIDAD: Bloquea herramientas de desarrollo (F12, Ctrl+U, etc.)
        document.onkeydown = function(e) {
            if(e.keyCode == 123 || 
               (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) || 
               (e.ctrlKey && e.keyCode == 85)) { 
                return false;
            }
        };

        // MOTOR DE BÚSQUEDA DINÁMICO EN TIEMPO REAL
        const searchInput = document.getElementById('searchInput');
        const tableRows = document.querySelectorAll('#documentTableBody tr');

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            tableRows.forEach(row => {
                const docName = row.children[0].textContent.toLowerCase();
                const docDesc = row.children[1].textContent.toLowerCase();

                if (docName.includes(searchTerm) || docDesc.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
